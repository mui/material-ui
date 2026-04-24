import { createRender } from '@mui/internal-markdown';
import { LANGUAGES_IGNORE_PAGES } from '../constants';

const notEnglishJsonRegExp = /-([a-z]{2})\.json$/;

interface Req {
  keys(): string[];
  (filename: string): any;
}

/**
 * @param req - A webpack `require.context` for the API translation JSON files.
 * @param languagesIgnorePages - A function that returns true if the page should not be translated.
 *   Typically `LANGUAGES_IGNORE_PAGES` from the docs config.
 */
export function mapApiPageTranslations(
  req: Req,
  languagesIgnorePages: (pathname: string) => boolean = LANGUAGES_IGNORE_PAGES,
) {
  const headingHashes: Record<string, string> = {};
  const translations: Record<string, any> = {};

  // Process the English markdown before the other locales.
  // English ToC anchor links are used in all languages
  let filenames: string[] = [];
  req.keys().forEach((filename: string) => {
    if (filename.match(notEnglishJsonRegExp)) {
      filenames.push(filename);
    } else {
      filenames = [filename].concat(filenames);
    }
  });

  filenames.forEach((filename: string) => {
    const matchNotEnglishMarkdown = filename.match(notEnglishJsonRegExp);
    const userLanguage = matchNotEnglishMarkdown !== null ? matchNotEnglishMarkdown[1] : 'en';
    const translation = req(filename) || null;

    if (translation !== null && translation.componentDescription) {
      const componentDescriptionToc: any[] = [];
      const render = createRender({
        headingHashes,
        toc: componentDescriptionToc,
        userLanguage,
        location: filenames,
        options: {
          ignoreLanguagePages: languagesIgnorePages || (() => false),
          env: {
            SOURCE_CODE_REPO: '',
          },
        },
      });
      translation.componentDescription = render(translation.componentDescription);
      translation.componentDescriptionToc = componentDescriptionToc;
    }

    translations[userLanguage] = translation;
  });

  return translations;
}
