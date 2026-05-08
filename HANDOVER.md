# DAEMON RIFT — 開発引き継ぎパッケージ

> **次セッションへ:** このファイルを読めば追加説明なしで即座に開発を再開できます。  
> 詳細仕様は `spec.md`、コード構造は `architecture.md`、タスクは `tasks.md`、バグは `issues.md` を参照。

---

## ■ START HERE

**プロジェクト:** 女神転生世界観のブラウザ向けタップ系RPG。悪魔を仲魔にし、合体で強化しながら廃都の深層へ潜る放置＋育成ゲーム。3ファイル構成（index.html / style.css / script.js）、スマートフォン縦持ち最適化。

**現在のバージョン:** v0.8.0
**現在の状態:** リリース済み。戦闘UI大幅強化（パーティHP常時表示・交代・交渉成功率・多段ログほか10改善）。OPEN issueゼロ。次フェーズはAndroid Chrome実機動作確認。

---

## ■ 直近の変更内容

### v0.8.0（2026-05-08）
- **機能追加:** 戦闘中パーティHPストリップ（`battle-party-strip`）— 戦闘ヘッダー直下に常時表示。`UI.renderBattlePartyStrip()` で描画。リード仲魔はシアン枠・死亡仲魔は赤枠+半透明。`BATTLE.open()` / `_enemyAttack()` / `_executeSkill()` / `applyBattleItem()` / `doPartySwap()` から呼ばれる
- **機能追加:** パーティ交代機能 — `BATTLE.openPartySwap()` / `cancelPartySwap()` / `doPartySwap(uid)` を追加。「🔀 交代」ボタンから先頭を変更。1ターン消費（`_enemyAttack()` を呼ぶ）
- **機能追加:** 交渉成功率リアルタイム表示 — `startNegotiate()` で `calcNegotiateRate()` を使い %表記に更新
- **機能追加:** 戦闘ログ多段表示 — `setBattleLog()` を書き替え。最新3行を保持し古い行に `old` クラスでフェード
- **機能追加:** 敵レベル表示 — `id="enemy-lv-tag"` を追加。`BATTLE.open()` で設定
- **機能追加:** EXP表示 — `_enemyDefeated()` のログに `EXP+N` を追記
- **機能追加:** デバフインジケータ — `_executeSkill()` でデバフ命中時に `id="enemy-debuff"` を表示
- **機能追加:** 戦闘中マッカ常時表示 — ヘッダー右端 `id="battle-macca-display"`。`BATTLE.open()` と交渉コスト支払い時に更新
- **機能改善:** 探索パーティバーにHP数値（現在/最大）を追加（`UI.renderPartyBar()` の card.innerHTML）
- **HTML変更:** `battle-log-area` の `id` を内部 div から外部コンテナに移動。`negotiate-opts` に `id` 追加（動的更新用）。`party-swap-panel` を追加

### v0.7.0（2026-05-08）
- **バグ修正:** `AUDIO.seFloorUp()` が存在するにもかかわらずどこからも呼ばれていなかった問題を修正。`BATTLE._enemyDefeated()` のフロア昇階分岐で接続
- **機能追加:** `ANIM.floorUp()` — 昇階時に `#floor-display` をゴールドglow+スケールポップ
- **機能追加:** `ANIM.encounterAlert(isBoss)` — エンカウント直前にフルスクリーン赤フラッシュ（ボスは金色）
- **機能追加:** `ANIM.areaBanner(areaName)` — エリア境界突破時（F11/31/61）に紫バナーを表示
- **機能追加:** `ANIM.logFlash()` — 自動討伐ごとにログエリアを微フラッシュ
- **UI強化:** プログレスバー4/5以上で `danger` クラス付与（橙グラデーション+パルスアニメ）
- **UI強化:** `.hp-bar.critical` に赤点滅アニメを追加（CSS のみ）
- **ログ演出:** 自動討伐ログにランダム武器絵文字（⚔️🗡️💥⚡🌪️）を追加
- **ボス演出:** ボス出現時に `encounterAlert` + `screenShake` を重ねがけ

### v0.6.0（2026-05-06）
- **バグ修正:** `startNewGame()` の `Object.assign` に `_skillStoneActive:false, _guardActive:false` を追加。ゲームオーバー時にフラグが残存したまま新ゲームが始まるバグを修正
- **バグ修正:** `continueGame()` で全滅パーティのセーブをロードした際の詰み問題を修正。`_pendingBonus` をセットしてゲームオーバー画面へ誘導する分岐を追加
- **機能追加:** スキル選択パネル実装。`BATTLE.startSkillPanel()` / `cancelSkillPanel()` / `_executeSkill(skillName)` を追加。`skill()` を改修し、1スキル時は直接発動・2スキル以上でパネルを表示。`index.html` に `id="skill-panel"` を付与
- **機能追加:** 深度帯ごとの探索BGM切り替え。`playBgmExplore(floor)` に floor 引数追加（デフォルト=1）。廃都表層/地下街区/冥界回廊/虚無の底 の4段階でドローン周波数・音量・LFOレートが変化。全 `playBgmExplore()` 呼び出しに `STATE.floor` を渡すよう更新

### v0.5.1（2026-04-13）
- **ISS-021:** `toggleExplore()` で仲魔不在（0体）と全滅（全員HP0）を別メッセージに分岐
- **ISS-022:** `_enemyDefeated()` 昇階ログに `🆙` 絵文字を追加し視覚フィードバックを強化
- **ISS-023:** `renderFusionScreen()` で合体不可・スロット未選択時に実行ボタンを `disabled` 化。`index.html` に `id="btn-fusion-exec"` を付与

### v0.5.0（2026-04-13）
- **ISS-019:** `BATTLE.flee()` 成功時の `setTimeout` 内に `saveGame()` を追加（逃走後の floorProgress 消失防止）
- **ISS-020:** `BATTLE._enemyAttack()` 御札発動後に `saveGame()` を追加（`_guardActive` 消費確定をセーブ保証）

### v0.4.9（2026-04-12）
- **ISS-015:** `backToExplore()` に `renderExplore()` を追加し探索ボタン表示ズレを解消
- **ISS-016:** 全滅確定時に `battle-actions` を即座に `display:none` にして連打による多重呼び出しを防止
- **ISS-017:** ゲームオーバー画面の合体0件時を「0」→「－」表示に変更
- **ISS-018:** `renderPartyScreen()` でパーティ満員時に倉庫悪魔のボタンへ `disabled` クラスを付与

### v0.4.8（2026-04-12）
- **ISS-010:** `negotiate()` マッカ不足時に交渉パネルを閉じて戦闘アクションへ復帰するよう修正
- **ISS-011:** `_exploreStep()` 自動討伐分岐末尾に `saveGame()` を追加（kills/macca/drop消失防止）
- **ISS-012:** `renderPartyScreen()` で倉庫0体時に「— 倉庫は空 —」を表示
- **ISS-013:** `BATTLE.open()` でリード仲魔のスキル有無に応じてスキルボタンの `disabled` を制御。`index.html` に `id="btn-skill"` を付与
- **ISS-014:** `negotiate()` 失敗分岐（激怒後）に `saveGame()` を追加（金で解決失敗時のマッカ減算消失防止）

### v0.4.7（2026-04-11）
- **ISS-005 序盤ドロップ率補正:** `ITEM.tryDrop()` で F10未満に +5% 補正を追加
- **ISS-008 デバフ永続解消:** `BATTLE._enemyDefeated()` で `_debuff` フィールドをリセット・ログに「戦闘終了まで」を明記
- **ISS-007 `ITEM.init()` 重複削除:** `count/add/use/list` 内の `init()` 呼び出しを削除。`startNewGame` の `items:{}` と `continueGame` のフォールバックで初期化を保証

### v0.4.6（2026-04-11）
- **ISS-006 F50以降の難易度上限調整:** `spawnEnemy()` のスケール計算に使う `floor` を `clamp(floor,1,50)` でキャップ
  - 変更箇所は `[BLOCK: ENGINE]` の `spawnEnemy()` 内1行のみ
  - F1〜F49 のスケールは完全に無変更
  - SAVE_SCHEMA_VERSION・STATE・SAVE_KEYS への変更なし

### v0.4.5（2026-04-10）
- **ISS-009 引継マッカシステム実装:** ゲームオーバー時に `bestFloor` から引継マッカを計算・保存
  - `calcLegacyBonus(bestFloor)` を `[BLOCK: ENGINE]` に純粋関数として追加
  - `STATE.legacyMacca` を `SAVE_KEYS` に追加
  - `BATTLE._checkGameOver()` で計算・保存・リザルト画面に「次回引継額」表示
  - `G.startNewGame()` で引継マッカを初期マッカに加算、ログ表示
- **`SAVE_SCHEMA_VERSION` を 3 に更新**（`legacyMacca` フィールド追加）

### v0.4.4（2026-04-10）
- **アイテム画面UI実装:** 仲魔一覧画面（screen-party）にタブを追加
  - `UI.switchPartyTab(tab)` / `UI.renderItemScreen()` / `UI._useItem(itemName)` を追加
  - スキル石は「合体時使用」ラベルのみ（使用ボタンなし）
- **バグ修正:** `_enemyAttack()` 御札判定をダメージ適用前に移動
- **バグ修正:** `startNewGame()` に `items:{}` リセットを追加
- **SAVE_SCHEMA_VERSION を 2 に更新:** `loadGame()` に `showToast()` 通知を追加
- **バージョン番号3箇所同期:** コメントヘッダー / metaタグ / APP_VERSION
- **index.html CHANGELOG 最小化:** 詳細履歴を tasks.md に統合
- **style.css 分離:** `<style>` を外部ファイルに分離（内容は無変更）
- **script.js 分離:** `<script>` を外部ファイルに分離（内容は無変更・`defer` 付き）

### v0.4.3（2026-03-20）
- ITEMモジュール追加（6種: 回復薬/万能薬/スキル石/覚醒の書/マッカ袋/守りの御札）
- SAVE_KEYSに `items` 追加
- STATEに `_skillStoneActive` / `_guardActive` フラグ追加

### v0.4.2（2026-03-20）
- バランス調整: 敵スケール対数化 / ボス倍率1.9× / 防御係数0.5 / ピクシー強化

---

## ■ 次にやるべきこと

優先度順。詳細は `tasks.md` を参照。

### 1. Android Chrome 実機動作確認（優先度: 中）
（v0.8.0でも未実施）
iOS Safari は確認済み。Android Chrome での動作・レイアウト・音声を未確認。

---

## ■ 現在の実装状態

| 機能 | 状態 | 備考 |
|------|------|------|
| 探索ループ（放置自動） | ✅ | 2秒間隔 setInterval |
| 戦闘システム | ✅ | 属性相性・スキル発動・交渉・逃走 |
| 合体システム | ✅ | 30パターン・スキル継承 |
| 仲魔管理 | ✅ | パーティ3体・倉庫無制限 |
| レベルアップ | ✅ | 経験値・ステータス成長 |
| BGM/SE | ✅ | Web Audio API 手続き型生成 |
| アニメーション | ✅ | フラッシュ・バナー・合体演出等 |
| セーブ/ロード | ✅ | localStorage・スキーマバリデーション |
| アイテムロジック | ✅ | ドロップ・使用効果 |
| アイテムUI | ✅ | 仲魔画面タブ（v0.4.4） |
| 戦闘中アイテム使用 | ✅ | 回復薬・万能薬・御札対応（v0.4.4） |
| ゲームオーバー画面 | ✅ | 戦績表示・リスタート |

---

## ■ 触ると壊れやすい箇所

| 箇所 | 理由 |
|------|------|
| `SAVE_KEYS` 配列 | 追加漏れると `saveGame()` でセーブされない |
| `SAVE_SCHEMA_VERSION` | 変更すると既存セーブデータが全破棄される |
| `BATTLE._enemyAttack()` | `_guardActive` フラグのリセット忘れに注意 |
| `FUSION.execute()` | `_skillStoneActive` フラグのリセット忘れに注意 |
| `G.continueGame()` | `SAVE_KEYS.forEach` で STATE を復元するため、SAVE_KEYS に含まれないフィールドはリセットされない |
| `UI` オブジェクトのメソッド名 | グローバル後方互換ラッパーが並存しているため、同名のグローバル関数を新たに定義しないこと |

---

## ■ 設計上の制約

- **3ファイル構成:** index.html / style.css / script.js。追加の外部ファイル・CDN依存禁止
- **STATE はオブジェクト参照渡し** のため party/storage 要素は直接変更可能。意図しない副作用に注意
- **バージョン番号は3箇所同期:** index.html コメントヘッダー / `<meta name="version">` / `APP_VERSION`（script.js内）

---

## ■ 未確定仕様

| 項目 | 状態 |
|------|------|
| ゲームタイトル | ✅ 確定（DAEMON RIFT） |
| F50以降の難易度上限 | 調整予定（ISS-006） |
| スキルデバフ効果の持続ターン管理 | 現状は永続。厳密なターン管理は未実装 |

---

## ■ 主要定数・設定値

```javascript
APP_VERSION          = '0.8.0'   // script.js [BLOCK: META]
SAVE_SCHEMA_VERSION  = 3         // script.js [BLOCK: SAVE]（v0.4.5でlegacyMacca追加）
LS_KEY_SAVE          = 'daemonrift_save'
LS_KEY_BEST          = 'daemonrift_best'
探索間隔              = 2000ms (setInterval)
アイテムドロップ率    = 8%〜20%（フロアで増加）
パーティ最大          = 3体
敵スケール式          = 1 + Math.log1p(floor-1) * 0.45
ボス倍率              = 1.9×
```

---

## ■ バランスデータ

| フロア | ボス | 勝率目安 | 評価 |
|--------|------|--------|------|
| F1 | - | 68% | ✅ 適正 |
| F10 | BOSS | 53% | ✅ 適正 |
| F20 | BOSS | 72% | ✅ 適正 |
| F30 | BOSS | 78% | ✅ 適正 |
| F50 | BOSS | ~80% | ✅ 適正（v0.4.6調整済）|
| F70+ | BOSS | ~80% | ✅ 適正（v0.4.6調整済）|

---

## ■ 次チャット用プロンプト

```
以下の引き継ぎ内容を前提に、DAEMON RIFTの開発を継続してください。

【プロジェクト】
ブラウザ向けタップ系RPG「DAEMON RIFT」。
女神転生世界観・悪魔合体・放置探索。スマホ縦持ち最適化。
ファイル構成: index.html / style.css / script.js（3ファイル構成）
公開URL: https://men0tai0ko.github.io/daemon-rift/

【現在のバージョン】v0.4.6

【実装済みモジュール（script.js内ブロック順）】
META / DATA / STATE / UTIL / ENGINE / SKILL / ITEM / SAVE / UI / AUDIO / ANIM / BATTLE / FUSION / G(コントローラ)

【最優先タスク】
Android Chrome 実機動作確認

【次の優先順位】
1. Android Chrome 実機動作確認

【重要な制約】
- 3ファイル構成維持（index.html / style.css / script.js）。追加ファイル禁止
- バージョン番号はindex.htmlコメントヘッダー・metaタグ・script.js APP_VERSION定数の3箇所を同期
- SAVE_KEYSにフィールド追加時は必ず配列に追記
- UIオブジェクトと同名のグローバル関数を定義しないこと
- 変更は既存機能を壊さない最小差分を原則とする

HANDOVER.md に詳細な引き継ぎ情報があります。作業前に必ず確認してください。
```
