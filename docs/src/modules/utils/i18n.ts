import { mapTranslations } from '@mui/docs/i18n/utils';
import { GenerateMetadataProps } from './createMetadata';

export const defaultLanguage = 'en';

export function getTranslations() {
  const req = require.context('docs/translations', false, /\.\/translations.*\.json$/);
  return mapTranslations(req);
}

export async function getUserLanguageFromMetadata(
  generateProps: GenerateMetadataProps,
): Promise<string> {
  const { lang } = await generateProps.params;
  return lang ?? defaultLanguage;
}
