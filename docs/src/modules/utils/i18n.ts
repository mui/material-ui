import { mapTranslations } from '@mui/docs/i18n/utils';

export const defaultLanguage = 'en';

export function getTranslations() {
  const req = require.context('docs/translations', false, /\.\/translations.*\.json$/);
  return mapTranslations(req);
}
