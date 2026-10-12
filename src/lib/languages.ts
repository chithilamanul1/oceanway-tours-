export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  aliases?: string[];
  popular?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English', 
    flag: '🇬🇧', 
    dir: 'ltr',
    aliases: ['en', 'eng', 'english', 'uk', 'us', 'usa', 'great britain'],
    popular: true,
  },
  { 
    code: 'de', 
    name: 'German', 
    nativeName: 'Deutsch', 
    flag: '🇩🇪', 
    dir: 'ltr',
    aliases: ['de', 'germen', 'german', 'deutsch', 'germany', 'allemand', 'tedesco', 'deutch'],
    popular: true,
  },
  { 
    code: 'ru', 
    name: 'Russian', 
    nativeName: 'Русский', 
    flag: '🇷🇺', 
    dir: 'ltr',
    aliases: ['ru', 'rushian', 'russian', 'russia', 'русский', 'ру', 'rossiya', 'russe', 'ruso'],
    popular: true,
  },
  { 
    code: 'ar', 
    name: 'Arabic', 
    nativeName: 'العربية', 
    flag: '🇸🇦', 
    dir: 'rtl',
    aliases: ['ar', 'arab', 'arabic', 'arabiya', 'saudi', 'عربي', 'bahrain', 'emirates'],
    popular: true,
  },
  { 
    code: 'fr', 
    name: 'French', 
    nativeName: 'Français', 
    flag: '🇫🇷', 
    dir: 'ltr',
    aliases: ['fr', 'france', 'french', 'français', 'francais'],
    popular: true,
  },
  { 
    code: 'si', 
    name: 'Sinhala', 
    nativeName: 'සිංහල', 
    flag: '🇱🇰', 
    dir: 'ltr',
    aliases: ['si', 'sri lanka', 'sinhala', 'sinhalese', 'සිංහල', 'lanka'],
    popular: true,
  },
  { 
    code: 'zh-CN', 
    name: 'Chinese', 
    nativeName: '中文 (简体)', 
    flag: '🇨🇳', 
    dir: 'ltr',
    aliases: ['zh', 'zh-cn', 'china', 'chinese', 'mandarin', 'zhongwen', '中文'],
  },
  { 
    code: 'es', 
    name: 'Spanish', 
    nativeName: 'Español', 
    flag: '🇪🇸', 
    dir: 'ltr',
    aliases: ['es', 'spain', 'spanish', 'español', 'espanol'],
  },
  { 
    code: 'it', 
    name: 'Italian', 
    nativeName: 'Italiano', 
    flag: '🇮🇹', 
    dir: 'ltr',
    aliases: ['it', 'italy', 'italian', 'italiano'],
  },
  { 
    code: 'ja', 
    name: 'Japanese', 
    nativeName: '日本語', 
    flag: '🇯🇵', 
    dir: 'ltr',
    aliases: ['ja', 'japan', 'japanese', 'nihongo', '日本語'],
  },
  { 
    code: 'hi', 
    name: 'Hindi', 
    nativeName: 'हिन्दी', 
    flag: '🇮🇳', 
    dir: 'ltr',
    aliases: ['hi', 'india', 'hindi', 'हिन्दी', 'bharat'],
  },
  { 
    code: 'nl', 
    name: 'Dutch', 
    nativeName: 'Nederlands', 
    flag: '🇳🇱', 
    dir: 'ltr',
    aliases: ['nl', 'netherlands', 'holland', 'dutch', 'nederlands'],
  },
  { 
    code: 'pt', 
    name: 'Portuguese', 
    nativeName: 'Português', 
    flag: '🇵🇹', 
    dir: 'ltr',
    aliases: ['pt', 'portugal', 'brazil', 'portuguese', 'português', 'portugues'],
  },
  { 
    code: 'pl', 
    name: 'Polish', 
    nativeName: 'Polski', 
    flag: '🇵🇱', 
    dir: 'ltr',
    aliases: ['pl', 'poland', 'polish', 'polski', 'polska'],
  },
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]; // English
