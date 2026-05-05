// ================================================================
// [BLOCK: META] バージョン情報
// HTMLコメントヘッダー / metaタグ / タイトル画面 の3点と同期させること
// ================================================================
const APP_VERSION = '0.5.2';
const APP_NAME    = 'DAEMON RIFT';

// ================================================================
// [BLOCK: DATA] マスターデータ・定数
// 将来の分割先: data.js
// ================================================================

// 悪魔マスターデータ — Phase 4 で 20 体以上に拡充予定
const DEMON_MASTER = [
  // ── C ランク（フロア1〜10帯）──
  { id:1,  name:"ピクシー",        race:"妖精",   attr:"氷", emoji:"🧚", lv:1,  hp:40,  atk:12, def:7,  spd:12, skills:["ブフ"],                rare:"C" },
  { id:2,  name:"スライム",        race:"妖精",   attr:"物", emoji:"🫧", lv:1,  hp:25,  atk:6,  def:8,  spd:8,  skills:["たたく"],              rare:"C" },
  { id:3,  name:"コボルド",        race:"妖精",   attr:"物", emoji:"🐺", lv:2,  hp:35,  atk:10, def:6,  spd:10, skills:["噛みつき"],            rare:"C" },
  { id:4,  name:"ジャックランタン",race:"鬼神",   attr:"炎", emoji:"🎃", lv:3,  hp:45,  atk:12, def:7,  spd:9,  skills:["アギ"],                rare:"C" },
  { id:5,  name:"ゾンビ",          race:"死霊",   attr:"呪", emoji:"🧟", lv:2,  hp:50,  atk:9,  def:10, spd:5,  skills:["腐敗"],                rare:"C" },
  { id:11, name:"インプ",          race:"鬼神",   attr:"炎", emoji:"😈", lv:2,  hp:30,  atk:11, def:4,  spd:13, skills:["火炎"],                rare:"C" },
  { id:12, name:"ゴースト",        race:"死霊",   attr:"呪", emoji:"👻", lv:3,  hp:40,  atk:8,  def:5,  spd:15, skills:["呪い"],                rare:"C" },
  { id:13, name:"マンドラゴラ",    race:"妖精",   attr:"物", emoji:"🌿", lv:4,  hp:55,  atk:10, def:12, spd:6,  skills:["根縛り"],              rare:"C" },

  // ── B ランク（フロア11〜30帯）──
  { id:6,  name:"シャドウ",        race:"堕天使", attr:"呪", emoji:"👤", lv:4,  hp:40,  atk:14, def:6,  spd:14, skills:["呪縛"],                rare:"B" },
  { id:7,  name:"ケルベロス",      race:"幻魔",   attr:"炎", emoji:"🐕", lv:8,  hp:80,  atk:22, def:14, spd:11, skills:["アギラオ","噛みつき"], rare:"B" },
  { id:8,  name:"メデューサ",      race:"幻魔",   attr:"氷", emoji:"🐍", lv:7,  hp:70,  atk:18, def:12, spd:13, skills:["石化眼","ブフーラ"],   rare:"B" },
  { id:14, name:"サキュバス",      race:"堕天使", attr:"呪", emoji:"🦇", lv:6,  hp:60,  atk:16, def:8,  spd:16, skills:["魅了","暗黒"],         rare:"B" },
  { id:15, name:"タコマ",          race:"幻魔",   attr:"電", emoji:"🐙", lv:7,  hp:75,  atk:20, def:11, spd:9,  skills:["稲妻触手","ジオ"],     rare:"B" },
  { id:16, name:"フェンリル",      race:"幻魔",   attr:"氷", emoji:"🐺", lv:9,  hp:90,  atk:24, def:13, spd:17, skills:["ブフーラ","咆哮"],     rare:"B" },
  { id:17, name:"ヴァルキリー",    race:"天使",   attr:"電", emoji:"⚔️", lv:8,  hp:85,  atk:26, def:16, spd:14, skills:["ジオンガ","天剣"],     rare:"B" },
  { id:18, name:"ナーガ",          race:"幻魔",   attr:"物", emoji:"🌊", lv:6,  hp:65,  atk:17, def:15, spd:8,  skills:["水流","締め付け"],     rare:"B" },

  // ── A ランク（フロア31〜60帯）──
  { id:9,  name:"アスタロト",      race:"堕天使", attr:"呪", emoji:"👑", lv:12, hp:110, atk:30, def:18, spd:10, skills:["メギド","混乱"],       rare:"A" },
  { id:10, name:"セラフ",          race:"天使",   attr:"電", emoji:"😇", lv:10, hp:90,  atk:25, def:20, spd:15, skills:["ジオ","回復"],         rare:"A" },
  { id:19, name:"バアル",          race:"魔王",   attr:"炎", emoji:"🔥", lv:15, hp:140, atk:38, def:20, spd:12, skills:["マハラギオン","支配"],  rare:"A" },
  { id:20, name:"リリス",          race:"堕天使", attr:"呪", emoji:"🌙", lv:13, hp:120, atk:32, def:15, spd:18, skills:["魅惑の歌","呪詛"],     rare:"A" },
  { id:21, name:"ガルーダ",        race:"天使",   attr:"電", emoji:"🦅", lv:14, hp:130, atk:35, def:22, spd:20, skills:["天雷","疾風"],         rare:"A" },
  { id:22, name:"ラミア",          race:"幻魔",   attr:"氷", emoji:"🧊", lv:12, hp:115, atk:28, def:25, spd:10, skills:["ブフダイン","封印眼"],  rare:"A" },

  // ── S ランク（フロア61〜帯）──
  { id:23, name:"ルシファー",      race:"魔王",   attr:"呪", emoji:"😈", lv:25, hp:220, atk:58, def:35, spd:22, skills:["メギドラ","堕天"],     rare:"S" },
  { id:24, name:"ミカエル",        race:"天使",   attr:"電", emoji:"✨", lv:22, hp:200, atk:52, def:40, spd:25, skills:["サンダーゲイル","聖剣"],rare:"S" },
  { id:25, name:"ティアマト",      race:"竜神",   attr:"物", emoji:"🐉", lv:20, hp:250, atk:55, def:45, spd:15, skills:["竜撃","大地震"],       rare:"S" },
];
// 属性相性テーブル（攻撃属性 → 防御属性: 倍率）
const AFFINITY = {
  "炎":{"炎":.5,"氷":2,"電":1,"物":1,"呪":1},
  "氷":{"炎":.5,"氷":.5,"電":2,"物":1,"呪":1},
  "電":{"炎":1,"氷":1,"電":.5,"物":1.5,"呪":1},
  "物":{"炎":1,"氷":1,"電":1,"物":1,"呪":1.5},
  "呪":{"炎":1,"氷":1,"電":1,"物":.5,"呪":.5},
};

// 合体テーブル（種族A+種族B → 生成悪魔ID）
const FUSION_TABLE = {
  // 妖精 ×
  "妖精+鬼神":    7,   // → ケルベロス
  "妖精+死霊":    6,   // → シャドウ
  "妖精+堕天使":  8,   // → メデューサ
  "妖精+幻魔":    14,  // → サキュバス
  "妖精+天使":    17,  // → ヴァルキリー
  "妖精+魔王":    19,  // → バアル
  // 鬼神 ×
  "鬼神+死霊":    9,   // → アスタロト
  "鬼神+幻魔":    10,  // → セラフ
  "鬼神+堕天使":  20,  // → リリス
  "鬼神+天使":    21,  // → ガルーダ
  "鬼神+魔王":    23,  // → ルシファー
  "鬼神+竜神":    25,  // → ティアマト
  // 死霊 ×
  "死霊+幻魔":    9,   // → アスタロト
  "死霊+天使":    10,  // → セラフ
  "死霊+堕天使":  20,  // → リリス
  "死霊+魔王":    23,  // → ルシファー
  "死霊+竜神":    22,  // → ラミア
  // 堕天使 ×
  "堕天使+天使":  10,  // → セラフ
  "堕天使+幻魔":  22,  // → ラミア
  "堕天使+魔王":  23,  // → ルシファー
  "堕天使+竜神":  19,  // → バアル
  // 幻魔 ×
  "幻魔+天使":    21,  // → ガルーダ
  "幻魔+魔王":    25,  // → ティアマト
  "幻魔+竜神":    25,  // → ティアマト
  // 天使 ×
  "天使+魔王":    24,  // → ミカエル
  "天使+竜神":    24,  // → ミカエル
  // 魔王 ×
  "魔王+竜神":    23,  // → ルシファー（最上位合体）
  // 同種族合体（強化）
  "妖精+妖精":    15,  // → タコマ
  "鬼神+鬼神":    7,   // → ケルベロス
  "死霊+死霊":    14,  // → サキュバス
};
// エリア定義（深度帯）
const AREAS = [
  {minFloor:1, name:"廃都表層"},{minFloor:11,name:"地下街区"},
  {minFloor:31,name:"冥界回廊"},{minFloor:61,name:"虚無の底"},
];

// ================================================================
// [BLOCK: STATE] ゲーム状態
//
// SAVE_KEYS: localStorageに保存するフィールド名の一覧
//   新規フィールド追加時はここへの追記要否を必ず確認すること
//
// ランタイム専用（保存不要）:
//   exploring / exploreTimer / inBattle / currentEnemy /
//   fusionSlot / fusionA / fusionB
//
// 将来の分割先: state.js
// ================================================================
const SAVE_KEYS = ['floor','macca','kills','fusions','bestFloor','party','storage','items','legacyMacca']; // ISS-009: legacyMacca 追加

const STATE = {
  // セーブ対象 [PERSIST]
  floor:1, macca:100, kills:0, fusions:0, bestFloor:1,
  party:[], storage:[], items:{},
  legacyMacca:0, // ISS-009: ゲームオーバー時に計算・保存する引継マッカ
  // ランタイム専用（セーブ対象外）[RUNTIME]
  floorProgress:0,
  exploring:false, exploreTimer:null,
  inBattle:false, currentEnemy:null,
  fusionSlot:null, fusionA:null, fusionB:null,
  _skillStoneActive:false, _guardActive:false,
  _pendingBonus:0, // ISS-009: _checkGameOver()でのみセット・startNewGame()で消費（RUNTIME）
};

// ================================================================
// [BLOCK: UTIL] 汎用ユーティリティ
// 将来の分割先: util.js
// ================================================================
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function chance(rate){return Math.random()<rate}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v))}
function showToast(msg,duration=2000){
  const el=document.getElementById('toast');
  el.textContent=msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),duration);
}

// ================================================================
// [BLOCK: ENGINE] ゲームロジック（純粋計算・データ操作）
// UIに依存しない処理のみ記述する
// 将来の分割先: engine.js
// ================================================================

// マスターデータからレベルスケール済みの悪魔インスタンスを生成する
function createDemon(masterId,overrideLv=null){
  const m=DEMON_MASTER.find(d=>d.id===masterId);
  if(!m)return null;
  const lv=overrideLv??m.lv, s=1+(lv-1)*0.12;
  return{
    uid:Date.now()+Math.random(),masterId:m.id,
    name:m.name,race:m.race,attr:m.attr,emoji:m.emoji,rare:m.rare,lv,
    skills:[...m.skills],
    maxHp:Math.floor(m.hp*s),hp:Math.floor(m.hp*s),
    atk:Math.floor(m.atk*s),def:Math.floor(m.def*s),spd:Math.floor(m.spd*s),
    exp:0,expNext:lv*20,inParty:false,
  };
}

// フロアに応じた敵悪魔を生成する（isBoss=true でボス倍率を適用）
function spawnEnemy(floor,isBoss=false){
  const pool=DEMON_MASTER.filter(d=>d.lv<=Math.ceil(floor/3)+2);
  const base=pool[rand(0,pool.length-1)];
  const lv=clamp(rand(floor,floor+2),1,60);
  // 線形スケールは高フロアで指数爆発するため対数スケールに変更
  // ISS-006: F50以降の勝率過多を抑制するため、スケール計算用floorをF50でキャップ
  const scaledFloor=clamp(floor,1,50);
  const s=(1+Math.log1p(scaledFloor-1)*0.45)*(isBoss?1.9:1);
  return{
    name:isBoss?`【BOSS】${base.name}`:base.name,
    race:base.race,attr:base.attr,emoji:base.emoji,
    isBoss,skills:[...base.skills],lv,masterId:base.id,
    maxHp:Math.floor(base.hp*s),hp:Math.floor(base.hp*s),
    atk:Math.floor(base.atk*s),def:Math.floor(base.def*s),
  };
}

// ダメージ計算（属性相性・分散込み）
function calcDamage(att,def){
  const base=Math.max(1,att.atk-def.def*0.5);
  const aff=AFFINITY[att.attr]?.[def.attr]??1;
  return Math.floor(base*aff*(0.85+Math.random()*0.3));
}

// 交渉成功率を返す
function calcNegotiateRate(playerLv,enemyLv,tactic){
  const base={"おだてる":.45,"脅す":.25,"金で解決":.65};
  return clamp((base[tactic]??.4)+(playerLv-enemyLv)*0.05,0.05,0.9);
}

// 合体結果のプレビューを返す（合体不可なら null）
function getFusionResult(a,b){
  const rid=FUSION_TABLE[`${a.race}+${b.race}`]??FUSION_TABLE[`${b.race}+${a.race}`];
  if(!rid)return null;
  const base=DEMON_MASTER.find(d=>d.id===rid);
  if(!base)return null;
  return{masterId:rid,name:base.name,emoji:base.emoji,
    lv:Math.floor((a.lv+b.lv)/2)+1,skill:chance(.5)?a.skills[0]:b.skills[0]};
}

// レベルアップ処理（STATEの悪魔オブジェクトを直接更新する）
function applyLevelUp(demon){
  demon.lv++;demon.exp=0;demon.expNext=demon.lv*20;
  demon.maxHp+=rand(5,10);demon.hp=demon.maxHp;
  demon.atk+=rand(1,2);demon.def+=rand(1,2);
}

// ISS-009: 次回引継マッカを計算する純粋関数（副作用なし）
// 計算式: floor(log1p(bestFloor) × 80)、上限 500₪
function calcLegacyBonus(bestFloor){
  return Math.min(500, Math.floor(Math.log1p(bestFloor) * 80));
}


// ================================================================
// [BLOCK: SKILL] スキル定義・発動判定・継承
// 責務: スキルマスター管理・戦闘時発動・合体時継承ルール
// 将来の分割先: skill.js
// ================================================================
const SKILL = {

  // スキルマスター定義
  // type: attack / heal / buff / debuff / special
  // power: ダメージ倍率（attackのみ）
  // attr: 属性（attackのみ）
  MASTER: {
    // 攻撃スキル
    "たたく":      { type:"attack",  attr:"物", power:1.0, desc:"物理攻撃" },
    "噛みつき":    { type:"attack",  attr:"物", power:1.2, desc:"強めの噛みつき" },
    "根縛り":      { type:"debuff",  attr:"物", power:0,   desc:"敵の速度を下げる" },
    "火炎":        { type:"attack",  attr:"炎", power:1.1, desc:"小炎攻撃" },
    "アギ":        { type:"attack",  attr:"炎", power:1.3, desc:"炎属性攻撃" },
    "アギラオ":    { type:"attack",  attr:"炎", power:1.8, desc:"中炎攻撃" },
    "マハラギオン": { type:"attack", attr:"炎", power:2.2, desc:"全体炎攻撃" },
    "ブフ":        { type:"attack",  attr:"氷", power:1.3, desc:"氷属性攻撃" },
    "ブフーラ":    { type:"attack",  attr:"氷", power:1.8, desc:"中氷攻撃" },
    "ブフダイン":  { type:"attack",  attr:"氷", power:2.4, desc:"強氷攻撃" },
    "ジオ":        { type:"attack",  attr:"電", power:1.3, desc:"電属性攻撃" },
    "ジオンガ":    { type:"attack",  attr:"電", power:1.8, desc:"中電攻撃" },
    "サンダーゲイル":{ type:"attack",attr:"電", power:2.5, desc:"雷嵐攻撃" },
    "稲妻触手":    { type:"attack",  attr:"電", power:1.5, desc:"電気触手攻撃" },
    "呪い":        { type:"debuff",  attr:"呪", power:0,   desc:"呪いのダメージ" },
    "呪縛":        { type:"debuff",  attr:"呪", power:0,   desc:"行動を封じる" },
    "腐敗":        { type:"debuff",  attr:"呪", power:0,   desc:"防御力を下げる" },
    "メギド":      { type:"attack",  attr:"呪", power:2.0, desc:"万象撃破" },
    "メギドラ":    { type:"attack",  attr:"呪", power:3.0, desc:"超万象撃破" },
    "石化眼":      { type:"special", attr:"物", power:0,   desc:"一定確率で石化" },
    "水流":        { type:"attack",  attr:"物", power:1.3, desc:"水流攻撃" },
    "締め付け":    { type:"attack",  attr:"物", power:1.5, desc:"締め付けダメージ" },
    "咆哮":        { type:"debuff",  attr:"物", power:0,   desc:"敵の攻撃を下げる" },
    "天剣":        { type:"attack",  attr:"電", power:2.0, desc:"神聖な剣撃" },
    "疾風":        { type:"attack",  attr:"電", power:1.6, desc:"風の一撃" },
    "天雷":        { type:"attack",  attr:"電", power:2.2, desc:"天空の雷" },
    "封印眼":      { type:"special", attr:"氷", power:0,   desc:"スキルを封印する" },
    "支配":        { type:"special", attr:"炎", power:0,   desc:"敵を一時支配" },
    "魅了":        { type:"debuff",  attr:"呪", power:0,   desc:"敵を魅了し行動不能" },
    "魅惑の歌":    { type:"debuff",  attr:"呪", power:0,   desc:"全体魅了" },
    "暗黒":        { type:"attack",  attr:"呪", power:1.4, desc:"闇の一撃" },
    "呪詛":        { type:"debuff",  attr:"呪", power:0,   desc:"持続ダメージ" },
    "堕天":        { type:"special", attr:"呪", power:0,   desc:"敵の属性を変える" },
    "回復":        { type:"heal",    attr:"",   power:0,   desc:"HP回復" },
    "竜撃":        { type:"attack",  attr:"物", power:2.8, desc:"竜の爪撃" },
    "大地震":      { type:"attack",  attr:"物", power:2.5, desc:"大地を揺るがす" },
    "聖剣":        { type:"attack",  attr:"電", power:2.6, desc:"聖なる剣" },
    "混乱":        { type:"debuff",  attr:"呪", power:0,   desc:"敵を混乱させる" },
  },

  // スキルを発動してダメージ・効果量を返す
  // 戻り値: { dmg, msg, effect }
  activate(attacker, target, skillName) {
    const s = SKILL.MASTER[skillName];
    if (!s) return { dmg: 0, msg: `${skillName}（未定義）`, effect: null };

    if (s.type === 'heal') {
      const amount = Math.floor(attacker.maxHp * 0.3);
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + amount);
      return { dmg: 0, msg: `${attacker.name}の「${skillName}」！ HP+${amount}`, effect: 'heal' };
    }

    if (s.type === 'debuff') {
      // 簡易実装: 攻撃力を一時的に下げる（次の攻撃に反映）
      const penalty = Math.floor(target.atk * 0.2);
      target._debuff = (target._debuff ?? 0) + penalty;
      target.atk = Math.max(1, target.atk - penalty);
      return { dmg: 0, msg: `${attacker.name}の「${skillName}」！ ${target.name}弱体化（戦闘終了まで）`, effect: 'debuff' };
    }

    if (s.type === 'special') {
      if (skillName === '石化眼' || skillName === '封印眼') {
        const chance = Math.random() < 0.3;
        return {
          dmg: 0,
          msg: chance
            ? `${attacker.name}の「${skillName}」！ ${target.name}に効果！`
            : `${attacker.name}の「${skillName}」！ 効果がなかった`,
          effect: chance ? 'status' : null,
        };
      }
      // その他special: 通常攻撃扱い
    }

    // attack / special（攻撃系）
    const base = calcDamage(
      { ...attacker, attr: s.attr || attacker.attr },
      target
    );
    const dmg = Math.floor(base * (s.power ?? 1.0));
    target.hp -= dmg;
    const aff = AFFINITY[s.attr]?.[target.attr] ?? 1;
    let msg = `${attacker.name}の「${skillName}」！ ${dmg}ダメージ`;
    if (aff >= 2) msg += '（弱点！）';
    else if (aff <= 0.5) msg += '（耐性あり）';
    return { dmg, msg, effect: aff >= 2 ? 'weakness' : null };
  },

  // 合体時スキル継承: 素材2体のスキルリストからランダムに1個選ぶ
  // 将来: スキル石によって確定継承させる拡張ポイント
  inheritSkill(demonA, demonB) {
    const pool = [...demonA.skills, ...demonB.skills].filter(Boolean);
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  // スキル説明を取得する（UIでのツールチップ用）
  describe(skillName) {
    return SKILL.MASTER[skillName]?.desc ?? skillName;
  },
};


// ================================================================
// [BLOCK: ITEM] アイテム管理・使用効果
// 責務: アイテム定義・所持管理・使用効果の適用
// 将来の分割先: item.js
// ================================================================
const ITEM = {

  // アイテムマスター定義
  MASTER: {
    "回復薬":     { icon:"🧪", desc:"仲魔1体のHPを30%回復",      maxStack:5 },
    "万能薬":     { icon:"💊", desc:"仲魔1体のHPを全回復",        maxStack:3 },
    "スキル石":   { icon:"💎", desc:"合体時スキルを確定継承させる", maxStack:3 },
    "覚醒の書":   { icon:"📖", desc:"仲魔を即座にLvUP",           maxStack:2 },
    "マッカ袋":   { icon:"💰", desc:"マッカを50〜150₪獲得",       maxStack:9 },
    "守りの御札": { icon:"🛡", desc:"次の被ダメージを1回無効化",   maxStack:3 },
  },

  // STATE.items 初期化（STATEに items フィールドを追加して管理）
  init() {
    if (!STATE.items) STATE.items = {};
  },

  // 所持数取得
  count(itemName) {
    return STATE.items[itemName] ?? 0;
  },

  // アイテム追加（上限チェック付き）
  add(itemName, qty = 1) {
    const master = ITEM.MASTER[itemName];
    if (!master) return false;
    const current = ITEM.count(itemName);
    const added = Math.min(qty, master.maxStack - current);
    if (added <= 0) return false;
    STATE.items[itemName] = current + added;
    return true;
  },

  // アイテム使用（対象: 仲魔インスタンス or null）
  // 戻り値: { ok: true, msg } | { ok: false, msg }
  use(itemName, target = null) {
    if (ITEM.count(itemName) <= 0) return { ok: false, msg: `${itemName}がない` };
    let msg = '';
    switch (itemName) {
      case '回復薬': {
        const t = target ?? STATE.party.find(d => d.hp > 0);
        if (!t) return { ok: false, msg: '対象がいない' };
        const amount = Math.floor(t.maxHp * 0.3);
        t.hp = Math.min(t.maxHp, t.hp + amount);
        msg = `${t.name}のHPが ${amount} 回復した`;
        break;
      }
      case '万能薬': {
        const t = target ?? STATE.party.find(d => d.hp > 0);
        if (!t) return { ok: false, msg: '対象がいない' };
        t.hp = t.maxHp;
        msg = `${t.name}のHPが全回復した`;
        break;
      }
      case 'スキル石': {
        // 合体実行時に FUSION.execute() が参照するフラグを立てる
        STATE._skillStoneActive = true;
        msg = '次の合体でスキルが確定継承される';
        break;
      }
      case '覚醒の書': {
        const t = target ?? STATE.party.find(d => d.hp > 0);
        if (!t) return { ok: false, msg: '対象がいない' };
        applyLevelUp(t);
        msg = `${t.name}がLv${t.lv}にレベルアップした！`;
        AUDIO.seLevelUp();
        ANIM.levelUpBanner(t.name);
        break;
      }
      case 'マッカ袋': {
        const gain = rand(50, 150);
        STATE.macca += gain;
        msg = `₪ ${gain} 獲得した`;
        break;
      }
      case '守りの御札': {
        STATE._guardActive = true;
        msg = '次の攻撃を1回無効化する';
        break;
      }
      default:
        return { ok: false, msg: `未実装アイテム: ${itemName}` };
    }
    STATE.items[itemName]--;
    if (STATE.items[itemName] <= 0) delete STATE.items[itemName];
    return { ok: true, msg };
  },

  // 探索報酬としてランダムにアイテムをドロップ
  // floor が高いほどレアアイテム出現率UP
  // ISS-005: F10未満の序盤は難易度ムラ緩和のため+5%補正
  tryDrop(floor) {
    const earlyBonus = floor < 10 ? 0.05 : 0;
    const rate = 0.08 + Math.min(floor * 0.002, 0.12) + earlyBonus; // 8%〜20%（序盤は+5%）
    if (Math.random() > rate) return null;
    const pool = floor <= 10
      ? ['回復薬','マッカ袋']
      : floor <= 30
        ? ['回復薬','万能薬','マッカ袋','守りの御札']
        : ['回復薬','万能薬','スキル石','覚醒の書','マッカ袋','守りの御札'];
    const name = pool[Math.floor(Math.random() * pool.length)];
    const added = ITEM.add(name);
    return added ? name : null;
  },

  // 所持アイテム一覧を配列で返す（UI描画用）
  list() {
    return Object.entries(STATE.items).map(([name, qty]) => ({
      name, qty, ...ITEM.MASTER[name],
    }));
  },
};

// ================================================================
// [BLOCK: SAVE] セーブ・ロード処理
// 将来の分割先: save.js
// ================================================================
const LS_KEY_SAVE='daemonrift_save';
const LS_KEY_BEST='daemonrift_best';
// セーブデータの構造が変わった際はここを上げる（旧データを破棄して再起動）
// v3: legacyMacca フィールド追加（ISS-009）
const SAVE_SCHEMA_VERSION=3;

// SAVE_KEYS に列挙されたフィールドのみを localStorage に保存する
function saveGame(){
  const data={_sv:SAVE_SCHEMA_VERSION};
  SAVE_KEYS.forEach(k=>{data[k]=STATE[k]});
  localStorage.setItem(LS_KEY_SAVE,JSON.stringify(data));
}

// バリデーション:
//   1. JSONパース失敗 → null
//   2. スキーマバージョン不一致 → null（旧データを安全に捨てる）
//   3. SAVE_KEYS のいずれかが欠損 → null
function loadGame(){
  const raw=localStorage.getItem(LS_KEY_SAVE);
  if(!raw)return null;
  try{
    const data=JSON.parse(raw);
    if(data._sv!==SAVE_SCHEMA_VERSION){
      console.warn(`[SAVE] スキーマ不一致 (saved:${data._sv} / current:${SAVE_SCHEMA_VERSION}) — リセット`);
      showToast('アップデートによりセーブデータをリセットしました');
      localStorage.removeItem(LS_KEY_SAVE);return null;
    }
    const missing=SAVE_KEYS.filter(k=>!(k in data));
    if(missing.length){console.warn('[SAVE] 欠損キー:',missing);return null;}
    return data;
  }catch(e){console.error('[SAVE] パース失敗:',e);return null;}
}

// 最大到達深度を STATE と localStorage の両方に記録する
function updateBestFloor(){
  if(STATE.floor>STATE.bestFloor)STATE.bestFloor=STATE.floor;
  const prev=parseInt(localStorage.getItem(LS_KEY_BEST)??'0');
  if(STATE.bestFloor>prev)localStorage.setItem(LS_KEY_BEST,STATE.bestFloor);
}

// ================================================================
// [BLOCK: UI] UI描画・DOM操作
// 責務: STATE / ENGINE の結果をDOMに反映するのみ（ロジック非依存）
// Phase 3 でアニメーション・エフェクト処理を追加予定
// 将来の分割先: ui.js
// ================================================================
const UI = {

  // 探索画面を最新 STATE で全更新する
  renderExplore() {
    document.getElementById('floor-display').textContent = `B${STATE.floor}F`;
    document.getElementById('macca-display').textContent = STATE.macca;
    document.getElementById('progress-bar').style.width = `${(STATE.floorProgress / 5) * 100}%`;
    document.getElementById('progress-label-num').textContent = `${STATE.floorProgress} / 5`;
    document.getElementById('progress-label-text').textContent = STATE.floor % 10 === 0 ? '⚠ ボスフロア' : 'フロア進行';
    document.getElementById('btn-explore-toggle').textContent = STATE.exploring ? '⏸ 探索停止' : '▶ 探索開始';
    const area = [...AREAS].reverse().find(a => STATE.floor >= a.minFloor);
    document.getElementById('area-name').textContent = area?.name ?? '廃都表層';
    UI.renderPartyBar();
  },

  // パーティバーを描画する
  renderPartyBar() {
    const list = document.getElementById('party-list');
    list.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const d = STATE.party[i], card = document.createElement('div');
      if (!d) {
        card.className = 'party-card empty';
        card.innerHTML = '<div style="font-size:22px;opacity:.3">＋</div>';
      } else {
        const p = (d.hp / d.maxHp) * 100, bc = p > 50 ? '' : p > 25 ? 'low' : 'critical';
        card.className = `party-card ${d.hp <= 0 ? 'dead' : ''}`;
        card.innerHTML = `<div class="party-card-top"><div class="party-demon-emoji">${d.emoji}</div><div class="party-demon-info"><div class="party-demon-name">${d.name}</div><div class="party-demon-lv">Lv${d.lv}</div></div></div><div class="hp-bar-wrap"><div class="hp-bar ${bc}" style="width:${p}%"></div></div>`;
      }
      list.appendChild(card);
    }
  },

  // 戦闘画面の敵HPバーを更新する
  renderEnemyHP() {
    const e = STATE.currentEnemy, p = Math.max(0, (e.hp / e.maxHp) * 100);
    document.getElementById('enemy-hp-bar').style.width = `${p}%`;
    document.getElementById('enemy-hp-text').textContent = `HP: ${Math.max(0, e.hp)} / ${e.maxHp}`;
  },

  // 戦闘ログを更新する（フェードアニメーション付き）
  setBattleLog(msg) {
    const el = document.getElementById('battle-log');
    el.textContent = msg; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  },

  // 探索ログに1行追加する（最大50行）
  addLog(msg, type = '') {
    const log = document.getElementById('explore-log');
    const el = document.createElement('div');
    el.className = `log-entry ${type}`; el.textContent = msg;
    log.appendChild(el); log.scrollTop = log.scrollHeight;
    while (log.children.length > 50) log.removeChild(log.firstChild);
  },

  // 敵スプライトのヒットアニメーションを再生する
  playEnemyHitAnim() {
    const s = document.getElementById('enemy-sprite');
    s.classList.remove('enemy-hit'); void s.offsetWidth;
    s.classList.add('enemy-hit'); setTimeout(() => s.classList.remove('enemy-hit'), 300);
  },

  // 合体ラボ画面を描画する
  renderFusionScreen() {
    const { fusionA: sA, fusionB: sB } = STATE;
    const fillSlot = (side, d) => {
      const el = document.getElementById(`fusion-slot-${side}`);
      if (d) {
        el.classList.add('filled');
        document.getElementById(`fusion-slot-${side}-emoji`).textContent = d.emoji;
        document.getElementById(`fusion-slot-${side}-name`).textContent = d.name;
        document.getElementById(`fusion-slot-${side}-info`).textContent = `Lv${d.lv} ${d.race}`;
      } else {
        el.classList.remove('filled');
        document.getElementById(`fusion-slot-${side}-emoji`).textContent = '＋';
        document.getElementById(`fusion-slot-${side}-name`).textContent = `素材 ${side.toUpperCase()}`;
        document.getElementById(`fusion-slot-${side}-info`).textContent = 'タップで選択';
      }
    };
    fillSlot('a', sA); fillSlot('b', sB);
    const preview = document.getElementById('fusion-preview');
    if (sA && sB) {
      const r = getFusionResult(sA, sB);
      const execBtn = document.getElementById('btn-fusion-exec');
      if (r) {
        preview.classList.add('active');
        document.getElementById('fusion-result-emoji').textContent = r.emoji;
        document.getElementById('fusion-result-name').textContent = `${r.name} Lv${r.lv}`;
        document.getElementById('fusion-result-skill').textContent = `継承スキル: ${r.skill}`;
        // ISS-023: 合体可能なら実行ボタンを活性化
        execBtn.classList.remove('disabled'); execBtn.disabled = false;
      } else {
        preview.classList.remove('active');
        showToast('この組み合わせは合体できない');
        // ISS-023: 合体不可なら実行ボタンを非活性化
        execBtn.classList.add('disabled'); execBtn.disabled = true;
      }
    } else {
      preview.classList.remove('active');
      // ISS-023: スロット未選択時も実行ボタンを非活性化
      const execBtn = document.getElementById('btn-fusion-exec');
      execBtn.classList.add('disabled'); execBtn.disabled = true;
    }
    const list = document.getElementById('fusion-demon-list');
    list.innerHTML = '';
    [...STATE.party, ...STATE.storage].forEach(d => {
      const isA = STATE.fusionA?.uid === d.uid, isB = STATE.fusionB?.uid === d.uid;
      const el = document.createElement('div');
      el.className = `fusion-demon-item ${(isA || isB) ? 'selected' : ''}`;
      el.innerHTML = `<div class="emoji">${d.emoji}</div><div class="info"><div class="dname">${d.name} <span style="color:var(--muted);font-size:10px">Lv${d.lv}</span></div><div class="ddetail">${d.race} / <span class="tag attr-${d.attr}" style="font-size:10px;padding:1px 6px">${d.attr}</span>${d.inParty ? ' <span class="tag party-tag">PARTY</span>' : ''}</div><div class="dskill">${d.skills.join(' / ')}</div></div><div style="font-size:10px;color:var(--muted)">${isA ? '[A]' : isB ? '[B]' : ''}</div>`;
      el.onclick = () => G.selectFusionDemon(d.uid);
      list.appendChild(el);
    });
  },

  // 仲魔一覧画面を描画する
  renderPartyScreen() {
    const content = document.getElementById('party-screen-content');
    content.innerHTML = '';
    const all = [...STATE.party, ...STATE.storage];
    if (!all.length) { content.innerHTML = '<div style="color:var(--muted);text-align:center;padding:40px;font-size:13px">仲魔がいない</div>'; return; }
    const partyFull = STATE.party.length >= 3; // ISS-018: パーティ満員フラグ
    all.forEach(d => {
      const p = (d.hp / d.maxHp) * 100, bc = p > 50 ? '' : p > 25 ? 'low' : 'critical';
      const el = document.createElement('div');
      el.className = `demon-card-full ${d.inParty ? 'in-party' : ''}`;
      // ISS-018: 倉庫悪魔かつパーティ満員時はボタンをdisabled化
      const btnDisabled = !d.inParty && partyFull ? ' disabled' : '';
      el.innerHTML = `<div class="emoji">${d.emoji}</div><div class="info"><div class="dname">${d.name}</div><div class="dtags"><span class="tag race-tag">${d.race}</span><span class="tag attr-${d.attr}">${d.attr}</span>${d.inParty ? '<span class="tag party-tag">PARTY</span>' : ''}</div><div class="dstats">Lv${d.lv} ／ ATK:${d.atk} DEF:${d.def} SPD:${d.spd}</div><div class="dskills">スキル: ${d.skills.join(' / ')}</div><div class="dhp"><div class="hp-bar-wrap" style="height:5px"><div class="hp-bar ${bc}" style="width:${p}%"></div></div><div style="font-size:10px;color:var(--muted);margin-top:2px">${Math.max(0, d.hp)} / ${d.maxHp}</div></div></div><button class="btn action-btn ${d.inParty ? 'warn' : 'success'}${btnDisabled}" onclick="G.toggleParty('${d.uid}')">${d.inParty ? '外す' : 'パーティ'}</button>`;
      content.appendChild(el);
    });
    // ISS-012: 倉庫0体時に空表示を追加
    if (!STATE.storage.length) {
      const empty = document.createElement('div');
      empty.style.cssText = 'color:var(--muted);text-align:center;padding:16px;font-size:12px';
      empty.textContent = '— 倉庫は空 —';
      content.appendChild(empty);
    }
  },

  // アイテム一覧画面を描画する
  renderItemScreen() {
    const content = document.getElementById('party-item-content');
    content.innerHTML = '';
    const items = ITEM.list();
    if (!items.length) {
      content.innerHTML = '<div class="item-empty">アイテムがない</div>';
      return;
    }
    items.forEach(({ name, qty, icon, desc }) => {
      const el = document.createElement('div');
      el.className = 'item-card';
      // 回復系・覚醒の書・御札のみ「使う」ボタンを表示（スキル石はラボで使用）
      const usable = ['回復薬', '万能薬', '覚醒の書', 'マッカ袋', '守りの御札'].includes(name);
      el.innerHTML = `<div class="item-icon">${icon}</div><div class="item-info"><div class="item-name">${name}</div><div class="item-desc">${desc}</div><div class="item-qty">× ${qty}</div></div>${usable ? `<button class="btn success action-btn" onclick="UI._useItem('${name}')">使う</button>` : '<div style="font-size:10px;color:var(--muted);flex-shrink:0">合体時使用</div>'}`;
      content.appendChild(el);
    });
  },

  // アイテムを使用して画面を更新する（探索画面でない場合はログへ）
  _useItem(itemName) {
    const result = ITEM.use(itemName);
    if (!result.ok) { showToast(result.msg); return; }
    addLog(`🎒 ${result.msg}`, 'success');
    showToast(result.msg);
    saveGame();
    UI.renderItemScreen();
    UI.renderPartyBar();
  },

  // 仲魔/アイテムタブを切り替える
  switchPartyTab(tab) {
    const partyContent = document.getElementById('party-screen-content');
    const itemContent  = document.getElementById('party-item-content');
    const tabParty     = document.getElementById('tab-party');
    const tabItem      = document.getElementById('tab-item');
    if (tab === 'party') {
      partyContent.style.display = '';
      itemContent.style.display  = 'none';
      tabParty.classList.add('active');
      tabItem.classList.remove('active');
      UI.renderPartyScreen();
    } else {
      partyContent.style.display = 'none';
      itemContent.style.display  = '';
      tabParty.classList.remove('active');
      tabItem.classList.add('active');
      UI.renderItemScreen();
    }
  },
};

// 後方互換: グローバル呼び出しをUIオブジェクトへ委譲
function renderExplore()      { UI.renderExplore(); }
function renderPartyBar()     { UI.renderPartyBar(); }
function renderEnemyHP()      { UI.renderEnemyHP(); }
function setBattleLog(msg)    { UI.setBattleLog(msg); }
function addLog(msg, type='') { UI.addLog(msg, type); }
function playEnemyHitAnim()   { UI.playEnemyHitAnim(); }
function renderFusionScreen() { UI.renderFusionScreen(); }
function renderPartyScreen()  { UI.renderPartyScreen(); }


// ================================================================
// [BLOCK: AUDIO] BGM・SE 手続き型生成（Web Audio API）
// 責務: 外部ファイル不要・AudioContext 1インスタンスで全音を生成
// ミュート状態は localStorage に保存し起動時に復元する
// 将来の分割先: audio.js
// ================================================================
const AUDIO = (() => {
  let ctx = null;
  let bgmNode = null;       // 現在再生中のBGMノード群
  let bgmGain = null;       // BGMマスターゲイン
  let muted = localStorage.getItem('daemonrift_mute') === '1';

  // AudioContext を遅延初期化（ユーザー操作後に生成）
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  // 単発オシレーター再生ヘルパー
  function playTone(freq, type, gain, duration, startDelay = 0) {
    if (muted) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const g   = c.createGain();
    osc.connect(g); g.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + startDelay);
    g.gain.setValueAtTime(gain, c.currentTime + startDelay);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startDelay + duration);
    osc.start(c.currentTime + startDelay);
    osc.stop(c.currentTime + startDelay + duration);
  }

  // BGM停止ヘルパー
  function stopBgm() {
    if (bgmNode) {
      bgmNode.forEach(n => { try { n.stop(); } catch(_) {} });
      bgmNode = null;
    }
    if (bgmGain) { try { bgmGain.disconnect(); } catch(_) {} bgmGain = null; }
  }

  return {
    get isMuted() { return muted; },

    toggleMute() {
      muted = !muted;
      localStorage.setItem('daemonrift_mute', muted ? '1' : '0');
      if (muted) stopBgm();
      else AUDIO.playBgmExplore();
      return muted;
    },

    // --- BGM ---
    playBgmExplore() {
      stopBgm();
      if (muted) return;
      const c = getCtx();

      // 深度帯ごとにドローン音色・周波数・LFOを切り替える
      const floor = STATE.floor || 1;
      let drones, oscType, lfoRate, lfoDepth, gainVal;
      if (floor >= 61) {
        // 虚無の底: 超低音サイン波、極めてゆっくりなLFO
        drones   = [27.5, 41.2, 55];   // A0, E1, A1
        oscType  = 'sine';
        lfoRate  = 0.05;
        lfoDepth = 4;
        gainVal  = 0.075;
      } else if (floor >= 31) {
        // 冥界回廊: 低音スクエア波、重厚なドローン
        drones   = [36.7, 55, 73.4];   // D1, A1, D2
        oscType  = 'square';
        lfoRate  = 0.08;
        lfoDepth = 3;
        gainVal  = 0.07;
      } else if (floor >= 11) {
        // 地下街区: 中低音トライアングル波、やや不穏
        drones   = [41.2, 61.7, 82.4]; // E1, B1, E2
        oscType  = 'triangle';
        lfoRate  = 0.11;
        lfoDepth = 2.5;
        gainVal  = 0.065;
      } else {
        // 廃都表層: のこぎり波ドローン（初期サウンド）
        drones   = [55, 82.4, 110];    // A1, E2, A2
        oscType  = 'sawtooth';
        lfoRate  = 0.15;
        lfoDepth = 2;
        gainVal  = 0.06;
      }

      bgmGain = c.createGain();
      bgmGain.gain.value = gainVal;
      bgmGain.connect(c.destination);

      bgmNode = drones.map(freq => {
        const osc = c.createOscillator();
        const lfo = c.createOscillator();
        const lfoGain = c.createGain();
        lfo.frequency.value = lfoRate + Math.random() * 0.05;
        lfoGain.gain.value = lfoDepth;
        lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
        osc.type = oscType;
        osc.frequency.value = freq;
        osc.connect(bgmGain);
        lfo.start(); osc.start();
        return osc;
      });
    },

    playBgmBattle(isBoss = false) {
      stopBgm();
      if (muted) return;
      const c = getCtx();
      bgmGain = c.createGain();
      bgmGain.gain.value = isBoss ? 0.09 : 0.07;
      bgmGain.connect(c.destination);

      // 戦闘：緊張感のある高速ドローン
      const freqs = isBoss ? [110, 146.8, 164.8] : [130.8, 164.8, 196];
      bgmNode = freqs.map((freq, i) => {
        const osc = c.createOscillator();
        osc.type = i === 0 ? 'square' : 'sawtooth';
        osc.frequency.value = freq;
        const g = c.createGain(); g.gain.value = i === 0 ? 0.5 : 0.3;
        osc.connect(g); g.connect(bgmGain);
        osc.start(); return osc;
      });
    },

    stopBgm,

    // --- SE ---
    seAttack() {
      // 攻撃：短いパンチ音
      playTone(220, 'square', 0.3, 0.08);
      playTone(180, 'sawtooth', 0.2, 0.12, 0.05);
    },

    seHit() {
      // 被ダメージ：低音インパクト
      playTone(80, 'sawtooth', 0.35, 0.15);
      playTone(60, 'square', 0.2, 0.2, 0.05);
    },

    seWeakness() {
      // 弱点ヒット：高音＋フラッシュ感
      playTone(440, 'square', 0.25, 0.06);
      playTone(660, 'square', 0.2,  0.06, 0.06);
      playTone(880, 'square', 0.15, 0.08, 0.12);
    },

    seLevelUp() {
      // レベルアップ：上昇アルペジオ
      [262, 330, 392, 523].forEach((f, i) => playTone(f, 'square', 0.2, 0.12, i * 0.08));
    },

    seNegotiateSuccess() {
      // 交渉成功：明るい2音
      playTone(523, 'triangle', 0.25, 0.15);
      playTone(659, 'triangle', 0.2,  0.2, 0.15);
    },

    seFusion() {
      // 合体：神秘的な上昇音
      [196, 247, 294, 370, 494].forEach((f, i) => playTone(f, 'sine', 0.18, 0.2, i * 0.1));
    },

    seDefeat() {
      // 全滅：下降音
      [220, 196, 165, 131, 110].forEach((f, i) => playTone(f, 'sawtooth', 0.25, 0.2, i * 0.12));
    },

    seFloorUp() {
      // 階層上昇：短いファンファーレ
      [392, 494, 587].forEach((f, i) => playTone(f, 'square', 0.18, 0.15, i * 0.1));
    },

    seFlee() {
      // 逃走：下降グリッサンド
      playTone(330, 'sawtooth', 0.2, 0.08);
      playTone(262, 'sawtooth', 0.15, 0.1, 0.08);
    },
  };
})();

// ================================================================
// [BLOCK: ANIM] アニメーション・エフェクト
// 責務: CSS class の付け外し・DOM エフェクト生成
// ゲームロジックを持たず、UIの視覚的な演出のみを担う
// Phase 3 で追加する全エフェクトをここに集約する
// 将来の分割先: anim.js
// ================================================================
const ANIM = {

  // 画面遷移：フェードイン
  screenIn(screenId) {
    const el = document.getElementById(screenId);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.2s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.style.opacity = '1'; });
    });
  },

  // 戦闘：攻撃フラッシュ（属性カラー対応）
  attackFlash(attr) {
    const colors = {
      '炎':'#e67e22','氷':'#00d4ff','電':'#f1c40f',
      '物':'#bdc3c7','呪':'#8e44ad',
    };
    const color = colors[attr] ?? '#fff';
    const flash = document.createElement('div');
    flash.style.cssText = `
      position:fixed;inset:0;background:${color};
      opacity:0.18;pointer-events:none;z-index:999;
      animation:none;transition:opacity 0.15s ease;
    `;
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 200);
    });
  },

  // 戦闘：弱点ヒット時の大フラッシュ
  weaknessFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position:fixed;inset:0;background:#fff;
      opacity:0.35;pointer-events:none;z-index:999;
      transition:opacity 0.1s ease;
    `;
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 150);
    });
  },

  // 戦闘：ダメージ数値をフロートさせる
  floatDamage(dmg, isWeakness = false) {
    const battle = document.getElementById('enemy-sprite');
    if (!battle) return;
    const el = document.createElement('div');
    el.textContent = `-${dmg}`;
    el.style.cssText = `
      position:absolute;font-size:${isWeakness ? '24px' : '18px'};
      font-weight:bold;color:${isWeakness ? '#f1c40f' : '#fff'};
      text-shadow:0 0 6px rgba(0,0,0,.8);
      pointer-events:none;z-index:100;
      left:50%;top:20%;transform:translateX(-50%);
      animation:floatUp 0.8s ease forwards;
    `;
    const wrap = battle.closest('.enemy-area') ?? document.getElementById('screen-battle');
    wrap.style.position = 'relative';
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 900);
  },

  // レベルアップ：バナー表示
  levelUpBanner(name) {
    const el = document.createElement('div');
    el.textContent = `✨ ${name} LEVEL UP!`;
    el.style.cssText = `
      position:fixed;top:30%;left:50%;transform:translateX(-50%);
      background:rgba(241,196,15,.95);color:#000;
      font-size:16px;font-weight:bold;padding:10px 24px;
      border-radius:4px;z-index:1000;pointer-events:none;
      animation:bannerPop 1.4s ease forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  // 合体演出：オーバーレイ
  fusionEffect(resultName, resultEmoji) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.85);
      display:flex;flex-direction:column;align-items:center;
      justify-content:center;z-index:1000;
      animation:fadeIn 0.3s ease forwards;
    `;
    overlay.innerHTML = `
      <div style="font-size:64px;animation:fusionSpin 0.6s ease">${resultEmoji}</div>
      <div style="font-size:20px;color:var(--gold);margin-top:16px;font-weight:bold">
        ${resultName}
      </div>
      <div style="font-size:13px;color:var(--muted);margin-top:8px">誕生！</div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.3s';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 350);
    }, 1200);
  },

  // ゲームオーバー：画面シェイク
  screenShake() {
    const app = document.getElementById('app');
    app.style.animation = 'none';
    void app.offsetWidth;
    app.style.animation = 'shake 0.5s ease';
    setTimeout(() => { app.style.animation = ''; }, 600);
  },
};

// ================================================================
// [BLOCK: CONTROLLER] ゲームコントローラ
// ユーザー入力の受け口・画面遷移・ENGINE と UI の橋渡し
// 外部から直接呼び出し想定外のメソッドは _ プレフィックスで区別する
// 将来の分割先: controller.js
// ================================================================

// ================================================================
// [BLOCK: BATTLE] 戦闘ロジック
// 責務: 戦闘ループ・ダメージ処理・交渉・ゲームオーバー判定
// UIへのアクセスは最小限（setBattleLog / renderXxx 呼び出しのみ）
// 将来の分割先: battle.js
// ================================================================
const BATTLE = {

  // 戦闘画面を開く（探索ループから呼ばれる）
  open(enemy) {
    STATE.inBattle = true;
    STATE.currentEnemy = enemy;
    document.getElementById('battle-floor-text').textContent = `B${STATE.floor}F`;
    document.getElementById('battle-title-text').textContent = enemy.isBoss ? '⚠ BOSS BATTLE' : 'ENCOUNTER';
    const sp = document.getElementById('enemy-sprite');
    sp.textContent = enemy.emoji;
    sp.className = `enemy-sprite${enemy.isBoss ? ' boss' : ''}`;
    document.getElementById('enemy-name').textContent = enemy.name;
    document.getElementById('enemy-race-tag').textContent = enemy.race;
    const at = document.getElementById('enemy-attr-tag');
    at.textContent = enemy.attr;
    at.className = `tag attr-${enemy.attr}`;
    renderEnemyHP();
    setBattleLog(`${enemy.name} が立ちはだかる！`);
    document.getElementById('negotiate-panel').classList.remove('active');
    document.getElementById('item-panel').classList.remove('active'); // アイテムパネルも初期化
    document.getElementById('battle-actions').style.display = '';
    // ISS-013: リード仲魔のスキル有無でスキルボタンの活性状態を制御
    const lead = STATE.party.find(d => d.hp > 0);
    const skillBtn = document.getElementById('btn-skill');
    if (lead?.skills?.length) {
      skillBtn.classList.remove('disabled');
      skillBtn.disabled = false;
    } else {
      skillBtn.classList.add('disabled');
      skillBtn.disabled = true;
    }
    AUDIO.playBgmBattle(enemy.isBoss);
    G.showScreen('screen-battle');
  },

  attack() {
    const e = STATE.currentEnemy, lead = STATE.party.find(d => d.hp > 0);
    if (!lead || !e) return;
    const dmg = calcDamage(lead, e);
    e.hp -= dmg;
    const aff = AFFINITY[lead.attr]?.[e.attr] ?? 1;
    let msg = `${lead.name}の攻撃！ ${dmg}ダメージ`;
    if (aff >= 2) msg += '（弱点！）'; else if (aff <= 0.5) msg += '（耐性あり）';
    setBattleLog(msg);
    AUDIO.seAttack();
    if (aff >= 2) { AUDIO.seWeakness(); ANIM.weaknessFlash(); } else { ANIM.attackFlash(lead.attr); }
    ANIM.floatDamage(dmg, aff >= 2);
    playEnemyHitAnim();
    renderEnemyHP();
    if (e.hp <= 0) { BATTLE._enemyDefeated(); return; }
    setTimeout(() => BATTLE._enemyAttack(), 600);
  },

  skill() {
    const e = STATE.currentEnemy, lead = STATE.party.find(d => d.hp > 0);
    if (!lead || !e || !lead.skills.length) return;
    const result = SKILL.activate(lead, e, lead.skills[0]);
    UI.setBattleLog(result.msg);
    AUDIO.seAttack();
    if (result.effect === 'weakness') { AUDIO.seWeakness(); ANIM.weaknessFlash(); }
    else { ANIM.attackFlash(lead.attr); }
    if (result.dmg > 0) ANIM.floatDamage(result.dmg, result.effect === 'weakness');
    if (result.effect === 'heal') { renderPartyBar(); }
    else { playEnemyHitAnim(); renderEnemyHP(); }
    if (e.hp <= 0) { BATTLE._enemyDefeated(); return; }
    setTimeout(() => BATTLE._enemyAttack(), 600);
  },

  flee() {
    if (chance(0.6)) {
      STATE.inBattle = false;
      AUDIO.seFlee();
      setBattleLog('うまく逃げ切った！');
      setTimeout(() => {
        addLog('戦闘から逃げた', 'warn');
        saveGame(); // ISS-019: 逃走後のfloorProgress・kills等をセーブ
        G.showScreen('screen-explore'); renderExplore(); AUDIO.playBgmExplore();
      }, 800);
    } else {
      setBattleLog('逃げられなかった！');
      setTimeout(() => BATTLE._enemyAttack(), 600);
    }
  },

  startNegotiate() {
    if (STATE.currentEnemy?.isBoss) { showToast('ボスと交渉できない！'); return; }
    document.getElementById('negotiate-panel').classList.add('active');
    document.getElementById('battle-actions').style.display = 'none';
  },

  cancelNegotiate() {
    document.getElementById('negotiate-panel').classList.remove('active');
    document.getElementById('battle-actions').style.display = '';
  },

  negotiate(tactic) {
    const e = STATE.currentEnemy, lead = STATE.party.find(d => d.hp > 0);
    if (!lead || !e) return;
    if (tactic === '金で解決') {
      const cost = rand(10, 20 + e.lv * 3);
      if (STATE.macca < cost) {
        // ISS-010: 不足時はパネルを閉じて戦闘アクションに戻す
        document.getElementById('negotiate-panel').classList.remove('active');
        document.getElementById('battle-actions').style.display = '';
        showToast(`₪が足りない（必要: ${cost}）`);
        return;
      }
      STATE.macca -= cost;
    }
    document.getElementById('negotiate-panel').classList.remove('active');
    document.getElementById('battle-actions').style.display = '';
    if (chance(calcNegotiateRate(lead.lv, e.lv, tactic))) {
      const nd = createDemon(e.masterId, e.lv);
      if (STATE.party.length < 3) {
        nd.inParty = true; STATE.party.push(nd);
        setBattleLog(`${e.name}は仲間になった！（パーティ加入）`);
      } else {
        STATE.storage.push(nd);
        setBattleLog(`${e.name}は仲間になった！（倉庫へ）`);
      }
      AUDIO.seNegotiateSuccess();
      addLog(`${e.name}が仲魔になった！`, 'success');
      STATE.inBattle = false;
      STATE.floorProgress = Math.max(0, STATE.floorProgress - 1);
      saveGame();
      setTimeout(() => { G.showScreen('screen-explore'); renderExplore(); AUDIO.playBgmExplore(); }, 1200);
    } else {
      setBattleLog(`${e.name}は激怒した！`);
      saveGame(); // ISS-014: 交渉失敗時もマッカ減算をセーブ（金で解決失敗時の消失防止）
      setTimeout(() => BATTLE._enemyAttack(), 600);
    }
  },

  _enemyAttack() {
    const e = STATE.currentEnemy, t = STATE.party.find(d => d.hp > 0);
    if (!t) { BATTLE._checkGameOver(); return; }
    const dmg = calcDamage(e, t);
    if (STATE._guardActive) {
      STATE._guardActive = false;
      setBattleLog(`${e.name}の攻撃を御札が防いだ！`);
      saveGame(); // ISS-020: 御札消費（_guardActive=false）をセーブし次回ロード時の復活を防止
      renderPartyBar();
      return;
    }
    t.hp = Math.max(0, t.hp - dmg);
    AUDIO.seHit();
    setBattleLog(`${e.name}の反撃！ ${t.name}に${dmg}ダメージ`);
    renderPartyBar();
    if (t.hp <= 0) {
      setBattleLog(`${t.name} は倒れた…`);
      if (STATE.party.every(d => d.hp <= 0)) {
        // ISS-016: 全滅確定時にアクションボタンを即座に非表示にして連打を防止
        document.getElementById('battle-actions').style.display = 'none';
        setTimeout(() => BATTLE._checkGameOver(), 1000);
      }
    }
  },

  _enemyDefeated() {
    const e = STATE.currentEnemy;
    const mg = rand(10, 20 + STATE.floor * 2);
    const eg = rand(5, 10 + STATE.floor);
    STATE.macca += mg;
    STATE.kills++;
    STATE.party.filter(d => d.hp > 0).forEach(d => {
      d.exp += eg;
      if (d.exp >= d.expNext) { applyLevelUp(d); addLog(`${d.name} Lv${d.lv}にレベルアップ！`, 'success'); AUDIO.seLevelUp(); ANIM.levelUpBanner(d.name); }
    });
    setBattleLog(`${e.name}を倒した！ +${mg}₪`);
    playEnemyHitAnim();
    // ISS-008: 戦闘終了時に敵へのデバフ蓄積をリセット（次戦への永続防止）
    STATE.party.forEach(d => { if (d._debuff) { d.atk += d._debuff; d._debuff = 0; } });
    if (STATE.floorProgress >= 5 || e.isBoss) {
      STATE.floor++;
      STATE.floorProgress = 0;
      updateBestFloor();
      addLog(`🆙 B${STATE.floor}Fへ進んだ`, 'system'); // ISS-022: 昇階を絵文字で視覚強調
    }
    saveGame();
    STATE.inBattle = false;
    setTimeout(() => { G.showScreen('screen-explore'); renderExplore(); AUDIO.playBgmExplore(); }, 1200);
  },

  _checkGameOver() {
    if (!STATE.party.every(d => d.hp <= 0)) return;
    clearInterval(STATE.exploreTimer);
    STATE.inBattle = STATE.exploring = false;
    // ISS-009: legacyMacca を計算してから saveGame() を呼ぶこと（順序厳守）
    STATE.legacyMacca = calcLegacyBonus(STATE.bestFloor);
    STATE._pendingBonus = STATE.legacyMacca; // ゲームオーバー経由のみ引継を許可するフラグ
    saveGame();
    AUDIO.seDefeat();
    AUDIO.stopBgm();
    ANIM.screenShake();
    document.getElementById('go-floor').textContent   = `B${STATE.floor}F`;
    document.getElementById('go-best').textContent    = `B${STATE.bestFloor}F`;
    document.getElementById('go-kills').textContent   = STATE.kills;
    document.getElementById('go-fusions').textContent = STATE.fusions > 0 ? STATE.fusions : '－'; // ISS-017: 0回は「－」表示
    // ISS-009: 次回引継額をリザルトに表示
    document.getElementById('go-legacy').textContent  = `₪ ${STATE.legacyMacca}`;
    G.showScreen('screen-gameover');
  },

  // アイテムパネルを開く（使用可能アイテムを動的生成）
  startItemPanel() {
    // 問題4: 戦闘中以外（敵ターンのsetTimeout到達後など）は開かない
    if (!STATE.inBattle) return;
    // 戦闘中に使用可能なアイテム種別
    const BATTLE_USABLE = ['回復薬', '万能薬', '守りの御札'];
    const list = document.getElementById('item-panel-list');
    list.innerHTML = '';
    // 問題5: 使用可能アイテムが1件もない場合はパネルを開かずトーストのみ
    const hasAny = BATTLE_USABLE.some(name => ITEM.count(name) > 0);
    if (!hasAny) { showToast('使えるアイテムがない'); return; }
    BATTLE_USABLE.forEach(name => {
      const qty = ITEM.count(name);
      const btn = document.createElement('button');
      btn.className = `btn${qty <= 0 ? ' disabled' : ''}`;
      const master = ITEM.MASTER[name];
      btn.textContent = `${master.icon} ${name}（${qty}）`;
      // 問題3: メソッド名を applyBattleItem に統一
      if (qty > 0) btn.onclick = () => G.doBattleItem(name);
      list.appendChild(btn);
    });
    document.getElementById('item-panel').classList.add('active');
    document.getElementById('battle-actions').style.display = 'none';
  },

  // アイテムパネルを閉じる
  cancelItemPanel() {
    document.getElementById('item-panel').classList.remove('active');
    document.getElementById('battle-actions').style.display = '';
  },

  // 問題3: useItem → applyBattleItem にリネーム（UI._useItem との混在を解消）
  // 戦闘中アイテム使用（ITEM.use() 経由・使用後に敵ターンを発生させる）
  applyBattleItem(itemName) {
    const result = ITEM.use(itemName);
    if (!result.ok) { showToast(result.msg); return; }
    setBattleLog(`🎒 ${result.msg}`);
    saveGame();
    renderPartyBar();
    BATTLE.cancelItemPanel();
    // 問題1: アイテム使用をターン消費とし敵の反撃を発生させる
    // 問題2: 御札もここで敵ターンを呼ぶことでフラグ→即発動の流れになる
    setTimeout(() => BATTLE._enemyAttack(), 600);
  },
};


// ================================================================
// [BLOCK: FUSION] 合体・パーティ編成ロジック
// 責務: スロット選択・合体実行・スキル継承・パーティ入れ替え
// UIへのアクセスは最小限（renderXxx 呼び出しのみ）
// 将来の分割先: fusion.js
// ================================================================
const FUSION = {

  selectSlot(slot) {
    STATE.fusionSlot = slot;
    renderFusionScreen();
  },

  selectDemon(uid) {
    const d = [...STATE.party, ...STATE.storage].find(x => x.uid === uid);
    if (!d) return;
    if (STATE.fusionSlot === 'a') {
      if (STATE.fusionB?.uid === uid) { showToast('同じ悪魔は選べない'); return; }
      STATE.fusionA = d;
    } else {
      if (STATE.fusionA?.uid === uid) { showToast('同じ悪魔は選べない'); return; }
      STATE.fusionB = d;
    }
    STATE.fusionSlot = null;
    renderFusionScreen();
  },

  execute() {
    const { fusionA: a, fusionB: b } = STATE;
    if (!a || !b) return;
    const preview = getFusionResult(a, b);
    if (!preview) { showToast('この組み合わせは合体できない'); return; }
    // 素材を party / storage から除去
    STATE.party   = STATE.party.filter(d => d.uid !== a.uid && d.uid !== b.uid);
    STATE.storage = STATE.storage.filter(d => d.uid !== a.uid && d.uid !== b.uid);
    // 結果悪魔を生成しスキル継承
    const result = createDemon(preview.masterId, preview.lv);
    // スキル継承: スキル石使用中は確定継承、それ以外はランダム
    const inherited = STATE._skillStoneActive
      ? (a.skills[0] ?? b.skills[0] ?? null)  // 確定: 素材Aのスキル優先
      : SKILL.inheritSkill(a, b);
    if (STATE._skillStoneActive) { STATE._skillStoneActive = false; addLog('💎 スキル石で確定継承！', 'success'); }
    result.skills = inherited ? [inherited] : [];
    // パーティ空きがあれば加入、なければ倉庫へ
    if (STATE.party.length < 3) { result.inParty = true; STATE.party.push(result); }
    else { STATE.storage.push(result); }
    STATE.fusions++;
    STATE.fusionA = STATE.fusionB = null;
    addLog(`合体成功！ ${a.name} × ${b.name} → ${result.name} Lv${result.lv}`, 'success');
    AUDIO.seFusion();
    ANIM.fusionEffect(result.name, result.emoji);
    saveGame();
    renderFusionScreen();
    renderPartyBar();
  },

  toggleParty(uid) {
    const all = [...STATE.party, ...STATE.storage];
    const d = all.find(x => x.uid == uid);
    if (!d) return;
    if (d.inParty) {
      d.inParty = false;
      STATE.party = STATE.party.filter(x => x.uid != uid);
      STATE.storage.push(d);
      showToast(`${d.name} をパーティから外した`);
    } else {
      if (STATE.party.length >= 3) { showToast('パーティは最大3体'); return; }
      d.inParty = true;
      STATE.storage = STATE.storage.filter(x => x.uid != uid);
      STATE.party.push(d);
      showToast(`${d.name} をパーティに加えた`);
    }
    saveGame();
    renderPartyScreen();
    renderPartyBar();
  },
};

const G={
  showScreen(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id==='screen-fusion') UI.renderFusionScreen();
    if(id==='screen-party')  UI.switchPartyTab('party');
  },
  backToExplore(){G.showScreen('screen-explore');renderExplore();},

  startNewGame(){
    clearInterval(STATE.exploreTimer);
    // ISS-009: _checkGameOver()経由のみ引継を適用（タイトル経由・continueGame後は0）
    const bonus = STATE._pendingBonus;
    Object.assign(STATE,{floor:1,macca:100,kills:0,fusions:0,bestFloor:1,
      floorProgress:0,exploring:false,exploreTimer:null,
      party:[],storage:[],fusionA:null,fusionB:null,items:{},legacyMacca:0,_pendingBonus:0});
    // ISS-009: 引継マッカを初期マッカに加算
    STATE.macca += bonus;
    const s=createDemon(1,1);s.inParty=true;
    STATE.party=[s];STATE.storage=[createDemon(4,2)];
    updateBestFloor();G.showScreen('screen-explore');renderExplore();
    addLog('新たな探索者が廃都へ踏み込んだ…','system');
    addLog(`初期仲魔：${s.name} を連れている`,'success');
    // ISS-009: 引継ボーナスがある場合のみログに表示
    if (bonus > 0) addLog(`前回の記憶から ₪${bonus} を引き継いだ`, 'system');
  },

  continueGame(){
    const data=loadGame();
    if(!data){showToast('セーブデータが見つからない');return;}
    SAVE_KEYS.forEach(k=>{STATE[k]=data[k];});
    // ISS-007: ロードデータにitemsが存在しない場合の安全フォールバック
    if(!STATE.items) STATE.items={};
    STATE.exploring=false;
    G.showScreen('screen-explore');renderExplore();
    addLog('探索を再開した…','system');
  },

  toggleExplore(){
    // ISS-021: 仲魔不在と全滅を別メッセージで区別
    if(!STATE.party.length){showToast('仲魔がいない！');return;}
    if(STATE.party.every(d=>d.hp<=0)){showToast('仲魔が全滅している！');return;}
    STATE.exploring=!STATE.exploring;
    if(STATE.exploring){STATE.exploreTimer=setInterval(G._exploreStep,2000);addLog('探索を開始した…','system');AUDIO.playBgmExplore();}
    else{clearInterval(STATE.exploreTimer);addLog('探索を停止した','system');AUDIO.stopBgm();}
    renderExplore();
  },

  _exploreStep(){
    STATE.floorProgress++;
    const boss=STATE.floor%10===0;
    if(STATE.floorProgress>=5||boss){
      STATE.exploring=false;clearInterval(STATE.exploreTimer);
      const e=spawnEnemy(STATE.floor,boss);STATE.currentEnemy=e;
      addLog(boss?`⚠ ボス出現！ ${e.name}が立ちはだかった！`:`! ${e.name}が現れた！`,boss?'boss':'encounter');
      renderExplore();setTimeout(()=>G._openBattle(e),800);
    }else{
      const gain=rand(3,8+STATE.floor);STATE.macca+=gain;STATE.kills++;
      const auto=spawnEnemy(STATE.floor);
      const drop = ITEM.tryDrop(STATE.floor);
      if (drop) addLog(`📦 ${drop} を入手した！`, 'success');
      addLog(`${auto.name} を自動討伐（+${gain}₪）`);
      saveGame(); // ISS-011: 自動討伐結果をセーブ（kills/macca/drop消失防止）
      renderExplore();
    }
  },

  _openBattle(enemy){ BATTLE.open(enemy); },

  doAttack(){ BATTLE.attack(); },

  doSkill(){ BATTLE.skill(); },

  doFlee(){ BATTLE.flee(); },

  startNegotiate(){ BATTLE.startNegotiate(); },
  cancelNegotiate(){ BATTLE.cancelNegotiate(); },
  doNegotiate(tactic){ BATTLE.negotiate(tactic); },
  // アイテムパネル委譲
  startItemPanel(){ BATTLE.startItemPanel(); },
  cancelItemPanel(){ BATTLE.cancelItemPanel(); },
  doBattleItem(name){ BATTLE.applyBattleItem(name); },



  selectFusionSlot(slot){ FUSION.selectSlot(slot); },
  selectFusionDemon(uid){  FUSION.selectDemon(uid); },
  executeFusion(){         FUSION.execute(); },
  toggleParty(uid){        FUSION.toggleParty(uid); },
};

// ================================================================
// [BLOCK: INIT] 起動処理
// ================================================================
(function init(){
  document.getElementById('title-version').textContent=`v${APP_VERSION}`;
  if(loadGame())document.getElementById('btn-continue').style.display='';
})();
