import { mapTranslations } from '@mui/docs/i18n/utils';
import { Router } from '@mui/docs/routing';
import { GenerateMetadataProps } from './createMetadata';

export const defaultLanguage = 'en';

export function getTranslations() {
  const req = require.context('docs/translations', false, /\.\/translations.*\.json$/);
  return mapTranslations(req);
}

export function getUserLanguageFromRouter(router: Router): string {
  return router.getSearchParam('userLanguage') ?? defaultLanguage;
}

export async function getUserLanguageFromMetadata(
  generateProps: GenerateMetadataProps,
): Promise<string> {
  const searchParams = await generateProps.searchParams;
  const langParam = searchParams?.['userLanguage'];
  return langParam ? (Array.isArray(langParam) ? langParam[0] : langParam) : defaultLanguage;
}
