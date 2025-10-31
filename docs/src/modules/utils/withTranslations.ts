import { mapTranslations } from '@mui/docs/i18n';

/**
 * Higher-order function that wraps getStaticProps results with translations and user language.
 * This replaces the need for MyApp.getInitialProps to inject translations at the app level.
 *
 * @param props - The props object returned from getStaticProps
 * @returns Props object enhanced with translations and userLanguage
 */
export function withTranslations<T extends Record<string, any>>(props: T) {
  const req = require.context('docs/translations', false, /\.\/translations.*\.json$/);
  const translations = mapTranslations(req);

  return {
    ...props,
    userLanguage: 'en',
    translations,
  };
}
