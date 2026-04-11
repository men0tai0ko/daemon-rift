# DAEMON RIFT — アーキテクチャ設計書

**対象バージョン:** v0.4.4  
**最終更新:** 2026-04-10

---

## ■ 基本方針

- **3ファイル構成**（index.html / style.css / script.js）。追加の外部ファイル・CDN依存禁止
- Vanilla JS（ES6+）。フレームワークなし
- コードは**論理モジュール**（`const MODULE = { ... }`）で責務分離済み
- 将来のファイル分割を見越した命名規則を維持（コメントに `将来の分割先: xxx.js` を明記）

---

## ■ index.html 内部ブロック構造

コードは上から以下の順序で定義される。**この順序の変更は禁止。**

| 行番号（v0.4.3） | ブロック名 | 種別 | 役割 |
|-----------------|-----------|------|------|
| 1〜385 | HTML / CSS | 静的 | UI構造・スタイル定義・keyframes |
| 386 | `[BLOCK: META]` | 定数 | APP_VERSION / APP_NAME |
| 393 | `[BLOCK: DATA]` | 定数 | DEMON_MASTER / FUSION_TABLE / AFFINITY / AREAS |
| 489 | `[BLOCK: STATE]` | 状態 | SAVE_KEYS / STATE オブジェクト |
| 514 | `[BLOCK: UTIL]` | 関数 | rand / chance / clamp / showToast |
| 527 | `[BLOCK: ENGINE]` | 関数 | createDemon / spawnEnemy / calcDamage / calcNegotiateRate / getFusionResult / applyLevelUp |
| 595 | `[BLOCK: SKILL]` | オブジェクト | スキルマスター(37種) / activate / inheritSkill / describe |
| 711 | `[BLOCK: ITEM]` | オブジェクト | アイテムマスター(6種) / add / use / tryDrop / list |
| 831 | `[BLOCK: SAVE]` | 関数 | saveGame / loadGame / updateBestFloor |
| 873 | `[BLOCK: UI]` | オブジェクト | renderExplore 〜 renderPartyScreen / switchPartyTab / renderItemScreen |
| 1008 | `[BLOCK: AUDIO]` | オブジェクト | BGM(探索/戦闘) / SE(11種) / ミュートトグル |
| 1163 | `[BLOCK: ANIM]` | オブジェクト | 画面遷移 / フラッシュ / ダメージ数値 / バナー / 合体演出 / シェイク |
| 1294 | `[BLOCK: BATTLE]` | オブジェクト | 戦闘ループ / 攻撃 / スキル / 逃走 / 交渉 / 敵AI / ゲームオーバー |
| 1470 | `[BLOCK: FUSION]` | オブジェクト | 合体実行 / スキル継承 / パーティ編成 |
| 1547 | `G` | オブジェクト | コントローラ（各モジュールへの委譲のみ） |
| 1623 | `[BLOCK: INIT]` | 即時実行 | 起動処理 |

---

## ■ モジュール依存関係

```
HTML（onclick属性）
  └─► G（コントローラ）
        ├─► BATTLE（戦闘ロジック）
        │     ├─► ENGINE（ダメージ計算）
        │     ├─► SKILL（スキル発動）
        │     ├─► AUDIO（SE）
        │     ├─► ANIM（エフェクト）
        │     └─► UI（ログ・描画）
        ├─► FUSION（合体・パーティ）
        │     ├─► ENGINE（createDemon / getFusionResult）
        │     ├─► SKILL（inheritSkill）
        │     ├─► AUDIO（SE）
        │     ├─► ANIM（演出）
        │     └─► UI（描画）
        ├─► UI（画面描画）
        │     └─► ITEM（list / use）
        └─► SAVE（セーブ・ロード）
              └─► STATE（直接参照）
```

**重要:** `DATA` と `STATE` はすべてのモジュールからグローバル参照される。  
`ENGINE` と `UTIL` は副作用なし（純粋関数）。

---

## ■ STATE 設計

### PERSIST（localStorageに保存される）

`SAVE_KEYS = ['floor','macca','kills','fusions','bestFloor','party','storage','items']`

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `floor` | number | 現在のフロア |
| `macca` | number | 所持マッカ（通貨） |
| `kills` | number | 累計撃破数 |
| `fusions` | number | 累計合体回数 |
| `bestFloor` | number | 最大到達フロア |
| `party` | Demon[] | パーティ（最大3体） |
| `storage` | Demon[] | 倉庫（無制限） |
| `items` | Record<string,number> | アイテム所持数 |

### RUNTIME（セーブ対象外・セッション限り）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `floorProgress` | number | フロア内進捗（0〜5） |
| `exploring` | boolean | 探索中フラグ |
| `exploreTimer` | TimerID | setIntervalのID |
| `inBattle` | boolean | 戦闘中フラグ |
| `currentEnemy` | Enemy\|null | 現在の敵 |
| `fusionSlot` | 'a'\|'b'\|null | 合体スロット選択状態 |
| `fusionA / fusionB` | Demon\|null | 合体素材 |
| `_skillStoneActive` | boolean | スキル石使用フラグ（合体時） |
| `_guardActive` | boolean | 御札使用フラグ（戦闘時） |

> ⚠️ `STATE` はオブジェクト参照渡しのため、`party` / `storage` の要素はどこからでも直接変更可能。意図しない副作用に注意。

---

## ■ Demonオブジェクト構造

`createDemon(masterId, lv?)` が生成するインスタンス：

```javascript
{
  uid: number,          // ユニークID（Date.now() + Math.random()）
  masterId: number,     // DEMON_MASTERのid
  name: string,
  race: string,         // 妖精/鬼神/死霊/堕天使/幻魔/天使/魔王/竜神
  attr: string,         // 炎/氷/電/物/呪
  emoji: string,
  rare: 'C'|'B'|'A'|'S',
  lv: number,
  skills: string[],     // 最大2個
  maxHp: number,
  hp: number,
  atk: number,
  def: number,
  spd: number,
  exp: number,
  expNext: number,
  inParty: boolean,
}
```

---

## ■ 画面遷移

```
screen-title
  ├─► screen-explore（新規ゲーム / コンティニュー）
  │     ├─► screen-battle（エンカウント・ボス出現）
  │     │     └─► screen-explore（戦闘終了・逃走）
  │     │           └─► screen-gameover（全滅）
  │     ├─► screen-fusion（合体ラボボタン）
  │     └─► screen-party（仲魔ボタン）
  │           ├─ タブ: 仲魔一覧
  │           └─ タブ: アイテム（v0.4.4〜）
  └─► screen-title（ゲームオーバーから）
```

---

## ■ 探索ループ（自動進行）

```
G.toggleExplore()
  └─► setInterval(G._exploreStep, 2000ms)
        ├─ floorProgress < 5 かつ 非ボスフロア
        │     └─ 自動討伐 → macca加算 → ITEM.tryDrop() → addLog()
        └─ floorProgress >= 5 または ボスフロア（floor % 10 === 0）
              └─ exploring = false → clearInterval
                    └─ G._openBattle(spawnEnemy())
```

---

## ■ 戦闘フロー

```
BATTLE.open(enemy)
  └─► 戦闘画面表示 → AUDIO.playBgmBattle()
        ├─ G.doAttack() → BATTLE.attack()
        │     └─ calcDamage() → SKILL.activate() → 敵HP減少
        │           └─ 敵HP <= 0 → BATTLE._enemyDefeated()
        ├─ G.doSkill()  → BATTLE.skill()
        ├─ G.doFlee()   → BATTLE.flee()
        └─ G.startNegotiate() → BATTLE.startNegotiate()
              └─ G.doNegotiate(tactic) → BATTLE.negotiate()
                    ├─ 成功 → 仲魔加入 or アイテム
                    └─ 失敗 → 逃走 or 激怒

BATTLE._enemyDefeated()
  └─ 経験値 → applyLevelUp() → 次フロアへ or 探索再開

BATTLE._checkGameOver()
  └─ party全滅 → screen-gameover
```

---

## ■ セーブ・ロード

```javascript
// セーブ
saveGame()
  → SAVE_KEYS.forEach → JSON.stringify → localStorage.setItem('daemonrift_save')

// ロード
loadGame()
  → localStorage.getItem → JSON.parse → _sv チェック（スキーマバージョン検証）
  → 不一致: データ破棄 → null 返却
  → 一致: データ返却

// 注意: SAVE_SCHEMA_VERSION（現在: 2）と保存データの _sv が一致しない場合、旧データは自動破棄される
```

---

## ■ バージョン管理ルール

バージョン番号は以下の**3箇所を必ず同期**すること：

1. コメントヘッダー（1行目付近）: `Version : x.x.x`
2. `<meta name="version" content="x.x.x">`
3. `const APP_VERSION = 'x.x.x';`（[BLOCK: META]）

---

## ■ 後方互換ラッパー

`UI` オブジェクトのメソッドはグローバル関数としてもラップされている。  
**同名のグローバル関数を新たに定義しないこと。**

```javascript
function renderExplore()      { UI.renderExplore(); }
function renderPartyBar()     { UI.renderPartyBar(); }
function renderEnemyHP()      { UI.renderEnemyHP(); }
function setBattleLog(msg)    { UI.setBattleLog(msg); }
function addLog(msg, type='') { UI.addLog(msg, type); }
function playEnemyHitAnim()   { UI.playEnemyHitAnim(); }
function renderFusionScreen() { UI.renderFusionScreen(); }
function renderPartyScreen()  { UI.renderPartyScreen(); }
```
