const CODE_VARIANTS = {
  JS: 'JS',
  TS: 'TS',
};

const ACTION_TYPES = {
  OPTIONS_CHANGE: 'OPTIONS_CHANGE',
  NOTIFICATIONS_CHANGE: 'NOTIFICATIONS_CHANGE',
};

// Valid languages to server-side render in production
const LANGUAGES = ['en', 'zh', 'ru', 'pt', 'es', 'fr', 'de', 'ja', 'aa'];

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

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/master';

module.exports = {
  CODE_VARIANTS,
  ACTION_TYPES,
  LANGUAGES,
  LANGUAGES_SSR,
  LANGUAGES_LABEL,
  LANGUAGES_IN_PROGRESS,
  SOURCE_CODE_ROOT_URL,
};
