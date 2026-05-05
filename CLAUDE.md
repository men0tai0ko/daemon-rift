# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DAEMON RIFT is a browser-based idle tap RPG (Megami Tensei-inspired). Players recruit demons as allies, fuse them to create stronger ones, and descend deeper into an endless dungeon. Optimized for smartphone portrait mode. Live at: https://men0tai0ko.github.io/daemon-rift/

**Current version:** v0.5.1  
**Current status:** Released. No open issues.

## Running the Game

No build system. Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8080
```

There are no tests, no linter, no package manager. All code is Vanilla JS (ES6+) with no external dependencies.

## Hard Constraints

- **3-file rule:** Only `index.html`, `style.css`, and `script.js`. No new files, no CDN links, no imports.
- **Version sync:** When bumping the version, update all 3 places: the comment header near line 1 of `script.js`, the `<meta name="version">` in `index.html`, and `const APP_VERSION` in `[BLOCK: META]`.
- **SAVE_KEYS:** When adding a new persistent field to `STATE`, add it to the `SAVE_KEYS` array or it will never be saved to localStorage.
- **SAVE_SCHEMA_VERSION:** Only bump this (currently `3`) when the save schema changes. Bumping it silently wipes all existing saves.
- **No new globals with UI method names:** `UI` methods are also exposed as global wrapper functions (e.g. `renderExplore()`, `renderPartyScreen()`). Do not define new globals with those names.

## Architecture

All game logic lives in `script.js` (~1700 lines), organized into named block sections in a fixed order. **The block order must not change.**

| Block | Role |
|-------|------|
| `[BLOCK: META]` | `APP_VERSION`, `APP_NAME` |
| `[BLOCK: DATA]` | `DEMON_MASTER`, `FUSION_TABLE`, `AFFINITY`, `AREAS` — read-only master data |
| `[BLOCK: STATE]` | `SAVE_KEYS` array + `STATE` object (all mutable game state) |
| `[BLOCK: UTIL]` | Pure helpers: `rand`, `chance`, `clamp`, `showToast` |
| `[BLOCK: ENGINE]` | Pure functions: `createDemon`, `spawnEnemy`, `calcDamage`, `calcNegotiateRate`, `getFusionResult`, `applyLevelUp`, `calcLegacyBonus` |
| `[BLOCK: SKILL]` | Skill master data (37 skills) + `activate`, `inheritSkill`, `describe` |
| `[BLOCK: ITEM]` | Item master data (6 items) + `add`, `use`, `tryDrop`, `list` |
| `[BLOCK: SAVE]` | `saveGame()`, `loadGame()`, `updateBestFloor()` |
| `[BLOCK: UI]` | All DOM rendering: `renderExplore`, `renderPartyScreen`, `renderFusionScreen`, `renderItemScreen`, `switchPartyTab`, etc. |
| `[BLOCK: AUDIO]` | Web Audio API BGM + 11 SE procedurally generated. Mute toggle. |
| `[BLOCK: ANIM]` | CSS-based effects: screen transitions, damage floats, banners, fusion spin, shake |
| `[BLOCK: BATTLE]` | Battle loop, `attack`, `skill`, `flee`, `negotiate`, enemy AI, game over check |
| `[BLOCK: FUSION]` | Fusion execution, skill inheritance, party management |
| `G` | Controller object — thin dispatcher to all other modules. All `onclick` attributes in HTML call `G.*` methods. |
| `[BLOCK: INIT]` | IIFE that runs on page load |

### Module dependency flow

```
HTML (onclick) → G (controller)
  ├─ BATTLE → ENGINE, SKILL, AUDIO, ANIM, UI
  ├─ FUSION → ENGINE, SKILL, AUDIO, ANIM, UI
  ├─ UI     → ITEM
  └─ SAVE   → STATE (direct reference)
DATA and STATE are global; read by all modules.
ENGINE and UTIL are pure (no side effects).
```

## State Design

`STATE` holds all mutable game state. Fields in `SAVE_KEYS` persist to `localStorage` under key `daemonrift_save`. All other fields are runtime-only (reset on page load).

**Persisted fields:** `floor`, `macca`, `kills`, `fusions`, `bestFloor`, `party`, `storage`, `items`, `legacyMacca`

**Runtime-only fields (not saved):** `floorProgress`, `exploring`, `exploreTimer`, `inBattle`, `currentEnemy`, `fusionSlot`, `fusionA`, `fusionB`, `_skillStoneActive`, `_guardActive`

`STATE.party` and `STATE.storage` are arrays of Demon objects mutated in place — any module can modify them directly.

## Key Data Structures

**Demon object** (created by `createDemon(masterId, lv?)`):
```js
{ uid, masterId, name, race, attr, emoji, rare, lv, skills, maxHp, hp, atk, def, spd, exp, expNext, inParty }
```
- `race`: 妖精/鬼神/死霊/堕天使/幻魔/天使/魔王/竜神
- `attr`: 炎/氷/電/物/呪
- `rare`: C/B/A/S
- `skills`: max 2 entries

## Core Game Loops

**Explore loop:** `G.toggleExplore()` starts a `setInterval` every 2000ms. Each tick auto-defeats enemies, adds macca, attempts item drops via `ITEM.tryDrop()`. After 5 ticks (or on boss floors every 10), stops and opens a battle via `G._openBattle(spawnEnemy())`.

**Battle flow:** Player taps attack/skill/flee/negotiate → `G.do*()` → `BATTLE.*()`. On enemy defeat: `BATTLE._enemyDefeated()` → XP + level up → advance floor or resume explore. `BATTLE._checkGameOver()` triggers game over if all party HP ≤ 0.

**Fusion flow:** Player selects two demons into slots A/B → `FUSION.execute()` → `getFusionResult()` looks up `FUSION_TABLE` by race pair → `createDemon()` → `SKILL.inheritSkill()` (random, or confirmed if `_skillStoneActive`). Source demons are removed.

## Fragile Areas

| Area | Risk |
|------|------|
| `SAVE_KEYS` array | Omitting a field means it never saves |
| `SAVE_SCHEMA_VERSION` | Any bump wipes all user saves |
| `BATTLE._enemyAttack()` | Must reset `_guardActive` flag after use |
| `FUSION.execute()` | Must reset `_skillStoneActive` flag after use |
| `G.continueGame()` | Restores STATE using `SAVE_KEYS.forEach` — fields not in `SAVE_KEYS` are not restored |
| `saveGame()` call sites | Missing `saveGame()` after state mutations causes progress loss on browser close (see ISS-011, ISS-014, ISS-019, ISS-020 for historical examples) |

## Document Update Rules

| When | Update |
|------|--------|
| Version bump | `README.md` version field, `HANDOVER.md` recent changes, `spec.md` phase table |
| New feature | `spec.md` (spec), `architecture.md` (if modules change), `tasks.md` (complete the task) |
| Bug found | `issues.md` (add OPEN entry) |
| Bug fixed | `issues.md` (mark CLOSED + version), `HANDOVER.md` (remove from known issues) |

## Key Constants

```js
APP_VERSION         = '0.5.1'
SAVE_SCHEMA_VERSION = 3
LS_KEY_SAVE         = 'daemonrift_save'
LS_KEY_BEST         = 'daemonrift_best'
EXPLORE_INTERVAL    = 2000ms
PARTY_MAX           = 3
ENEMY_SCALE         = 1 + Math.log1p(floor - 1) * 0.45  (capped at floor=50)
BOSS_MULTIPLIER     = 1.9×  (every 10 floors)
```
