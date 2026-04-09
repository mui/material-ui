import mapApiPageTranslationsBase from '@mui/internal-core-docs/mapApiPageTranslations';

import { LANGUAGES_IGNORE_PAGES } from '../../../config';

export default function mapApiPageTranslations(req) {
  return mapApiPageTranslationsBase(req, LANGUAGES_IGNORE_PAGES);
}
