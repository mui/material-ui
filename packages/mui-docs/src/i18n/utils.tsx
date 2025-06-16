export interface TranslateOptions {
  ignoreWarning?: boolean;
}

export type Translate = (key: string, options?: TranslateOptions) => any;

export type Translations = { [key in string]?: string | Translations };

export interface RequireContext {
  (req: string): Translations;
  keys: () => string[];
}

const warnedOnce: Record<string, boolean> = {};

function getPath(obj: Translations, path: string): string | null {
  if (!path || typeof path !== 'string') {
    return null;
  }

  const translation = path
    .split('.')
    .reduce(
      (acc: Translations | string | null, item) =>
        (acc && typeof acc === 'object' && acc[item]) || null,
      obj,
    );

  if (typeof translation === 'object') {
    return null;
  }
  return translation;
}

// TODO, migrate to use warnOnce() helper
function warn(userLanguage: string, key: string, ignoreWarning: boolean) {
  const fullKey = `${userLanguage}:${key}`;
  // No warnings in CI env
  if (!ignoreWarning && !warnedOnce[fullKey] && typeof window !== 'undefined') {
    console.warn(`Missing translation for ${fullKey}`);

    warnedOnce[fullKey] = true;
  }
}

export function mapTranslations(req: RequireContext): Record<string, Translations> {
  const result: Record<string, Translations> = {};
  req.keys().forEach((filename) => {
    const match = filename.match(/-([a-z]{2}).json$/);

    if (match) {
      result[match[1]] = req(filename);
    } else {
      result.en = req(filename);
    }
  });
  return result;
}

export function translate(
  key: string,
  translations: Record<string, Translations>,
  userLanguage: string,
  options: TranslateOptions = {},
): string {
  const { ignoreWarning = false } = options;
  const wordings = translations[userLanguage];

  if (!wordings) {
    console.error(`Missing language: ${userLanguage}.`);
    return '…';
  }

  const translation = getPath(wordings, key);

  if (!translation) {
    warn(userLanguage, key, ignoreWarning);

    const enTranslation = getPath(translations.en, key);
    return enTranslation ?? '';
  }

  return translation;
}
