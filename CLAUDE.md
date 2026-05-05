# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DAEMON RIFT is a browser-based tap RPG (idle + progression) inspired by the Shin Megami Tensei universe. Players recruit demons, fuse them for stronger forms, and descend through an endless ruined city. It runs fully offline with no external dependencies, deployed on GitHub Pages.

**Current version:** v0.5.1  
**Play:** https://men0tai0ko.github.io/daemon-rift/

## Development Workflow

No build step, no package manager, no test runner. Open `index.html` directly in a browser or serve locally:

```bash
# Serve locally (Python)
python3 -m http.server 8080
# Then open http://localhost:8080
```

To test changes, reload the browser. Save data persists in `localStorage` under keys `daemonrift_save` and `daemonrift_best`. To reset save state during testing, run in browser console:

```javascript
localStorage.clear(); location.reload();
```

## Hard Constraints

- **3-file structure only:** `index.html`, `style.css`, `script.js`. No additional files, no CDN dependencies, ever.
- **Version must be synced in 3 places on every version bump:**
  1. Comment header near top of `index.html`: `Version : x.x.x`
  2. `<meta name="version" content="x.x.x">` in `index.html`
  3. `const APP_VERSION = 'x.x.x';` in `script.js` `[BLOCK: META]`
- **`SAVE_KEYS` array must be updated** whenever a new field is added to persistent state. Fields not listed are silently dropped on save.
- **`SAVE_SCHEMA_VERSION`** (currently `3`) must be incremented when the save schema changes incompatibly. A mismatch causes existing save data to be automatically discarded on load.
- **Do not define new global functions with the same name as `UI` object methods.** Backward-compat wrappers like `renderExplore()`, `renderPartyScreen()`, etc. already exist as globals and would conflict.

## Code Architecture

All game logic lives in `script.js` as named constant objects (`const MODULE = { ... }`). The file is divided into ordered blocks — **the block order must not be changed** as later blocks depend on earlier ones:

| Block | Role |
|-------|------|
| `[BLOCK: META]` | `APP_VERSION`, `APP_NAME` constants |
| `[BLOCK: DATA]` | `DEMON_MASTER`, `FUSION_TABLE`, `AFFINITY`, `AREAS` master data |
| `[BLOCK: STATE]` | `SAVE_KEYS` array, `STATE` object (both persist and runtime fields) |
| `[BLOCK: UTIL]` | Pure utility functions: `rand`, `chance`, `clamp`, `showToast` |
| `[BLOCK: ENGINE]` | Pure game functions: `createDemon`, `spawnEnemy`, `calcDamage`, `getFusionResult`, `applyLevelUp`, `calcLegacyBonus` |
| `[BLOCK: SKILL]` | Skill master (37 types), `activate`, `inheritSkill`, `describe` |
| `[BLOCK: ITEM]` | Item master (6 types), `add`, `use`, `tryDrop`, `list` |
| `[BLOCK: SAVE]` | `saveGame`, `loadGame`, `updateBestFloor` |
| `[BLOCK: UI]` | All screen rendering functions |
| `[BLOCK: AUDIO]` | BGM + 11 SE types via Web Audio API (procedural generation) |
| `[BLOCK: ANIM]` | Screen transitions, damage numbers, fusion animations |
| `[BLOCK: BATTLE]` | Battle loop, attack, skill, flee, negotiate, enemy AI, game over |
| `[BLOCK: FUSION]` | Fusion execution, skill inheritance, party management |
| `G` | Controller object — delegates to all other modules; called by `onclick` in HTML |
| `[BLOCK: INIT]` | IIFE startup |

**Dependency rule:** `DATA` and `STATE` are referenced globally by all modules. `ENGINE` and `UTIL` are pure (no side effects). HTML `onclick` attributes call only `G.*` methods.

## State Management

`STATE` has two categories:

**Persisted** (saved to `localStorage` via `SAVE_KEYS`): `floor`, `macca`, `kills`, `fusions`, `bestFloor`, `party`, `storage`, `items`, `legacyMacca`

**Runtime only** (lost on reload): `floorProgress`, `exploring`, `exploreTimer`, `inBattle`, `currentEnemy`, `fusionSlot`, `fusionA`, `fusionB`, `_skillStoneActive`, `_guardActive`

`STATE.party` and `STATE.storage` are arrays of `Demon` objects (created by `createDemon(masterId, lv?)`). Because these are object references, mutations anywhere affect all holders — be careful about unintended side effects.

## Fragile Areas

| Location | Risk |
|----------|------|
| `SAVE_KEYS` array | Missing entry = field silently not saved |
| `SAVE_SCHEMA_VERSION` | Incrementing it wipes all users' save data |
| `BATTLE._enemyAttack()` | `_guardActive` flag must be reset after use |
| `FUSION.execute()` | `_skillStoneActive` flag must be reset after use |
| `G.continueGame()` | Restores state via `SAVE_KEYS.forEach`; fields not in `SAVE_KEYS` are not restored |

## Document Update Rules

When making changes, update documentation accordingly:

| Change type | Files to update |
|-------------|----------------|
| Version bump | `README.md` (version line), `HANDOVER.md` (recent changes), `spec.md` (phase table) |
| New feature | `spec.md` (spec), `architecture.md` (if module structure changes), `tasks.md` (mark done) |
| Bug found | `issues.md` (add as OPEN) |
| Bug fixed | `issues.md` (mark CLOSED with version), `HANDOVER.md` (remove from known issues) |

## Key Game Constants

```javascript
SAVE_SCHEMA_VERSION = 3
探索間隔 = 2000ms (setInterval)
パーティ最大 = 3体
敵スケール式 = 1 + Math.log1p(floor - 1) * 0.45  // floor capped at 50
ボス倍率 = 1.9×
アイテムドロップ率 = 8%〜20%（+5% if floor < 10）
```

## Reference Documents

- `spec.md` — full game specification (mechanics, data, UI)
- `architecture.md` — module design, data flows, screen transitions, STATE schema
- `HANDOVER.md` — current status, recent changes, fragile areas (read before starting work)
- `tasks.md` — task and progress tracking
- `issues.md` — bug tracker
