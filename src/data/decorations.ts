import { DecorationOption } from '../types';

// Arabic Tashkeel marks
const TASHKEEL = ['َ', 'ُ', 'ِ', 'ّ', 'ً', 'ٌ', 'ٍ', 'ْ'];

// Unicode mappings for English text
const FONT_MAPS: Record<string, { upper: number; lower: number; digits?: number; custom?: Record<string, string> }> = {
  boldSerif: { upper: 0x1d400, lower: 0x1d41a, digits: 0x1d7ce },
  boldSans: { upper: 0x1d5d4, lower: 0x1d5ee, digits: 0x1d7ec },
  italicSerif: { upper: 0x1d434, lower: 0x1d44e },
  italicSans: { upper: 0x1d608, lower: 0x1d622 },
  boldItalic: { upper: 0x1d468, lower: 0x1d482 },
  script: { upper: 0x1d49c, lower: 0x1d4b6 },
  boldScript: { upper: 0x1d4d0, lower: 0x1d4ea },
  fraktur: { upper: 0x1d504, lower: 0x1d51e },
  boldFraktur: { upper: 0x1d56c, lower: 0x1d586 },
  doubleStruck: { upper: 0x1d538, lower: 0x1d552, digits: 0x1d7d8 },
  monospace: { upper: 0x1d670, lower: 0x1d68a, digits: 0x1d7f6 },
  circled: { upper: 0x24b6, lower: 0x24d0, digits: 0x2460 },
  squared: { upper: 0x1f130, lower: 0x1f130 },
  fullwidth: { upper: 0xff21, lower: 0xff41, digits: 0xff10 },
};

// Small Caps character dictionary
const SMALL_CAPS: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
};

// Inverted Upside Down map
const INVERTED_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
  J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ὁ', R: 'ᴚ',
  S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
  '?': '¿', '!': '¡', '.': '˙', ',': '\'',
};

// Map string using Unicode code points
function transformWithUnicodeOffset(text: string, offsets: { upper: number; lower: number; digits?: number }): string {
  return Array.from(text).map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(offsets.upper + (code - 65));
    }
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(offsets.lower + (code - 97));
    }
    if (offsets.digits && code >= 48 && code <= 57) {
      return String.fromCodePoint(offsets.digits + (code - 48));
    }
    return char;
  }).join('');
}

// Arabic Tatweel / Kashida embellisher
function embellishArabic(text: string, style: 'tashkeel' | 'tatweel' | 'spaced' | 'islamic' | 'dotted'): string {
  if (!text) return '';
  
  if (style === 'tashkeel') {
    return Array.from(text).map((c, i) => {
      if (/[\u0600-\u06FF]/.test(c) && !TASHKEEL.includes(c)) {
        const mark = TASHKEEL[(i * 3 + 1) % TASHKEEL.length];
        return c + mark;
      }
      return c;
    }).join('');
  }

  if (style === 'tatweel') {
    // Add tatweel between arabic letters
    return Array.from(text).map(c => {
      if (/[\u0621-\u064A]/.test(c)) {
        return c + 'ـ';
      }
      return c;
    }).join('');
  }

  if (style === 'spaced') {
    return Array.from(text).join(' ');
  }

  if (style === 'dotted') {
    return Array.from(text).map(c => c === ' ' ? '   ' : `${c}・`).join('');
  }

  if (style === 'islamic') {
    const decorated = Array.from(text).map((c, i) => {
      if (/[\u0600-\u06FF]/.test(c)) {
        return c + TASHKEEL[i % TASHKEEL.length];
      }
      return c;
    }).join('');
    return `۞ ${decorated} ۞`;
  }

  return text;
}

export const DECORATION_OPTIONS: DecorationOption[] = [
  // --- Arabic & Islamic Styles ---
  {
    id: 'ar-tashkeel',
    name: 'تشكيل الحركات الإسلامي',
    category: 'arabic',
    tags: ['عربي', 'حركات', 'تشكيل'],
    transform: (text) => embellishArabic(text, 'tashkeel'),
  },
  {
    id: 'ar-islamic-border',
    name: 'زخرفة قرآنية عثمانية (۞)',
    category: 'arabic',
    tags: ['إسلامي', 'مصحف', 'قرآن'],
    transform: (text) => embellishArabic(text, 'islamic'),
  },
  {
    id: 'ar-tatweel',
    name: 'كشيدة عربية أصيلة (تطويل)',
    category: 'arabic',
    tags: ['عربي', 'تطويل', 'كشيدة'],
    transform: (text) => embellishArabic(text, 'tatweel'),
  },
  {
    id: 'ar-spaced-dots',
    name: 'حروف متباعدة بنقاط جمالية',
    category: 'arabic',
    tags: ['عربي', 'نقاط', 'جمالي'],
    transform: (text) => embellishArabic(text, 'dotted'),
  },
  {
    id: 'ar-bracket-ornate',
    name: 'أقواس عثمانية مزخرفة ꧁ ꧂',
    category: 'arabic',
    tags: ['أقواس', 'عربي', 'أسماء'],
    transform: (text) => `꧁ ${text} ꧂`,
  },
  {
    id: 'ar-wings',
    name: 'زخرفة الأجنحة الملكية ༺ ༻',
    category: 'arabic',
    tags: ['أجنحة', 'ملكي', 'بايو'],
    transform: (text) => `༺ ${text} ༻`,
  },
  {
    id: 'ar-stars-frame',
    name: 'إطار النجوم البراقة ✦ ✧',
    category: 'arabic',
    tags: ['نجوم', 'إطارات'],
    transform: (text) => `✦•┈๑⋅⋯ ✧ ${text} ✧ ⋯⋅๑┈•✦`,
  },
  {
    id: 'ar-floral',
    name: 'زخرفة الزهور الناعمة ✿ ❀',
    category: 'arabic',
    tags: ['زهور', 'أنثوي', 'لطيف'],
    transform: (text) => `✿◕ ‿ ◕✿ 『 ${text} 』 ✿◕ ‿ ◕✿`,
  },

  // --- Gaming & Social Bio (PUBG, Free Fire, TikTok, Insta) ---
  {
    id: 'game-pubg-vip',
    name: 'نمط ببجي وفي آي بي 亗',
    category: 'gaming',
    tags: ['ببجي', 'ألعاب', 'أسماء'],
    transform: (text) => `亗『 ${text} 』亗`,
  },
  {
    id: 'game-samurai',
    name: 'ساموراي ومحاربين ☬',
    category: 'gaming',
    tags: ['ساموراي', 'ألعاب'],
    transform: (text) => `☬ ${text} ☬`,
  },
  {
    id: 'game-crown-queen',
    name: 'التاج الملكي الفاخر ♛',
    category: 'gaming',
    tags: ['تاج', 'ملكي', 'ببجي'],
    transform: (text) => `♛『 ${text} 』♛`,
  },
  {
    id: 'game-wings-blade',
    name: 'زخرفة الشفرات 彡 彡',
    category: 'gaming',
    tags: ['شفرات', 'ألعاب'],
    transform: (text) => `彡${text}彡`,
  },
  {
    id: 'game-kanji-style',
    name: 'كانجي ياباني メ',
    category: 'gaming',
    tags: ['ياباني', 'ألعاب'],
    transform: (text) => `メ『 ${text} 』メ`,
  },
  {
    id: 'game-cross-heart',
    name: 'قلب البايو العصري 𓆩 ♡ 𓆪',
    category: 'gaming',
    tags: ['تيك توك', 'إنستغرام', 'بايو'],
    transform: (text) => `𓆩 ${text} 𓆪`,
  },
  {
    id: 'game-thunder',
    name: 'صاعقة البرق ⚡',
    category: 'gaming',
    tags: ['برق', 'حماسي'],
    transform: (text) => `⚡ ${text} ⚡`,
  },
  {
    id: 'game-skull',
    name: 'أسطوري محارب ༒ ༒',
    category: 'gaming',
    tags: ['محارب', 'ألعاب'],
    transform: (text) => `༒ ${text} ༒`,
  },
  {
    id: 'game-double-brackets',
    name: 'أقواس الألعاب الصلبة 〖 〗',
    category: 'gaming',
    tags: ['أقواس', 'ألعاب'],
    transform: (text) => `〖 ${text} 〗`,
  },
  {
    id: 'game-arrows',
    name: 'سهم القناص ⫷ ⫸',
    category: 'gaming',
    tags: ['سهم', 'ألعاب'],
    transform: (text) => `⫷ ${text} ⫸`,
  },

  // --- English Typography & Modern Fonts ---
  {
    id: 'en-bold-serif',
    name: 'خط عريض كلاسيكي (Bold Serif)',
    category: 'english',
    tags: ['إنجليزي', 'عريض'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.boldSerif),
  },
  {
    id: 'en-bold-sans',
    name: 'خط عريض حديث (Bold Sans)',
    category: 'english',
    tags: ['إنجليزي', 'مودرن'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.boldSans),
  },
  {
    id: 'en-script-italic',
    name: 'خط يد أنيق (Script Cursive)',
    category: 'english',
    tags: ['إنجليزي', 'خط يد', 'مائل'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.script),
  },
  {
    id: 'en-bold-script',
    name: 'خط يد عريض فاخر (Bold Script)',
    category: 'english',
    tags: ['إنجليزي', 'خط يد'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.boldScript),
  },
  {
    id: 'en-fraktur',
    name: 'قوطي تاريخي (Gothic / Fraktur)',
    category: 'english',
    tags: ['إنجليزي', 'قوطي', 'هيبة'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.boldFraktur),
  },
  {
    id: 'en-double-struck',
    name: 'مزدوج الخط مجوف (Blackboard / Hollow)',
    category: 'english',
    tags: ['إنجليزي', 'مجوف'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.doubleStruck),
  },
  {
    id: 'en-small-caps',
    name: 'أحرف صغيرة كابيتال (sᴍᴀʟʟ ᴄᴀᴘs)',
    category: 'english',
    tags: ['إنجليزي', 'حروف صغيرة'],
    transform: (text) => Array.from(text).map(c => SMALL_CAPS[c.toLowerCase()] || c).join(''),
  },
  {
    id: 'en-circled',
    name: 'أحرف محاطة بدوائر Ⓑⓤⓑⓑⓛⓔ',
    category: 'english',
    tags: ['إنجليزي', 'دوائر'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.circled),
  },
  {
    id: 'en-fullwidth',
    name: 'متباعد عريض جمالي (Ｖａｐｏｒｗａｖｅ)',
    category: 'english',
    tags: ['إنجليزي', 'جمالي', 'متباعد'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.fullwidth),
  },
  {
    id: 'en-monospace',
    name: 'آلة كاتبة تقنية (Monospace)',
    category: 'english',
    tags: ['إنجليزي', 'برمجة'],
    transform: (text) => transformWithUnicodeOffset(text, FONT_MAPS.monospace),
  },
  {
    id: 'en-inverted',
    name: 'نص مقلوب رأساً على عقب (uʍop ǝpᴉsd∩)',
    category: 'english',
    tags: ['إنجليزي', 'مقلوب'],
    transform: (text) => Array.from(text).reverse().map(c => INVERTED_MAP[c] || c).join(''),
  },
  {
    id: 'en-underline',
    name: 'خط تحتي متصل (U̲n̲d̲e̲r̲l̲i̲n̲e̲)',
    category: 'english',
    tags: ['إنجليزي', 'خط تحتي'],
    transform: (text) => Array.from(text).map(c => c === ' ' ? ' ' : `${c}\u0332`).join(''),
  },
  {
    id: 'en-strikethrough',
    name: 'خط شطب وسط النص (S̶t̶r̶i̶k̶e̶)',
    category: 'english',
    tags: ['إنجليزي', 'مشطوب'],
    transform: (text) => Array.from(text).map(c => c === ' ' ? ' ' : `${c}\u0336`).join(''),
  },

  // --- Aesthetic Frames & Borders ---
  {
    id: 'frame-japanese',
    name: 'أقواس يابانية 『 』',
    category: 'frames',
    tags: ['إطارات', 'ياباني'],
    transform: (text) => `『 ${text} 』`,
  },
  {
    id: 'frame-black-brackets',
    name: 'أقواس سوداء سميكة 【 】',
    category: 'frames',
    tags: ['إطارات', 'أقواس'],
    transform: (text) => `【 ${text} 】`,
  },
  {
    id: 'frame-sparkles',
    name: 'بريق النجوم واللمعان ⋆⁺₊⋆',
    category: 'frames',
    tags: ['إطارات', 'نجوم'],
    transform: (text) => `⋆⁺₊⋆ ༚ ✧ ${text} ✧ ༚ ⋆⁺₊⋆`,
  },
  {
    id: 'frame-diamonds',
    name: 'سلسلة المربعات الماسية ◆ ◇',
    category: 'frames',
    tags: ['إطارات', 'ماس'],
    transform: (text) => `◆◇◆◇ ${text} ◇◆◇◆`,
  },
  {
    id: 'frame-hearts',
    name: 'أكاليل القلوب والرومانسية ♡ ♡',
    category: 'frames',
    tags: ['إطارات', 'قلوب'],
    transform: (text) => `♡⑅*˖•. ·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙ ${text} ·̩̩̥͙*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ .•˖*⑅♡`,
  },
  {
    id: 'frame-divider-line',
    name: 'خط فاصل أنيق وسهم ─── ⋆⋅☆⋅⋆ ───',
    category: 'frames',
    tags: ['إطارات', 'فواصل'],
    transform: (text) => `─── ⋆⋅☆⋅⋆ ─── ${text} ─── ⋆⋅☆⋅⋆ ───`,
  },
  {
    id: 'frame-cyberpunk',
    name: 'سايبر بانك ومستقبلي ░▒▓',
    category: 'frames',
    tags: ['إطارات', 'سايبر'],
    transform: (text) => `░▒▓█ ${text} █▓▒░`,
  },
  {
    id: 'frame-butterfly',
    name: 'فراشة ساحرة 𓆩 𓆪',
    category: 'frames',
    tags: ['إطارات', 'فراشة'],
    transform: (text) => `˗ˏˋ 𓆩 ${text} 𓆪 ˎˊ˗`,
  },
];

export const PRESET_BRACKETS = [
  { label: 'أقواس يابانية', prefix: '『 ', suffix: ' 』' },
  { label: 'أقواس سميكة', prefix: '【 ', suffix: ' 】' },
  { label: 'أجنحة ملكية', prefix: '༺ ', suffix: ' ༻' },
  { label: 'زخرفة عثمانية', prefix: '꧁ ', suffix: ' ꧂' },
  { label: 'ببجي VIP', prefix: '亗『 ', suffix: ' 』亗' },
  { label: 'تاج الملوك', prefix: '♛ ', suffix: ' ♛' },
  { label: 'محارب الساموراي', prefix: '☬ ', suffix: ' ☬' },
  { label: 'بايو الفراشة', prefix: '𓆩 ', suffix: ' 𓆪' },
  { label: 'شفرات ألعاب', prefix: '彡', suffix: '彡' },
  { label: 'نجوم سحرية', prefix: '✧ ', suffix: ' ✧' },
  { label: 'قلوب رومانسية', prefix: '♡ ', suffix: ' ♡' },
  { label: 'صاعقة برق', prefix: '⚡ ', suffix: ' ⚡' },
];

export const RANDOM_SAMPLES = [
  'الزخرفة الذكية',
  'Taha Setri',
  'عالم الرموز والتصميم',
  'Legend Gamer',
  'الأمل والتفاؤل',
  'Cyber Hero',
  'كن إيجابياً وتألق',
];
