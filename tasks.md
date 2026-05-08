# DAEMON RIFT — タスク・進捗管理

**最終更新:** 2026-05-08  
**現在のバージョン:** v0.8.0（戦闘UI大幅強化）

---

## ■ 運用ルール

- タスク完了時: `⬜` → `✅` に変更し、完了バージョンを記載
- 新規タスク発生時: 優先度を判断して適切なセクションに追加
- バグ・課題は `issues.md` に記載し、このファイルではタスクとしてのみ管理する

---

## ■ Phase 5 タスク一覧（最終調整・リリース）

### 優先度1 — リリースブロッカー

| 状態 | タスク | 備考 |
|------|--------|------|
| ✅ | アイテム画面UI実装 | v0.4.4で完了。仲魔画面にタブ追加 |
| ✅ | SAVE_SCHEMA_VERSION を 1→2 に更新 | v0.4.4で完了。showToast通知も追加 |
| ✅ | 戦闘中アイテム使用ボタン追加 | v0.4.4で完了。回復薬・万能薬・御札対応 |

### 優先度2 — リリース準備

| 状態 | タスク | 備考 |
|------|--------|------|
| ✅ | GitHub Pages へのデプロイ確認 | 確認OK |
| ✅ | スマートフォン実機での動作確認 | iOS Safari 確認OK |
| ✅ | ゲームタイトル最終決定 | DAEMON RIFT に正式決定 |

### 優先度3 — ドキュメント

| 状態 | タスク | 備考 |
|------|--------|------|
| ✅ | spec.md の Phase 5 を `✅ 完了` に更新 | 完了 |
| ✅ | HANDOVER.md の現状・タスク欄を最新化 | 完了 |

---

## ■ リリース後タスク（v0.4.5〜）

### 優先度中

| 状態 | タスク | 備考 |
|------|--------|------|
| ✅ | F50以降の難易度上限調整 | v0.4.6で完了。`spawnEnemy` スケール計算を `clamp(floor,1,50)` でキャップ（ISS-006） |
| ✅ | ISS-009 引継マッカシステム実装 | v0.4.5で完了。calcLegacyBonus追加・legacyMacca STATE追加 |
| ✅ | 戦闘中パーティHPストリップ実装 | v0.8.0で完了。常時表示・リード/死亡インジケータ付き |
| ✅ | 戦闘中パーティ交代機能 | v0.8.0で完了。1ターン消費・先頭入れ替え |
| ⬜ | Android Chrome 実機動作確認 | iOS Safari のみ確認済み。Android 未検証 |

---

## ■ フェーズ完了履歴

| フェーズ | 内容 | 完了バージョン |
|---------|------|--------------|
| Phase 1 | 仕様書策定 | v0.1.0 |
| Phase 2 | プロトタイプ・モジュール構造整備 | v0.2.x |
| Phase 3 | UI改善・アニメーション・BGM/SE | v0.3.x |
| Phase 4 | 合体システム本実装・悪魔データ拡充（25体・30パターン） | v0.4.1 |
| Phase 5 | 最終調整・リリース | ✅ 完了 |

---

## ■ バージョン履歴（全バージョン）

> index.html のコメントヘッダーには最新バージョンと日付のみ記載。詳細履歴はこのファイルで管理。

### v0.8.0（2026-05-08）
- 戦闘UIリデザイン: ヘッダーを横3分割（フロア・タイトル / 中央揃え / マッカ表示）に変更
- パーティHPストリップ追加: 戦闘中常時表示。リード仲魔はシアン枠・死亡仲魔は赤枠+半透明
- パーティ交代機能: 「🔀 交代」ボタンから先頭仲魔を交代可能（1ターン消費）
- 交渉成功率表示: 「話す」パネル開放時に現在レベル差から算出したリアルタイム%を表示
- 戦闘ログ多段表示: 最新3行を保持し古い行をフェード
- 敵レベル表示: 敵タグ行に「Lv?」を追加
- EXP表示: 敵撃破ログに `EXP+N` を追記
- デバフインジケータ: デバフスキル命中時に敵情報欄に「🔻 デバフ中」タグを表示
- マッカ表示: 戦闘ヘッダー右端に常時表示（交渉コスト支払い時にリアルタイム更新）
- 探索パーティバー: HP数値（現在/最大）を追加

### v0.7.0（2026-05-08）
- 探索演出強化: `ANIM.floorUp()` / `encounterAlert()` / `areaBanner()` / `logFlash()` を追加
- バグ修正: `AUDIO.seFloorUp()` が未接続だった問題を修正。`BATTLE._enemyDefeated()` でフロア昇階時に呼び出すよう接続
- プログレスバー危険状態: `STATE.floorProgress >= 4` 時に `danger` クラスを付与（橙→赤グラデーション+パルスアニメ）
- 瀕死HPパルス: `.hp-bar.critical` に `hp-pulse` アニメーションを追加（赤点滅）
- フロア到達演出: `_enemyDefeated()` 昇階時に `ANIM.floorUp()`（ゴールドポップ）と `AUDIO.seFloorUp()` を発火
- エリア遷移バナー: 廃都表層→地下街区→冥界回廊→虚無の底の境界突破時に `ANIM.areaBanner()` を表示
- エンカウント演出: `_exploreStep()` 戦闘突入時に赤フラッシュ、ボス時は追加シェイクを付与
- 自動討伐ログ: ランダム武器絵文字（⚔️🗡️💥⚡🌪️）＋`ANIM.logFlash()` で視覚的変化を追加

### v0.6.0（2026-05-06）
- バグ修正: `startNewGame()` で `_skillStoneActive` / `_guardActive` を `Object.assign` でリセット（ゲームオーバー時にフラグが残存すると新ゲームに引き継がれるバグ）
- バグ修正: `continueGame()` で全滅パーティのセーブをロードした際、探索画面に閉じ込められるバグを修正。`_pendingBonus` をセットしてゲームオーバー画面へ誘導
- 機能追加: スキル選択パネル実装 — `BATTLE.startSkillPanel()` / `cancelSkillPanel()` / `_executeSkill(skillName)` 追加。2スキル以上の仲魔でスキルボタン押下時に選択UIを表示し、任意スキルを使用可能に
- 機能追加: 深度帯ごとの探索BGM切り替え — `playBgmExplore(floor)` に floor 引数追加。廃都表層/地下街区/冥界回廊/虚無の底 の4段階でドローン周波数・音量・LFOレートが変化

### v0.5.1（2026-04-13）
- ISS-021 `toggleExplore()` で仲魔不在と全滅を別メッセージに分岐
- ISS-022 `_enemyDefeated()` 昇階ログに `🆙` 絵文字を追加
- ISS-023 `renderFusionScreen()` で合体不可・スロット未選択時に実行ボタンを `disabled` 化・`id="btn-fusion-exec"` 付与

### v0.5.0（2026-04-13）
- ISS-019 `flee()` 成功時の `setTimeout` 内に `saveGame()` を追加
- ISS-020 `_enemyAttack()` 御札発動後に `saveGame()` を追加

### v0.4.9（2026-04-12）
- ISS-015 `backToExplore()` に `renderExplore()` を追加（探索ボタン表示ズレ解消）
- ISS-016 全滅確定時に `battle-actions` を即座に非表示（連打防止）
- ISS-017 ゲームオーバー合体0件時を「0」→「－」表示に変更
- ISS-018 `renderPartyScreen()` でパーティ満員時に倉庫ボタンを `disabled` 化

### v0.4.8（2026-04-12）
- ISS-010 交渉マッカ不足時にパネルを閉じて戦闘アクションへ復帰
- ISS-011 `_exploreStep()` 自動討伐後に `saveGame()` を追加
- ISS-012 `renderPartyScreen()` 倉庫0体時に「— 倉庫は空 —」を表示
- ISS-013 `BATTLE.open()` でスキルボタンの `disabled` を仲魔スキル有無で制御・`id="btn-skill"` を付与
- ISS-014 `negotiate()` 失敗分岐に `saveGame()` を追加

### v0.4.7（2026-04-11）
- ISS-005 序盤（F10未満）ドロップ率 +5% 補正（`ITEM.tryDrop`）
- ISS-008 デバフ永続バグ修正（`BATTLE._enemyDefeated` で `_debuff` リセット）
- ISS-008 デバフ発動ログに「戦闘終了まで」を付記（UX改善）
- ISS-007 `ITEM.init()` 重複呼び出し削除（`count/add/use/list` から削除、`continueGame` にフォールバック追加）

### v0.4.6（2026-04-11）
- ISS-006 F50以降の難易度上限調整
  - `spawnEnemy()` のスケール計算に `scaledFloor=clamp(floor,1,50)` を導入
  - F49以下のスケールは完全に無変更
  - SAVE_SCHEMA_VERSION・STATE・SAVE_KEYS への変更なし

### v0.4.5（2026-04-10）
- ISS-009 引継マッカシステム実装
  - `calcLegacyBonus(bestFloor)` を ENGINE に追加（対数スケール・上限500₪）
  - `STATE.legacyMacca` を SAVE_KEYS に追加
  - `BATTLE._checkGameOver()` で計算・保存・リザルト表示
  - `G.startNewGame()` で引継マッカを初期マッカに加算
- `SAVE_SCHEMA_VERSION` を 2 → 3 に更新

### v0.4.4（2026-04-10）
- アイテム画面UI実装（仲魔画面にタブ追加）
  - `UI.switchPartyTab()` / `UI.renderItemScreen()` / `UI._useItem()` を追加
  - CSSにタブ・アイテムカードスタイルを追加
- バグ修正: `_enemyAttack()` 御札判定をダメージ適用前に修正
- バグ修正: `startNewGame()` に `items:{}` リセットを追加
- `SAVE_SCHEMA_VERSION` を 1→2 に更新（items追加に伴うスキーマ変更）
- `loadGame()` スキーマ不一致時に `showToast()` でユーザー通知を追加
- バージョン番号3箇所同期（コメントヘッダー / metaタグ / APP_VERSION）
- index.html CHANGELOG を最小化（最新バージョン+日付のみ残存）。詳細履歴を tasks.md に統合
- `<style>` を style.css に分離。`<link rel="stylesheet">` で読み込みに変更
- `<script>` を script.js に分離。`<script defer>` で読み込みに変更

### v0.4.3（2026-03-20）
- ITEMモジュール追加（6種: 回復薬/万能薬/スキル石/覚醒の書/マッカ袋/守りの御札）
  - `tryDrop()`: 探索自動討伐時にフロア依存確率でドロップ（8〜20%）
  - `use()`: アイテム使用効果の適用（スキル石・御札はフラグ管理）
- SAVE_KEYSに `items` 追加（セーブ対象）
- STATEに `_skillStoneActive` / `_guardActive` フラグ追加
- `FUSION.execute()` にスキル石による確定継承を統合
- `BATTLE._enemyAttack()` に守りの御札による無効化を統合

### v0.4.2（2026-03-20）
- バランス調整
  - `spawnEnemy`: 線形スケール → 対数スケール（`1+Math.log1p(floor-1)*0.45`）
  - 敵スケール係数: 0.35 → 0.45 / ボス倍率: 2.5× → 1.9×
  - `calcDamage`: 防御係数 0.4 → 0.5
  - ピクシー初期ステータス強化（F1勝率18% → 68%）
  - LvUP時HP回復量増加（3-6 → 5-10）

### v0.4.1（2026-03-20）
- SKILLモジュール追加（37スキル: attack/heal/buff/debuff/special）
  - `SKILL.activate()`: 発動・ダメージ計算・属性相性・デバフ処理
  - `SKILL.inheritSkill()`: 合体時スキル継承
  - `SKILL.describe()`: UIツールチップ用説明取得
- `BATTLE.skill()` を `SKILL.activate()` 経由に統一
- `FUSION.execute()` のスキル継承を `SKILL.inheritSkill()` 経由に統一

### v0.4.0（2026-03-20）
- 悪魔データ拡充: 10体 → 25体（C/B/A/Sランク）
- 種族追加: 竜神 / 魔王
- 合体テーブル拡充: 8 → 30パターン（同種族合体・上位合体含む）

### v0.3.3（2026-03-20）
- AUDIOモジュール追加（Web Audio API 手続き型生成）
  - BGM: 探索（ドローン）/ 戦闘（通常・ボス）
  - SE: 攻撃・被ダメ・弱点・逃走・交渉成功・レベルアップ・合体・全滅・階層上昇
  - ミュートトグル（localStorage保存）
- ANIMモジュール追加（CSS エフェクト）
  - 画面遷移フェードイン・属性カラーフラッシュ・弱点フラッシュ
  - ダメージ数値フロート・レベルアップバナー・合体演出・シェイク
  - keyframes追加（floatUp / bannerPop / fusionSpin / fadeIn / shake）

### v0.3.2（2026-03-20）
- UIモジュール（UIオブジェクト）をグローバル関数群から独立分離
- グローバル関数はUI.xxxへの後方互換ラッパーとして残置

### v0.3.1（2026-03-20）
- FUSIONモジュールをGから独立分離（selectSlot / selectDemon / execute / toggleParty）

### v0.3.0（2026-03-20）
- BATTLEモジュールをGから独立分離（open / attack / skill / flee / negotiate 等）

### v0.2.1（2026-03-20）
- SAVEブロックに `SAVE_SCHEMA_VERSION` を導入
- `loadGame()` でスキーマ不一致時に旧データを安全破棄するバリデーション追加
- `saveGame()` の保存データに `_sv` フィールドを付与

### v0.2.0（2026-03-20）
- バージョン管理をコメントヘッダー / metaタグ / タイトル画面に統合
- STATEを SAVE_KEYS（保存対象）とランタイムに明示分離
- JSを責務別ブロック（DATA/UTIL/ENGINE/SAVE/UI/CONTROLLER）に再編
- 定数（AFFINITY/FUSION_TABLE/AREAS）をDATAブロックへ集約

### v0.1.0（2026-03-20）
- プロトタイプ初版

---

## ■ 将来検討タスク（Phase 5 完了後）

> 現バージョンには影響しない。完了後に優先度を再評価する。

- スキルデバフの厳密なターン管理実装（現状は戦闘終了まで永続）
- `ITEM.init()` の重複呼び出しリファクタリング
