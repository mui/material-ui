const CODE_VARIANTS = {
  JS: 'JS',
  TS: 'TS',
};

// Valid languages to server-side render in production
const LANGUAGES = ['en', 'zh', 'ru', 'pt', 'es', 'fr', 'de', 'ja'];

// Server side rendered languages
const LANGUAGES_SSR = ['en', 'zh', 'ru', 'pt', 'es'];

// Work in progress
const LANGUAGES_IN_PROGRESS = LANGUAGES.slice();

// Valid languages to use in production
const LANGUAGES_LABEL = [
  {
    code: 'en',
    text: 'English',
  },
  {
    code: 'zh',
    text: '中文',
  },
  {
    code: 'ru',
    text: 'Русский',
  },
  {
    code: 'pt',
    text: 'Português',
  },
  {
    code: 'es',
    text: 'Español',
  },
  {
    code: 'fr',
    text: 'Français',
  },
  {
    code: 'de',
    text: 'Deutsch',
  },
  {
    code: 'ja',
    text: '日本語',
  },
];

module.exports = {
  CODE_VARIANTS,
  LANGUAGES,
  LANGUAGES_SSR,
  LANGUAGES_LABEL,
  LANGUAGES_IN_PROGRESS,
};
