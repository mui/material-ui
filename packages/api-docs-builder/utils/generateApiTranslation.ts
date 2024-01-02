import { mkdirSync } from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { writePrettifiedFile } from '../buildApiUtils';

interface MinimalReactAPI {
  name: string;
  apiDocsTranslationFolder?: string;
  translations: object;
}

export default function generateApiTranslations<ReactApi extends MinimalReactAPI>(
  outputDirectory: string,
  reactApi: ReactApi,
  languages: string[],
) {
  const definitionName = reactApi.name;
  const apiDocsTranslationPath = path.resolve(outputDirectory, kebabCase(definitionName));
  function resolveApiDocsTranslationsComponentLanguagePath(
    language: (typeof languages)[0],
  ): string {
    const languageSuffix = language === 'en' ? '' : `-${language}`;

    return path.join(apiDocsTranslationPath, `${kebabCase(definitionName)}${languageSuffix}.json`);
  }

  mkdirSync(apiDocsTranslationPath, {
    mode: 0o777,
    recursive: true,
  });
  reactApi.apiDocsTranslationFolder = apiDocsTranslationPath;

  writePrettifiedFile(
    resolveApiDocsTranslationsComponentLanguagePath('en'),
    JSON.stringify(reactApi.translations),
  );

  languages.forEach((language) => {
    if (language !== 'en') {
      try {
        writePrettifiedFile(
          resolveApiDocsTranslationsComponentLanguagePath(language),
          JSON.stringify(reactApi.translations),
          undefined,
          { flag: 'wx' },
        );
      } catch (error) {
        // File exists
      }
    }
  });
}
