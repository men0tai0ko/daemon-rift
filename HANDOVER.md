# DAEMON RIFT — 開発引き継ぎパッケージ

> **次セッションへ:** このファイルを読めば追加説明なしで即座に開発を再開できます。  
> 詳細仕様は `spec.md`、コード構造は `architecture.md`、タスクは `tasks.md`、バグは `issues.md` を参照。

---

## ■ START HERE

**プロジェクト:** 女神転生世界観のブラウザ向けタップ系RPG。悪魔を仲魔にし、合体で強化しながら廃都の深層へ潜る放置＋育成ゲーム。3ファイル構成（index.html / style.css / script.js）、スマートフォン縦持ち最適化。

**現在のバージョン:** v0.4.5
**現在の状態:** リリース済み。ISS-009（引継マッカシステム）を実装。次フェーズはF50以降の難易度調整・Android確認。

---

## ■ 直近の変更内容

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

### 1. F50以降の難易度上限調整（優先度: 中）
F50以降の勝率が90%+でやりごたえ不足の可能性。`spawnEnemy()` のスケール係数またはボス倍率を調整する。

### 2. Android Chrome 実機動作確認（優先度: 中）
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
APP_VERSION          = '0.4.4'   // script.js [BLOCK: META]
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
| F50 | BOSS | 92% | △ やや楽 |
| F70+ | BOSS | 95%+ | △ 放置ゲームとして許容 |

---

## ■ 次チャット用プロンプト

```
以下の引き継ぎ内容を前提に、DAEMON RIFTの開発を継続してください。

【プロジェクト】
ブラウザ向けタップ系RPG「DAEMON RIFT」。
女神転生世界観・悪魔合体・放置探索。スマホ縦持ち最適化。
ファイル構成: index.html / style.css / script.js（3ファイル構成）
公開URL: https://men0tai0ko.github.io/daemon-rift/

【現在のバージョン】v0.4.5

【実装済みモジュール（script.js内ブロック順）】
META / DATA / STATE / UTIL / ENGINE / SKILL / ITEM / SAVE / UI / AUDIO / ANIM / BATTLE / FUSION / G(コントローラ)

【最優先タスク】
F50以降の難易度上限調整（spawnEnemy のスケール係数またはボス倍率を調整）

【次の優先順位】
1. F50以降の難易度上限調整（ISS-006）
2. Android Chrome 実機動作確認

【重要な制約】
- 3ファイル構成維持（index.html / style.css / script.js）。追加ファイル禁止
- バージョン番号はindex.htmlコメントヘッダー・metaタグ・script.js APP_VERSION定数の3箇所を同期
- SAVE_KEYSにフィールド追加時は必ず配列に追記
- UIオブジェクトと同名のグローバル関数を定義しないこと
- 変更は既存機能を壊さない最小差分を原則とする

HANDOVER.md に詳細な引き継ぎ情報があります。作業前に必ず確認してください。
```
