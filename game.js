/* =========================================================
   อาณาจักรสระประสม : ผจญภัยพิชิตคำไทย
   จัดทำโดย ครูจองซ่า
   HTML + CSS + JavaScript ธรรมดา ไม่ใช้ไลบรารีภายนอก
   ========================================================= */
(function () {
  'use strict';

  /* ===================== ตัวช่วยทั่วไป ===================== */
  const $ = (id) => document.getElementById(id);
  const rand = (n) => Math.floor(Math.random() * n);
  function shuffle(a) {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      const t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  const pick = (a, n) => shuffle(a).slice(0, n);

  /* ===================== ข้อมูลสระและคำศัพท์ ===================== */
  const VOW = {
    ia: { name: 'เอีย', pattern: 'เ–ีย', color: '#2fbf71' },
    ue: { name: 'เอือ', pattern: 'เ–ือ', color: '#2bb3e6' },
    ua: { name: 'อัว', pattern: '–ัว , –ว–', color: '#ff8a3d' }
  };

  // w = คำ, m = ความหมายสั้น ๆ, e = อีโมจิประกอบ, pic = true เมื่อภาพสื่อความหมายคำนั้นได้ชัดเจน
  const WORDS = {
    ia: [
      { w: 'เสีย', m: 'ชำรุด ใช้ไม่ได้', e: '🔧' },
      { w: 'เปีย', m: 'ผมที่ถักเป็นเส้น', e: '👧' },
      { w: 'เลีย', m: 'ใช้ลิ้นแตะ เช่น แมวเลียนม', e: '👅' },
      { w: 'เรียน', m: 'ไปโรงเรียนเพื่อเรียนรู้', e: '📚' },
      { w: 'เขียน', m: 'ใช้ดินสอเขียนตัวหนังสือ', e: '✏️' },
      { w: 'เตียง', m: 'ที่นอนหลับ', e: '🛏️', pic: true },
      { w: 'เสียง', m: 'สิ่งที่ได้ยิน', e: '🔊' },
      { w: 'เที่ยว', m: 'ไปเล่นสนุกนอกบ้าน', e: '🎡' },
      { w: 'เทียน', m: 'ใช้จุดไฟให้สว่าง', e: '🕯️', pic: true },
      { w: 'เขียว', m: 'สีของใบไม้', e: '🟢' },
      { w: 'เหนียว', m: 'ติดมือ เช่น ข้าวเหนียว', e: '🍚' },
      { w: 'เลี้ยง', m: 'ดูแลให้กินให้อยู่', e: '🍼' }
    ],
    ue: [
      { w: 'เรือ', m: 'ยานที่แล่นในน้ำ', e: '⛵', pic: true },
      { w: 'เสือ', m: 'สัตว์ป่าตัวใหญ่', e: '🐯', pic: true },
      { w: 'เกลือ', m: 'ของเค็มใช้ปรุงอาหาร', e: '🧂', pic: true },
      { w: 'เชื่อม', m: 'ต่อให้ติดกัน', e: '🔗' },
      { w: 'เมือง', m: 'ที่อยู่ของคนจำนวนมาก', e: '🏙️', pic: true },
      { w: 'เพื่อน', m: 'คนที่เล่นด้วยกัน', e: '🧑‍🤝‍🧑' },
      { w: 'เดือน', m: 'ช่วงเวลา 30 วัน', e: '🌙' },
      { w: 'เสื้อ', m: 'ของที่ใส่ท่อนบน', e: '👕', pic: true },
      { w: 'เชื่อ', m: 'ไว้ใจ ทำตามที่บอก', e: '👂' },
      { w: 'เนื้อ', m: 'ส่วนที่กินได้ของสัตว์', e: '🥩' },
      { w: 'เลือก', m: 'หยิบสิ่งที่ชอบ', e: '👆' },
      { w: 'เบื่อ', m: 'ไม่อยากทำ ไม่สนุก', e: '🥱' },
      { w: 'เหลือง', m: 'สีของดอกทานตะวัน', e: '🟡' }
    ],
    ua: [
      { w: 'วัว', m: 'สัตว์ให้นม', e: '🐄', pic: true },
      { w: 'ตัว', m: 'ร่างกายของสัตว์หรือคน', e: '🧍' },
      { w: 'หัว', m: 'ส่วนบนสุดของร่างกาย', e: '🙂' },
      { w: 'กลัว', m: 'ไม่กล้า ตกใจ', e: '😨' },
      { w: 'ครัว', m: 'ห้องทำอาหาร', e: '🍳' },
      { w: 'รวย', m: 'มีเงินทองมาก', e: '💰' },
      { w: 'สวย', m: 'งดงาม น่ามอง', e: '🌸' },
      { w: 'ช่วย', m: 'ทำให้คนอื่นสบายขึ้น', e: '🤝' },
      { w: 'ด้วย', m: 'พร้อมกัน เช่น ไปด้วยกัน', e: '➕' },
      { w: 'ขวด', m: 'ภาชนะใส่น้ำ', e: '🧴' },
      { w: 'นวด', m: 'กดคลึงให้หายเมื่อย', e: '💆' },
      { w: 'ปลวก', m: 'แมลงตัวเล็กกินไม้', e: '🪵' },
      { w: 'ถั่ว', m: 'เมล็ดพืชกินได้', e: '🥜', pic: true },
      { w: 'สวน', m: 'ที่ปลูกต้นไม้', e: '🌷' }
    ]
  };

  // ประโยคเติมคำ: s = ประโยค (___ คือช่องว่าง), a = คำตอบ, d = ตัวลวง (เลือกให้ความหมายไม่เข้ากับประโยค)
  const SENT = [
    { s: 'เราใช้ดินสอ ___ ตัวหนังสือ', a: 'เขียน', d: ['เรือ', 'วัว'] },
    { s: 'น้องไปโรงเรียนเพื่อ ___ หนังสือ', a: 'เรียน', d: ['เสือ', 'ขวด'] },
    { s: 'แม่ผูก ___ ให้น้องสาว', a: 'เปีย', d: ['เรือ', 'ขวด'] },
    { s: 'ลูกแมวใช้ลิ้น ___ นม', a: 'เลีย', d: ['เรือ', 'กลัว'] },
    { s: 'ฉันนอนหลับบน ___ นุ่ม ๆ', a: 'เตียง', d: ['เมือง', 'ครัว'] },
    { s: 'ฉันได้ยิน ___ เพลงดังมาก', a: 'เสียง', d: ['เกลือ', 'ถั่ว'] },
    { s: 'ฉันจุด ___ ให้ห้องสว่าง', a: 'เทียน', d: ['เสือ', 'สวน'] },
    { s: 'ใบไม้ในป่ามีสี ___', a: 'เขียว', d: ['เดือน', 'ช่วย'] },
    { s: 'วันหยุดฉันไป ___ สวนสัตว์', a: 'เที่ยว', d: ['เกลือ', 'ขวด'] },
    { s: 'ข้าว ___ กินกับมะม่วงอร่อยมาก', a: 'เหนียว', d: ['เสือ', 'กลัว'] },
    { s: 'พี่ช่วยแม่ ___ น้อง', a: 'เลี้ยง', d: ['เรือ', 'ขวด'] },
    { s: 'ของเล่นชิ้นนี้หล่นแตก ___ แล้ว', a: 'เสีย', d: ['วัว', 'เนื้อ'] },

    { s: 'เราล่อง ___ ในแม่น้ำ', a: 'เรือ', d: ['เสียง', 'ถั่ว'] },
    { s: '___ เป็นสัตว์ป่าตัวใหญ่ ร้องคำราม', a: 'เสือ', d: ['เตียง', 'ขวด'] },
    { s: 'แม่ใส่ ___ ลงในแกงให้เค็ม', a: 'เกลือ', d: ['เทียน', 'เตียง'] },
    { s: 'กรุงเทพฯ เป็น ___ หลวงของประเทศไทย', a: 'เมือง', d: ['เตียง', 'เทียน'] },
    { s: 'ฉันมี ___ รักที่เล่นด้วยกันทุกวัน', a: 'เพื่อน', d: ['เทียน', 'เขียว'] },
    { s: 'ปีหนึ่งมี 12 ___', a: 'เดือน', d: ['เทียน', 'เตียง'] },
    { s: 'ฉันใส่ ___ สีขาวไปโรงเรียน', a: 'เสื้อ', d: ['เตียง', 'ขวด'] },
    { s: 'เด็กดีต้อง ___ ฟังคุณครู', a: 'เชื่อ', d: ['เทียน', 'วัว'] },
    { s: 'แม่ทอด ___ หมูให้ฉันกิน', a: 'เนื้อ', d: ['เสียง', 'เตียง'] },
    { s: 'ฉัน ___ ของเล่นที่ชอบที่สุด', a: 'เลือก', d: ['เสียง', 'เตียง'] },
    { s: 'ฉันรู้สึก ___ เพราะไม่มีอะไรทำ', a: 'เบื่อ', d: ['เตียง', 'ถั่ว'] },
    { s: 'ดอกทานตะวันมีสี ___', a: 'เหลือง', d: ['เตียง', 'ขวด'] },

    { s: '___ ให้นมที่เราดื่ม', a: 'วัว', d: ['เสือ', 'เตียง'] },
    { s: 'ฉันไม่ ___ ความมืด', a: 'กลัว', d: ['เทียน', 'เรือ'] },
    { s: 'ลูกแมว ___ เล็กนิดเดียว', a: 'ตัว', d: ['เตียง', 'เมือง'] },
    { s: 'พ่อทำอาหารในห้อง ___', a: 'ครัว', d: ['เตียง', 'เรือ'] },
    { s: 'ดอกกุหลาบ ___ มาก', a: 'สวย', d: ['เสียง', 'เรียน'] },
    { s: 'เศรษฐีมีเงินมาก เขา ___ มาก', a: 'รวย', d: ['เสือ', 'เตียง'] },
    { s: 'ฉัน ___ แม่ล้างจาน', a: 'ช่วย', d: ['เขียน', 'เลีย'] },
    { s: 'น้ำดื่มอยู่ใน ___', a: 'ขวด', d: ['เสือ', 'เมือง'] },
    { s: 'ปู่ปลูกต้นไม้ใน ___', a: 'สวน', d: ['เตียง', 'เสื้อ'] },
    { s: 'แม่ต้ม ___ ให้ฉันกิน', a: 'ถั่ว', d: ['เรือ', 'เสียง'] },
    { s: 'ฉันสวมหมวกบน ___', a: 'หัว', d: ['เสียง', 'เกลือ'] },
    { s: '___ กัดกินไม้ทำให้บ้านพัง', a: 'ปลวก', d: ['เสือ', 'เพื่อน'] },
    { s: 'ช่างนวดมา ___ ให้คุณยาย', a: 'นวด', d: ['เรือ', 'เทียน'] },
    { s: 'ฉันไปโรงเรียน ___ รถ', a: 'ด้วย', d: ['เรียน', 'เสือ'] }
  ];

  // ดัชนีคำทั้งหมด
  const ALL = {};
  Object.keys(WORDS).forEach((v) => WORDS[v].forEach((o) => { ALL[o.w] = Object.assign({ v: v }, o); }));

  const STAGES = {
    1: { id: 1, vowel: 'ia', title: 'ป่าเสียงใส', sub: 'สระเอีย', theme: '1', guardian: '🐛', gname: 'หนอนจอมซน', icon: '🌳' },
    2: { id: 2, vowel: 'ue', title: 'ทะเลสาบเรือใบ', sub: 'สระเอือ', theme: '2', guardian: '🐙', gname: 'หมึกยักษ์จอมแสบ', icon: '🌊' },
    3: { id: 3, vowel: 'ua', title: 'ภูเขาวัวทอง', sub: 'สระอัว', theme: '3', guardian: '🦖', gname: 'ไดโนจอมเกเร', icon: '⛰️' },
    4: { id: 4, vowel: null, title: 'ปราสาทคำไทย', sub: 'แบบทดสอบรวม 3 สระ', theme: 'final', guardian: '🐉', gname: 'มังกรจอมปริศนา', icon: '🏰', final: true }
  };

  const DIALOG = {
    1: [
      { who: 'fairy', t: 'สวัสดี {name}! ยินดีต้อนรับสู่อาณาจักรสระประสม ฉันคือ “นางฟ้าอักษร” จ้ะ 🧚' },
      { who: 'hero', t: 'สวัสดีจ้ะ! หนูพร้อมออกผจญภัยแล้ว!' },
      { who: 'fairy', t: 'หนอนจอมซนขโมยเสียง “สระเอีย” ไปจากป่าเสียงใส เราต้องช่วยกันเอาคืนนะ' },
      { who: 'hero', t: 'สระเอียเขียนว่า เ–ีย ใช่ไหม? เช่น เสียง เขียน เรียน' },
      { who: 'fairy', t: 'ถูกต้อง! ลองดูและฟังคำศัพท์ก่อนออกเดินทางกันเถอะ' }
    ],
    2: [
      { who: 'fairy', t: 'เก่งมาก {name}! ป่าเสียงใสปลอดภัยแล้ว ต่อไปเราจะไปที่ทะเลสาบเรือใบ' },
      { who: 'hero', t: 'ที่นั่นมีอะไรหรือจ๊ะ?' },
      { who: 'fairy', t: 'หมึกยักษ์จอมแสบซ่อน “สระเอือ” ไว้ใต้ทะเลสาบ สระเอือเขียนว่า เ–ือ เช่น เรือ เสือ เกลือ' },
      { who: 'hero', t: 'เข้าใจแล้ว! หนูจะช่วยเอาคืนมาให้ได้เลย' }
    ],
    3: [
      { who: 'fairy', t: 'สุดยอด {name}! ทะเลสาบสงบสุขแล้ว ต่อไปคือภูเขาวัวทอง' },
      { who: 'hero', t: 'ไดโนจอมเกเรอยู่ที่นั่นใช่ไหม?' },
      { who: 'fairy', t: 'ใช่จ้ะ เขาซ่อน “สระอัว” ไว้ สระอัวเขียนว่า –ัว เช่น วัว กลัว แต่ถ้ามีตัวสะกดจะเขียน –ว– เช่น รวย สวย' },
      { who: 'hero', t: 'จำได้แล้ว! ไปกันเลย!' }
    ],
    4: [
      { who: 'fairy', t: 'ยอดเยี่ยม {name}! เหลืออีกด่านเดียวคือ “ปราสาทคำไทย” 🏰' },
      { who: 'hero', t: 'ด่านสุดท้ายยากไหมจ๊ะ?' },
      { who: 'fairy', t: 'มังกรจอมปริศนาจะถาม 20 ข้อ ผสมทั้ง เอีย เอือ และ อัว ไม่มีพลังชีวิตลด ตอบให้เต็มที่นะ' },
      { who: 'hero', t: 'หนูพร้อมแล้ว! สู้ ๆ!' }
    ]
  };

  const PROPS = {
    start: [['🏰', 4, 34, 1.5], ['🌈', 70, 40, 1.4], ['🎈', 12, 60, 1], ['🎈', 86, 62, 1]],
    map: [['🏰', 82, 42, 1.3], ['🌳', 6, 30, 1], ['🍄', 48, 26, .8]],
    '1': [['🌳', 5, 30, 1.3], ['🌲', 88, 28, 1.3], ['🍄', 22, 22, .8], ['🦋', 62, 55, .9]],
    '2': [['🌴', 6, 30, 1.2], ['🏝️', 84, 26, 1.3], ['🐠', 30, 24, .8], ['🐚', 60, 22, .8]],
    '3': [['⛰️', 5, 30, 1.6], ['🌋', 82, 30, 1.4], ['🪨', 40, 22, .8], ['🌵', 62, 24, .9]],
    final: [['🏰', 45, 36, 1.8], ['🌙', 8, 70, 1.3], ['⭐', 80, 62, 1], ['🔮', 22, 28, 1]]
  };

  /* ===================== สถานะเกม + บันทึก ===================== */
  const SAVE_KEY = 'saraPrasomCAI_v1';

  function defaultState() {
    return {
      name: '', coins: 0, score: 0, exp: 0, muted: false,
      stages: {
        1: { done: false, stars: 0, best: 0 },
        2: { done: false, stars: 0, best: 0 },
        3: { done: false, stars: 0, best: 0 }
      },
      final: { done: false, best: 0, stars: 0, played: 0 }
    };
  }

  function loadState() {
    const d = defaultState();
    try {
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) return d;
      const o = JSON.parse(raw);
      if (typeof o.name === 'string') d.name = o.name.slice(0, 20);
      ['coins', 'score', 'exp'].forEach((k) => { if (typeof o[k] === 'number' && o[k] >= 0) d[k] = o[k]; });
      if (typeof o.muted === 'boolean') d.muted = o.muted;
      [1, 2, 3].forEach((i) => {
        const s = o.stages && o.stages[i];
        if (s) d.stages[i] = { done: !!s.done, stars: +s.stars || 0, best: +s.best || 0 };
      });
      if (o.final) d.final = { done: !!o.final.done, best: +o.final.best || 0, stars: +o.final.stars || 0, played: +o.final.played || 0 };
    } catch (e) { /* ใช้ค่าเริ่มต้น */ }
    return d;
  }

  let S = loadState();
  function save() {
    try { window.localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* ไม่เป็นไรถ้าบันทึกไม่ได้ */ }
  }

  const levelOf = () => Math.floor(S.exp / 100) + 1;
  const doneCount = () => [1, 2, 3].filter((i) => S.stages[i].done).length + (S.final.done ? 1 : 0);

  function addReward(coins, score, exp) {
    const before = levelOf();
    S.coins += coins; S.score += score; S.exp += exp;
    save(); updateHUD();
    if (levelOf() > before) {
      setTimeout(() => { toast('🎉 เลเวลอัป! ตอนนี้ Lv.' + levelOf()); sfx('level'); }, 350);
    }
  }

  /* ===================== เสียง (Web Audio) ===================== */
  let ctx = null, master = null, musicGain = null, musicTimer = null, nextBar = 0, barIdx = 0;
  const PENT = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  const MEL = [[0, 2, 4, 2, 3, 1, 2, 0], [2, 4, 5, 4, 3, 2, 1, 0], [0, 1, 2, 4, 3, 2, 4, 3], [4, 3, 2, 1, 2, 3, 1, 0]];
  const BASS = [130.81, 98, 110, 87.31];

  function initAudio() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = S.muted ? 0 : 0.9;
      master.connect(ctx.destination);
      musicGain = ctx.createGain();
      musicGain.gain.value = 0.35;
      musicGain.connect(master);
      musicTimer = setInterval(musicTick, 1500);
      musicTick();
    } catch (e) { ctx = null; }
  }

  function tone(freq, t0, dur, type, vol, dest) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(dest || master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  function musicTick() {
    if (!ctx || S.muted || ctx.state !== 'running') { nextBar = 0; return; }
    const now = ctx.currentTime;
    if (nextBar < now + 0.05) nextBar = now + 0.1;
    // จัดตารางโน้ตล่วงหน้าไม่เกิน ~3 วินาที
    while (nextBar < now + 3) {
      const m = MEL[barIdx % MEL.length];
      for (let i = 0; i < 8; i++) tone(PENT[m[i]], nextBar + i * 0.4, 0.38, 'triangle', 0.16, musicGain);
      tone(BASS[barIdx % BASS.length], nextBar, 1.5, 'sine', 0.2, musicGain);
      tone(BASS[barIdx % BASS.length] * 1.5, nextBar + 1.6, 1.5, 'sine', 0.12, musicGain);
      nextBar += 3.2; barIdx++;
    }
  }

  function sfx(name) {
    if (!ctx || S.muted) return;
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime + 0.01;
    switch (name) {
      case 'click': tone(700, t, 0.07, 'square', 0.08); break;
      case 'correct': [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.09, 0.22, 'triangle', 0.3)); tone(1318.5, t + 0.4, 0.3, 'sine', 0.18); break;
      case 'wrong': tone(260, t, 0.18, 'sawtooth', 0.14); tone(190, t + 0.16, 0.3, 'sawtooth', 0.14); break;
      case 'coin': tone(987.8, t, 0.08, 'square', 0.1); tone(1318.5, t + 0.08, 0.22, 'square', 0.1); break;
      case 'level': [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568].forEach((f, i) => tone(f, t + i * 0.08, 0.25, 'triangle', 0.25)); break;
      case 'win': [523.25, 523.25, 659.25, 783.99, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.14, 0.3, 'triangle', 0.28)); break;
      case 'lose': [392, 349.23, 311.13, 261.63].forEach((f, i) => tone(f, t + i * 0.18, 0.3, 'sine', 0.25)); break;
      case 'lock': tone(180, t, 0.2, 'square', 0.1); break;
      default: break;
    }
  }

  function updateSoundBtn() {
    const b = $('btnSound');
    b.textContent = S.muted ? '🔇' : '🔊';
    b.classList.toggle('off', S.muted);
    b.setAttribute('aria-label', S.muted ? 'เปิดเสียง' : 'ปิดเสียง');
  }

  function toggleSound() {
    initAudio();
    S.muted = !S.muted;
    save();
    if (master) master.gain.value = S.muted ? 0 : 0.9;
    if (S.muted) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
    updateSoundBtn();
    if (!S.muted) { nextBar = 0; musicTick(); sfx('click'); }
    toast(S.muted ? '🔇 ปิดเสียงแล้ว' : '🔊 เปิดเสียงแล้ว');
  }

  function speak(text) {
    if (S.muted) { toast('🔇 เปิดเสียงก่อนนะ แล้วจะได้ฟังคำอ่าน'); return; }
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance === 'undefined') {
      toast('เครื่องนี้ยังไม่รองรับเสียงอ่านออกเสียง'); return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new window.SpeechSynthesisUtterance(text);
      u.lang = 'th-TH'; u.rate = 0.75; u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    } catch (e) { toast('ไม่สามารถอ่านออกเสียงได้'); }
  }

  /* ===================== ตัวละครหลัก (SVG) ===================== */
  function heroSVG() {
    return '<svg viewBox="0 0 100 130" class="hero-svg" aria-hidden="true" style="width:100%;height:auto;display:block;overflow:visible">' +
      '<ellipse cx="50" cy="124" rx="26" ry="5" fill="rgba(0,0,0,.18)"/>' +
      '<path d="M30 62 Q50 50 70 62 L78 108 Q50 118 22 108Z" fill="#e63946"/>' +
      '<rect x="34" y="62" width="32" height="42" rx="12" fill="#4361ee"/>' +
      '<rect x="34" y="88" width="32" height="6" fill="#ffd166"/>' +
      '<rect x="38" y="102" width="9" height="18" rx="4" fill="#7b4a2b"/>' +
      '<rect x="53" y="102" width="9" height="18" rx="4" fill="#7b4a2b"/>' +
      '<circle cx="50" cy="40" r="25" fill="#ffd8b5"/>' +
      '<path d="M25 38 Q28 12 50 12 Q72 12 75 38 Q60 26 50 28 Q40 26 25 38Z" fill="#5a3825"/>' +
      '<path d="M27 30 Q50 -2 73 30 Q50 18 27 30Z" fill="#2a9d8f"/>' +
      '<path d="M66 20 Q84 2 90 14 Q80 14 70 26Z" fill="#ffd166"/>' +
      '<circle cx="41" cy="42" r="4.2" fill="#222"/><circle cx="59" cy="42" r="4.2" fill="#222"/>' +
      '<circle cx="42.6" cy="40.4" r="1.5" fill="#fff"/><circle cx="60.6" cy="40.4" r="1.5" fill="#fff"/>' +
      '<ellipse cx="33" cy="50" rx="5" ry="3" fill="#ff9aa2" opacity=".75"/><ellipse cx="67" cy="50" rx="5" ry="3" fill="#ff9aa2" opacity=".75"/>' +
      '<path d="M43 52 Q50 60 57 52" stroke="#c0392b" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M70 76 L88 52" stroke="#8d5524" stroke-width="4" stroke-linecap="round"/>' +
      '<polygon points="88,38 91,46 99,46 93,51 95,59 88,54 81,59 83,51 77,46 85,46" fill="#ffd166" stroke="#f4a261"/>' +
      '<circle cx="70" cy="76" r="6" fill="#ffd8b5"/>' +
      '</svg>';
  }

  /* ===================== UI พื้นฐาน ===================== */
  const app = $('app');
  let toastTimer = null;

  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2300);
  }

  function openModal(title, bodyHTML, buttons) {
    $('modalTitle').textContent = title;
    $('modalBody').innerHTML = bodyHTML;
    const box = $('modalBtns');
    box.innerHTML = '';
    (buttons && buttons.length ? buttons : [{ label: 'ตกลง', cls: 'btn-gold' }]).forEach((b) => {
      const el = document.createElement('button');
      el.className = 'btn ' + (b.cls || 'btn-gold');
      el.textContent = b.label;
      el.addEventListener('click', () => { closeModal(); if (b.fn) b.fn(); });
      box.appendChild(el);
    });
    $('modal').classList.remove('hidden');
  }
  function closeModal() { $('modal').classList.add('hidden'); }

  function buildSparkles() {
    const wrap = $('sparkles');
    let h = '';
    for (let i = 0; i < 26; i++) {
      const s = 6 + rand(10);
      h += '<i class="sp" style="left:' + rand(100) + '%;top:' + rand(78) + '%;width:' + s + 'px;height:' + s + 'px;animation-delay:' + (rand(30) / 10) + 's;animation-duration:' + (2 + rand(30) / 10) + 's"></i>';
    }
    wrap.innerHTML = h;
  }

  function setTheme(t) {
    app.dataset.theme = t;
    const list = PROPS[t] || [];
    $('props').innerHTML = list.map((p, i) =>
      '<span class="prop" style="left:' + p[1] + '%;bottom:' + p[2] + '%;font-size:calc(clamp(28px,5vw,54px)*' + p[3] + ');animation-delay:-' + i + 's">' + p[0] + '</span>'
    ).join('');
  }

  let currentScreen = 'start';
  function showScreen(name, theme) {
    currentScreen = name;
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    $('screen-' + name).classList.add('active');
    $('hud').classList.toggle('hidden', name === 'start');
    setTheme(theme || (name === 'start' ? 'start' : 'map'));
    window.scrollTo(0, 0);
    updateHUD();
    renderHearts();
  }

  function updateHUD() {
    $('hudName').textContent = S.name || 'นักผจญภัย';
    $('hudLv').textContent = levelOf();
    $('hudScore').textContent = S.score;
    $('hudCoins').textContent = S.coins;
    const inLv = S.exp % 100;
    $('expBar').style.width = inLv + '%';
    $('expText').textContent = 'EXP ' + inLv + '/100';
  }

  function renderHearts() {
    const box = $('hudHearts');
    const show = currentScreen === 'battle' && cur && !cur.isFinal;
    box.classList.toggle('hidden', !show);
    if (show) box.textContent = '❤️'.repeat(Math.max(cur.hp, 0)) + '🖤'.repeat(5 - Math.max(cur.hp, 0));
  }

  function starsHTML(n, total) {
    let h = '';
    for (let i = 0; i < total; i++) h += '<span class="' + (i < n ? 'on' : 'off') + '">⭐</span>';
    return h;
  }

  function confetti() {
    const colors = ['#ffc83d', '#ff6fa5', '#2fbf71', '#4b8bff', '#8a5cf6', '#ff8a3d'];
    for (let i = 0; i < 46; i++) {
      const p = document.createElement('i');
      p.className = 'confetti-piece';
      p.style.left = rand(100) + 'vw';
      p.style.background = colors[rand(colors.length)];
      p.style.animationDuration = (2 + rand(25) / 10) + 's';
      p.style.animationDelay = (rand(8) / 10) + 's';
      p.style.borderRadius = rand(2) ? '50%' : '2px';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4800);
    }
  }

  /* ===================== หน้าแรก ===================== */
  function refreshStart() {
    $('playerName').value = S.name || '';
    const wb = $('welcomeBack');
    if (S.name && (doneCount() > 0 || S.coins > 0)) {
      wb.textContent = '💾 มีความคืบหน้าที่บันทึกไว้: ผ่านแล้ว ' + doneCount() + '/4 ด่าน • 🪙 ' + S.coins + ' เหรียญ';
      wb.classList.remove('hidden');
      $('btnStart').textContent = '⚔️ เล่นต่อ';
    } else {
      wb.classList.add('hidden');
      $('btnStart').textContent = '⚔️ เริ่มภารกิจ';
    }
  }

  function onStart() {
    const inp = $('playerName');
    const name = inp.value.trim().replace(/\s+/g, ' ');
    if (!name) {
      inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
      inp.focus();
      toast('✏️ พิมพ์ชื่อของหนูก่อนนะ');
      sfx('wrong');
      return;
    }
    S.name = name.slice(0, 20);
    save();
    openMap();
  }

  function showHow() {
    openModal('📖 วิธีเล่น',
      '<ul>' +
      '<li>เลือกด่านบนแผนที่ แล้วฟังนางฟ้าอักษรเล่าเรื่อง</li>' +
      '<li>ตอบคำถามเกี่ยวกับสระ <b>เอีย เอือ อัว</b> ให้ถูก</li>' +
      '<li>ตอบถูกได้ ⭐ คะแนน 🪙 เหรียญ และ EXP</li>' +
      '<li>ตอบผิดเสีย ❤️ 1 ดวง (มี 5 ดวง) แต่จะมีเฉลยให้เรียนรู้</li>' +
      '<li>ผ่านครบ 3 ด่าน จึงปลดล็อกด่านสุดท้าย “ปราสาทคำไทย” 20 ข้อ</li>' +
      '<li>กดปุ่ม 🔊 มุมขวาบนเพื่อเปิดหรือปิดเสียง</li>' +
      '<li>เกมบันทึกความก้าวหน้าให้อัตโนมัติ</li>' +
      '</ul>',
      [{ label: 'เข้าใจแล้ว 👍', cls: 'btn-gold' }]);
  }

  function onReset() {
    openModal('🗑️ เริ่มใหม่ทั้งหมด?', '<p>คะแนน เหรียญ และด่านที่ผ่านแล้วทั้งหมดจะถูกลบ ต้องการเริ่มใหม่ใช่ไหม?</p>', [
      { label: 'ใช่ ลบและเริ่มใหม่', cls: 'btn-red', fn: () => {
        const muted = S.muted;
        S = defaultState(); S.muted = muted; save();
        refreshStart(); updateHUD();
        toast('เริ่มต้นใหม่เรียบร้อยแล้ว ✨');
      } },
      { label: 'ไม่ลบ เก็บไว้ก่อน', cls: 'btn-ghost' }
    ]);
  }

  /* ===================== แผนที่ ===================== */
  const NODE_POS = { 1: [14, 74], 2: [38, 34], 3: [62, 70], 4: [86, 30] };

  function isDone(id) { return id < 4 ? S.stages[id].done : S.final.done; }
  function isUnlocked(id) {
    if (id === 1) return true;
    if (id < 4) return S.stages[id - 1].done;
    return S.stages[1].done && S.stages[2].done && S.stages[3].done;
  }
  function currentStageId() {
    for (let i = 1; i <= 4; i++) if (isUnlocked(i) && !isDone(i)) return i;
    return 4;
  }

  function openMap() {
    renderMap();
    showScreen('map', 'map');
  }

  function renderMap() {
    const wrap = $('mapNodes');
    wrap.innerHTML = '';
    const cur = currentStageId();
    [1, 2, 3, 4].forEach((id) => {
      const st = STAGES[id];
      const unlocked = isUnlocked(id);
      const done = isDone(id);
      const stars = id < 4 ? S.stages[id].stars : S.final.stars;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'node ' + (done ? 'done' : unlocked ? 'open' : 'locked');
      b.style.left = NODE_POS[id][0] + '%';
      b.style.top = NODE_POS[id][1] + '%';
      b.setAttribute('aria-label', (id < 4 ? 'ด่าน ' + id : 'ด่านสุดท้าย') + ' ' + st.sub + (unlocked ? '' : ' (ยังล็อกอยู่)'));
      b.innerHTML =
        (id === cur ? '<span class="node-hero">' + heroSVG() + '</span>' : '') +
        '<span class="node-ico">' + (unlocked ? st.icon : '🔒') + '</span>' +
        '<span class="node-label">' + (id < 4 ? 'ด่าน ' + id : 'ด่านสุดท้าย') + '<small>' + st.sub + '</small></span>' +
        '<span class="node-stars">' + (done ? starsHTML(stars, 3) : '') + '</span>';
      b.addEventListener('click', () => onNode(id));
      wrap.appendChild(b);
    });
    $('mapProgress').textContent = 'ผ่านแล้ว ' + doneCount() + '/4 ด่าน';
  }

  function onNode(id) {
    if (!isUnlocked(id)) {
      sfx('lock');
      toast(id === 4 ? '🔒 ต้องผ่านด่าน 1–3 ให้ครบก่อนนะ' : '🔒 ผ่านด่านก่อนหน้าก่อน แล้วด่านนี้จะเปิดนะ');
      return;
    }
    openLearn(id);
  }

  /* ===================== บทสนทนา / เรียนรู้ ===================== */
  let learn = null, typeTimer = null, pendingDone = null;

  function stopTyping() { clearInterval(typeTimer); typeTimer = null; pendingDone = null; }
  function finishTyping(text) {
    clearInterval(typeTimer); typeTimer = null;
    $('dlgText').textContent = text;
    const d = pendingDone; pendingDone = null;
    if (d) d();
  }
  function typeText(text, done) {
    stopTyping();
    let i = 0;
    pendingDone = done;
    $('dlgText').textContent = '';
    typeTimer = setInterval(() => {
      i++;
      $('dlgText').textContent = text.slice(0, i);
      if (i >= text.length) finishTyping(text);
    }, 22);
  }

  function openLearn(id) {
    const st = STAGES[id];
    learn = {
      id: id,
      idx: 0,
      lines: DIALOG[id].map((l) => ({ who: l.who, t: l.t.replace(/\{name\}/g, S.name || 'นักผจญภัย') }))
    };
    $('learnTitle').textContent = (st.final ? 'ด่านสุดท้าย' : 'ด่าน ' + id) + ' : ' + st.title;
    $('learnCard').classList.add('hidden');
    buildLearnCard(st);
    showScreen('learn', st.theme);
    showLine(0);
  }

  function showLine(i) {
    const last = learn.lines.length - 1;
    learn.idx = i;
    const line = learn.lines[i];
    $('dlgAvatar').textContent = line.who === 'fairy' ? '🧚' : '🧒';
    $('dlgName').textContent = line.who === 'fairy' ? 'นางฟ้าอักษร' : (S.name || 'นักผจญภัย');
    $('btnDlgNext').classList.toggle('hidden', i >= last);
    $('btnSkip').classList.toggle('hidden', i >= last);
    typeText(line.t, () => { if (i >= last) revealCard(); });
  }

  function revealCard() {
    const c = $('learnCard');
    c.classList.remove('hidden');
    try { c.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { /* ignore */ }
  }

  function buildLearnCard(st) {
    let words;
    if (st.final) {
      $('learnBadge').textContent = 'เอีย • เอือ • อัว';
      $('learnTip').textContent = 'ทบทวนตัวอย่างคำจากทั้ง 3 สระ แล้วไปพิชิตมังกรกันเลย!';
      words = ['ia', 'ue', 'ua'].flatMap((k) => WORDS[k].slice(0, 4).map((o) => ALL[o.w]));
    } else {
      const v = VOW[st.vowel];
      $('learnBadge').textContent = 'สระ' + v.name + '  ( ' + v.pattern + ' )';
      const tips = {
        ia: 'สระเอีย อ่านว่า “เอีย” เขียนด้วย เ–ีย เช่น เสีย เรียน เขียน เสียง',
        ue: 'สระเอือ อ่านว่า “เอือ” เขียนด้วย เ–ือ เช่น เรือ เสือ เกลือ เมือง',
        ua: 'สระอัว อ่านว่า “อัว” ถ้าไม่มีตัวสะกดใช้ –ัว เช่น วัว กลัว ถ้ามีตัวสะกดใช้ –ว– เช่น รวย สวย ช่วย ขวด'
      };
      $('learnTip').textContent = tips[st.vowel];
      words = WORDS[st.vowel].map((o) => ALL[o.w]);
    }
    $('learnTiles').innerHTML = words.map((o) =>
      '<button type="button" class="tile" data-w="' + o.w + '"><span>' + o.e + '</span><b>' + o.w + '</b><small>' + o.m + '</small></button>'
    ).join('');
  }

  /* ===================== สร้างคำถาม ===================== */
  function qIdentify(o) {
    const names = shuffle(['ia', 'ue', 'ua']).map((k) => VOW[k].name);
    const same = pick(WORDS[o.v].filter((x) => x.w !== o.w), 2).map((x) => x.w);
    return {
      type: 'id', vowel: o.v, word: o.w,
      text: 'คำนี้มีสระอะไร?', big: o.w, bigClass: '', speak: o.w,
      options: names, answer: VOW[o.v].name,
      why: '“' + o.w + '” (' + o.m + ') มีสระ' + VOW[o.v].name + ' เหมือนคำว่า “' + same[0] + '” และ “' + same[1] + '”'
    };
  }

  function qPick(o) {
    const pool = [];
    Object.keys(WORDS).filter((k) => k !== o.v).forEach((k) => WORDS[k].forEach((x) => pool.push({ w: x.w, v: k })));
    const ds = pick(pool, 3);
    return {
      type: 'pick', vowel: o.v, word: o.w,
      text: 'คำใดมีสระ' + VOW[o.v].name + '?', big: '', bigClass: '', speak: '',
      options: shuffle([o.w].concat(ds.map((d) => d.w))), answer: o.w,
      why: '“' + o.w + '” (' + o.m + ') มีสระ' + VOW[o.v].name + ' ส่วน ' +
        ds.map((d) => '“' + d.w + '” มีสระ' + VOW[d.v].name).join(' , ')
    };
  }

  function qPic(o) {
    const others = pick(Object.keys(ALL).filter((w) => w !== o.w), 2);
    return {
      type: 'pic', vowel: o.v, word: o.w,
      text: 'ภาพนี้คือคำว่าอะไร?', big: o.e, bigClass: 'emoji', speak: '',
      options: shuffle([o.w].concat(others)), answer: o.w,
      why: 'ภาพนี้คือ “' + o.w + '” (' + o.m + ') ใช้สระ' + VOW[o.v].name
    };
  }

  function qFill(s) {
    const o = ALL[s.a];
    return {
      type: 'fill', vowel: o.v, word: o.w,
      text: 'เลือกคำเติมในช่องว่างให้ถูกต้อง', big: s.s, bigClass: 'sentence', speak: '', fillWord: o.w,
      options: shuffle([s.a].concat(s.d)), answer: s.a,
      why: 'เติมคำว่า “' + o.w + '” (' + o.m + ') แล้วได้ใจความถูกต้อง และ “' + o.w + '” มีสระ' + VOW[o.v].name
    };
  }

  function buildQuestions(keys, count) {
    const ws = keys.flatMap((k) => WORDS[k].map((o) => ALL[o.w]));
    const buckets = {
      fill: shuffle(SENT.filter((s) => keys.indexOf(ALL[s.a].v) >= 0)).map(qFill),
      pick: shuffle(ws).map(qPick),
      id: shuffle(ws).map(qIdentify),
      pic: shuffle(ws.filter((o) => o.pic)).map(qPic)
    };
    const order = ['fill', 'pick', 'id', 'pic'];
    const used = {};
    const out = [];
    let limit = 1;
    let guard = 0;
    while (out.length < count && guard < 500) {
      guard++;
      let added = false;
      for (let k = 0; k < order.length && out.length < count; k++) {
        const b = buckets[order[k]];
        const idx = b.findIndex((q) => (used[q.word] || 0) < limit);
        if (idx >= 0) {
          const q = b.splice(idx, 1)[0];
          used[q.word] = (used[q.word] || 0) + 1;
          out.push(q);
          added = true;
        }
      }
      if (!added) limit++;
    }
    return shuffle(out);
  }

  /* ===================== ด่านต่อสู้ ===================== */
  let cur = null;
  const KEYS = ['ก', 'ข', 'ค', 'ง'];
  const QTYPE = { id: '🔎 จำแนกสระ', pick: '🎯 เลือกคำ', pic: '🖼️ ทายภาพ', fill: '✍️ เติมคำ' };
  const PRAISE = ['เก่งมาก! 🌟', 'ยอดเยี่ยม! 🎉', 'ถูกต้อง! ✨', 'สุดยอดไปเลย! 🏅', 'เยี่ยมมาก! 💎', 'เก่งจัง! 👏'];

  function startStage(id) {
    const st = STAGES[id];
    const final = !!st.final;
    const qs = final ? buildQuestions(['ia', 'ue', 'ua'], 20) : buildQuestions([st.vowel], 10);
    cur = {
      id: id, st: st, isFinal: final, qs: qs, i: 0, hp: 5, correct: 0, wrong: 0, streak: 0, locked: true,
      gain: { coins: 0, score: 0, exp: 0 },
      per: { ia: { t: 0, c: 0 }, ue: { t: 0, c: 0 }, ua: { t: 0, c: 0 } }
    };
    $('battleTitle').textContent = (final ? 'ด่านสุดท้าย' : 'ด่าน ' + id) + ' : ' + st.title;
    $('guardian').textContent = st.guardian;
    $('guardian').className = 'fighter guardian';
    $('gname').textContent = st.gname;
    showScreen('battle', st.theme);
    renderHearts();
    renderQuestion();
  }

  function renderQuestion() {
    const q = cur.qs[cur.i];
    cur.locked = false;
    $('progText').textContent = 'ข้อ ' + (cur.i + 1) + '/' + cur.qs.length;
    $('progBar').style.width = (cur.i / cur.qs.length * 100) + '%';
    $('qType').textContent = QTYPE[q.type];
    $('qText').textContent = q.text;
    const big = $('qBig');
    big.className = 'qbig ' + (q.bigClass || '');
    if (q.type === 'fill') {
      const parts = q.big.split('___');
      big.textContent = '';
      big.appendChild(document.createTextNode(parts[0]));
      const bl = document.createElement('span');
      bl.className = 'blank'; bl.id = 'blank'; bl.textContent = '\u00A0\u00A0\u00A0';
      big.appendChild(bl);
      big.appendChild(document.createTextNode(parts[1] || ''));
    } else {
      big.textContent = q.big;
    }
    $('btnSpeakQ').classList.toggle('hidden', !q.speak);
    const box = $('options');
    box.innerHTML = '';
    q.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.dataset.opt = opt;
      b.innerHTML = '<span class="opt-key">' + KEYS[i] + '</span><span class="t"></span>';
      b.querySelector('.t').textContent = opt;
      b.addEventListener('click', () => answer(b, opt));
      box.appendChild(b);
    });
    $('feedback').classList.add('hidden');
    $('guardian').className = 'fighter guardian';
    $('heroFighter').classList.remove('attack');
    renderHearts();
  }

  function fx(text, bad) {
    const el = document.createElement('div');
    el.className = 'float-text' + (bad ? ' bad' : '');
    el.textContent = text;
    $('arena').appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
  function coinBurst() {
    for (let i = 0; i < 6; i++) {
      const c = document.createElement('span');
      c.className = 'coin-fx';
      c.textContent = '🪙';
      c.style.right = (10 + rand(18)) + '%';
      c.style.bottom = (30 + rand(40)) + 'px';
      c.style.setProperty('--dx', (rand(120) - 60) + 'px');
      c.style.animationDelay = (i * 0.06) + 's';
      $('arena').appendChild(c);
      setTimeout(() => c.remove(), 1300);
    }
  }

  function answer(btn, opt) {
    if (!cur || cur.locked) return;
    cur.locked = true;
    const q = cur.qs[cur.i];
    const ok = opt === q.answer;
    document.querySelectorAll('#options .opt').forEach((b) => {
      b.disabled = true;
      if (b.dataset.opt === q.answer) b.classList.add('right');
      else if (b === btn) b.classList.add('wrong');
      else b.classList.add('dim');
    });
    cur.per[q.vowel].t++;
    const fb = $('feedback');
    fb.classList.remove('hidden', 'good', 'bad');
    const blank = $('blank');

    if (ok) {
      cur.correct++; cur.streak++;
      const bonus = Math.min(cur.streak - 1, 4) * 10;
      const coins = 10, score = 100 + bonus, exp = 20;
      cur.gain.coins += coins; cur.gain.score += score; cur.gain.exp += exp;
      cur.per[q.vowel].c++;
      addReward(coins, score, exp);
      if (blank) blank.textContent = q.answer;
      fx('+' + score + ' ⭐  +' + coins + ' 🪙');
      coinBurst();
      sfx('correct'); setTimeout(() => sfx('coin'), 350);
      $('heroFighter').classList.add('attack');
      setTimeout(() => { $('heroFighter').classList.remove('attack'); $('guardian').classList.add('hit'); }, 260);
      fb.classList.add('good');
      $('fbTitle').textContent = PRAISE[rand(PRAISE.length)] + (cur.streak >= 3 ? '  ต่อเนื่อง ' + cur.streak + ' ข้อ 🔥' : '');
    } else {
      cur.wrong++; cur.streak = 0;
      if (!cur.isFinal) cur.hp--;
      if (blank) blank.textContent = q.answer;
      fx(cur.isFinal ? 'ไม่เป็นไรนะ 💛' : '-1 ❤️', true);
      sfx('wrong');
      $('guardian').classList.add('bump');
      fb.classList.add('bad');
      $('fbTitle').textContent = 'ไม่เป็นไรนะ มาดูเฉลยกัน 💛';
      renderHearts();
    }
    $('fbText').textContent = 'คำตอบที่ถูกคือ “' + q.answer + '”  —  ' + q.why;
    const lastQ = cur.i >= cur.qs.length - 1;
    const dead = !cur.isFinal && cur.hp <= 0;
    $('btnNext').textContent = dead ? 'ต่อไป ▶' : lastQ ? 'ดูผลภารกิจ 🏆' : 'ต่อไป ▶';
    $('progBar').style.width = ((cur.i + 1) / cur.qs.length * 100) + '%';
    try { fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { /* ignore */ }
  }

  function nextQuestion() {
    if (!cur) return;
    if (!cur.locked) return; // ยังไม่ได้ตอบ
    if (!cur.isFinal && cur.hp <= 0) { defeat(); return; }
    cur.i++;
    if (cur.i >= cur.qs.length) { finishStage(); return; }
    renderQuestion();
  }

  function defeat() {
    sfx('lose');
    const id = cur.id;
    openModal('😵 พลังชีวิตหมดแล้ว', '<p>ไม่เป็นไรนะ ทบทวนคำศัพท์อีกนิดแล้วลองใหม่ได้เลย เก่งขึ้นทุกครั้งที่เล่น! 💪</p>', [
      { label: '🔁 ลองอีกครั้ง', cls: 'btn-gold', fn: () => startStage(id) },
      { label: '📖 ทบทวนก่อน', cls: 'btn-blue', fn: () => openLearn(id) },
      { label: '🗺️ กลับแผนที่', cls: 'btn-ghost', fn: () => openMap() }
    ]);
  }

  function quitStage() {
    openModal('ออกจากด่านนี้?', '<p>ถ้าออกตอนนี้ ความคืบหน้าในด่านนี้จะหายไป (คะแนนที่ได้แล้วยังอยู่)</p>', [
      { label: 'เล่นต่อ ⚔️', cls: 'btn-gold' },
      { label: 'ออกไปแผนที่', cls: 'btn-red', fn: () => { cur = null; openMap(); } }
    ]);
  }

  /* ===================== สรุปผลด่าน ===================== */
  function finishStage() {
    if (cur.isFinal) { finishFinal(); return; }
    const id = cur.id;
    const first = !S.stages[id].done;
    const stars = cur.wrong <= 1 ? 3 : cur.wrong <= 3 ? 2 : 1;
    const bonusCoins = first ? 50 : 10;
    const bonusScore = first ? 200 : 50;
    cur.gain.coins += bonusCoins; cur.gain.score += bonusScore;
    S.stages[id].done = true;
    S.stages[id].stars = Math.max(S.stages[id].stars, stars);
    S.stages[id].best = Math.max(S.stages[id].best, cur.correct);
    addReward(bonusCoins, bonusScore, 0);

    $('resTitle').textContent = 'ผ่านด่าน ' + id + ' แล้ว! 🎉';
    $('resStars').innerHTML = starsHTML(stars, 3);
    $('resList').innerHTML =
      '<li>✅ ตอบถูก <b>' + cur.correct + '/' + cur.qs.length + '</b> ข้อ</li>' +
      '<li>🪙 เหรียญที่ได้ <b>+' + cur.gain.coins + '</b> (รวมรางวัลหีบสมบัติ ' + bonusCoins + ')</li>' +
      '<li>⭐ คะแนนที่ได้ <b>+' + cur.gain.score + '</b></li>' +
      '<li>🎖️ EXP ที่ได้ <b>+' + cur.gain.exp + '</b></li>';
    const nextBtn = $('btnResNext');
    if (id < 3) nextBtn.textContent = 'ไปด่าน ' + (id + 1) + ' ▶';
    else nextBtn.textContent = 'ไปด่านสุดท้าย 🏰';
    nextBtn.dataset.next = String(id + 1);
    $('guardian').classList.add('win');
    showScreen('result', cur.st.theme);
    sfx('win'); confetti();
  }

  function finishFinal() {
    const sc = cur.correct, total = cur.qs.length;
    const stars = sc >= 17 ? 3 : sc >= 13 ? 2 : sc >= 10 ? 1 : 0;
    const bonusCoins = sc * 5;
    S.final.done = true;
    S.final.played++;
    S.final.best = Math.max(S.final.best, sc);
    S.final.stars = Math.max(S.final.stars, stars);
    addReward(bonusCoins, sc * 50, 0);

    $('finScore').textContent = sc;
    $('finStars').innerHTML = starsHTML(stars, 3);
    $('finMsg').textContent =
      sc >= 17 ? 'สุดยอดนักอ่านสระประสม! หนูเก่งมากจริง ๆ 🏆' :
      sc >= 13 ? 'เก่งมาก! อ่านและจำแนกสระประสมได้ดีเยี่ยม 🌟' :
      sc >= 10 ? 'ทำได้ดี! ฝึกอีกนิดจะเก่งขึ้นอีกเยอะเลย 💪' :
      'พยายามได้ดีมาก! กลับไปทบทวนแล้วลองใหม่อีกครั้งนะ 💛';
    $('finBreak').innerHTML = ['ia', 'ue', 'ua'].map((k) => {
      const p = cur.per[k];
      const pct = p.t ? Math.round(p.c / p.t * 100) : 0;
      return '<div class="bd-row"><span class="nm">' + VOW[k].name + '</span><div class="bar"><i style="width:' + pct + '%"></i></div><span class="sc">' + p.c + '/' + p.t + '</span></div>';
    }).join('');
    $('finTotalScore').textContent = S.score;
    $('finCoins').textContent = S.coins;
    $('finLv').textContent = levelOf();

    $('certName').textContent = S.name || 'นักผจญภัย';
    $('certScore').textContent = sc;
    $('certRank').textContent =
      sc >= 17 ? '🏆 ระดับ ยอดเยี่ยม' : sc >= 13 ? '🌟 ระดับ ดีมาก' : sc >= 10 ? '👍 ระดับ ดี' : '💛 ระดับ พยายามต่อไป';
    let dateText = '';
    try { dateText = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { dateText = ''; }
    $('certDate').textContent = 'วันที่ ' + dateText;

    cur.total = total;
    showScreen('final', 'final');
    sfx('win'); confetti();
  }

  /* ===================== ตรวจสอบข้อมูลตอนเริ่ม ===================== */
  function validateData() {
    const problems = [];
    const seen = {};
    Object.keys(WORDS).forEach((v) => WORDS[v].forEach((o) => {
      if (seen[o.w]) problems.push('คำซ้ำข้ามสระ: ' + o.w);
      seen[o.w] = true;
    }));
    SENT.forEach((s) => {
      if (!ALL[s.a]) problems.push('ไม่พบคำตอบในคลังคำ: ' + s.a);
      if (s.s.indexOf('___') < 0) problems.push('ประโยคไม่มีช่องว่าง: ' + s.s);
      s.d.forEach((d) => { if (!ALL[d]) problems.push('ไม่พบตัวลวงในคลังคำ: ' + d); if (d === s.a) problems.push('ตัวลวงซ้ำคำตอบ: ' + s.s); });
    });
    for (let r = 0; r < 20; r++) {
      [['ia'], ['ue'], ['ua'], ['ia', 'ue', 'ua']].forEach((keys) => {
        buildQuestions(keys, keys.length === 3 ? 20 : 10).forEach((q) => {
          if (q.options.indexOf(q.answer) < 0) problems.push('ไม่มีคำตอบในตัวเลือก: ' + q.word);
          if (new Set(q.options).size !== q.options.length) problems.push('ตัวเลือกซ้ำ: ' + q.word);
          if (q.options.length < 3 || q.options.length > 4) problems.push('จำนวนตัวเลือกไม่ถูกต้อง: ' + q.word);
        });
      });
    }
    if (problems.length && window.console) console.warn('[ตรวจสอบข้อมูล] พบปัญหา:', problems);
    return problems;
  }

  /* ===================== ผูกปุ่มทั้งหมด ===================== */
  function bind() {
    // เสียงคลิกปุ่มทั่วไป (ปุ่มตัวเลือกคำตอบมีเสียงของตัวเอง)
    document.addEventListener('click', (e) => {
      const b = e.target.closest ? e.target.closest('button') : null;
      if (b && !b.classList.contains('opt') && b.id !== 'btnSound') sfx('click');
    });
    const startAudio = () => initAudio();
    document.addEventListener('pointerdown', startAudio, { once: true });
    document.addEventListener('keydown', startAudio, { once: true });

    $('btnSound').addEventListener('click', toggleSound);

    // หน้าแรก
    $('btnStart').addEventListener('click', onStart);
    $('playerName').addEventListener('keydown', (e) => { if (e.key === 'Enter') onStart(); });
    $('btnHow').addEventListener('click', showHow);
    $('btnReset').addEventListener('click', onReset);

    // แผนที่
    $('btnMapHome').addEventListener('click', () => { refreshStart(); showScreen('start', 'start'); });

    // บทสนทนา
    $('btnLearnBack').addEventListener('click', () => { stopTyping(); openMap(); });
    $('btnDlgNext').addEventListener('click', () => {
      if (typeTimer) { finishTyping(learn.lines[learn.idx].t); return; }
      if (learn.idx < learn.lines.length - 1) showLine(learn.idx + 1);
    });
    $('btnSkip').addEventListener('click', () => { showLine(learn.lines.length - 1); });
    $('dlgText').addEventListener('click', () => { if (typeTimer) finishTyping(learn.lines[learn.idx].t); });
    $('learnTiles').addEventListener('click', (e) => {
      const t = e.target.closest ? e.target.closest('.tile') : null;
      if (!t) return;
      t.classList.add('pop'); setTimeout(() => t.classList.remove('pop'), 250);
      speak(t.dataset.w);
    });
    $('btnStartStage').addEventListener('click', () => { stopTyping(); startStage(learn.id); });

    // ต่อสู้
    $('btnQuit').addEventListener('click', quitStage);
    $('btnSpeakQ').addEventListener('click', () => { if (cur) speak(cur.qs[cur.i].speak); });
    $('btnNext').addEventListener('click', nextQuestion);

    // สรุปผลด่าน
    $('btnResNext').addEventListener('click', () => {
      const n = parseInt($('btnResNext').dataset.next, 10);
      if (n >= 1 && n <= 4) openLearn(n); else openMap();
    });
    $('btnResRetry').addEventListener('click', () => { if (cur) startStage(cur.id); else openMap(); });
    $('btnResMap').addEventListener('click', openMap);

    // จบเกม
    $('btnPrint').addEventListener('click', () => {
      try { window.print(); } catch (e) { toast('เปิดหน้าพิมพ์ไม่ได้ ลองกด Ctrl+P'); }
    });
    $('btnFinRetry').addEventListener('click', () => startStage(4));
    $('btnFinMap').addEventListener('click', openMap);
    $('btnFinHome').addEventListener('click', () => { refreshStart(); showScreen('start', 'start'); });
  }

  /* ===================== เริ่มเกม ===================== */
  function init() {
    document.querySelectorAll('[data-hero]').forEach((el) => { el.innerHTML = heroSVG(); });
    buildSparkles();
    updateSoundBtn();
    bind();
    refreshStart();
    showScreen('start', 'start');
    validateData();
  }

  // สำหรับตรวจสอบระบบ (ไม่กระทบการเล่น)
  window.CAI_DEBUG = {
    state: () => S,
    current: () => cur,
    questions: buildQuestions,
    validate: validateData
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
