const CODE_VARIANTS = {
  JS: 'JS',
  TS: 'TS',
};

const ACTION_TYPES = {
  OPTIONS_CHANGE: 'OPTIONS_CHANGE',
};

// Valid languages to server-side render in production
const LANGUAGES = ['en', 'zh', 'ru', 'pt', 'fr', 'es', 'de', 'ja', 'aa'];

// Valid languages to use in production
const LANGUAGES_LABEL = [
  {
    code: 'en',
    text: '🇺🇸 English',
  },
  {
    code: 'zh',
    text: '🇨🇳 中文',
  },
  {
    code: 'ru',
    text: '🇷🇺 Русский',
  },
  {
    code: 'pt',
    text: '🇧🇷 Português',
  },
  {
    code: 'fr',
    text: '🇫🇷 Français',
  },
  {
    code: 'es',
    text: '🇪🇸 Español',
  },
  {
    code: 'de',
    text: '🇩🇪 Deutsch',
  },
  {
    code: 'ja',
    text: '🇯🇵 日本語',
  },
];

// Work in progress
const LANGUAGES_IN_PROGRESS = [...LANGUAGES];

module.exports = {
  CODE_VARIANTS,
  ACTION_TYPES,
  LANGUAGES,
  LANGUAGES_LABEL,
  LANGUAGES_IN_PROGRESS,
};
