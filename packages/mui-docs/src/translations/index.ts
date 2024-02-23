import en from './translations.json';

export type Translations = { [index: string]: string | Translations };

export default {
  en,
} as Record<string, Translations>;
