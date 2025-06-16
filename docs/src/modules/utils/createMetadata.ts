import { translate } from '@mui/docs/i18n/utils';
import { deepmerge } from '@mui/utils';
import { LANGUAGES_SSR } from 'docs/config';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { defaultLanguage, getTranslations, getUserLanguageFromMetadata } from './i18n';

export interface GenerateMetadataProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// #host-reference
const HOST = process.env.PULL_REQUEST_ID
  ? `https://deploy-preview-${process.env.PULL_REQUEST_ID}--${process.env.NETLIFY_SITE_NAME}.netlify.app`
  : 'https://mui.com';

export default async function createMetadata(
  generateProps: GenerateMetadataProps,
  options: {
    card?: string;
    disableAlternateLocale?: boolean;
    largeCard?: boolean;
    type?: 'website';
  } & Metadata,
): Promise<Metadata> {
  const translations = getTranslations();
  const userLanguage = await getUserLanguageFromMetadata(generateProps);

  const headersList = await headers();
  const pathName = headersList.get('pathname');

  const {
    card = '/static/social-previews/home-preview.jpg',
    description = translate('strapline', translations, userLanguage),
    disableAlternateLocale = false,
    largeCard = true,
    title = translate('headTitle', translations, userLanguage),
    type = 'website',
    ...otherMetadata
  } = options;

  const { canonicalAs } = pathnameToLanguage(pathName!);
  const preview = card.startsWith('http') ? card : `${HOST}${card}`;

  const metadata = {
    alternates: {
      languages: disableAlternateLocale
        ? undefined
        : LANGUAGES_SSR.reduce(
            (map, language) => {
              map[language] =
                `https://mui.com${language === defaultLanguage ? '' : `/${language}`}${canonicalAs}`;

              return map;
            },
            {} as Record<string, string>,
          ),
    },
    description: description,
    // facebook
    openGraph: {
      description: description!,
      images: [preview],
      title: title!,
      ttl: 604800,
      type: type,
      url: `${HOST}${pathName}`,
    },
    other: {
      'docsearch:language': userLanguage, // Algolia
      'docsearch:version': 'master', // #host-reference
    },
    title: title,
    // X
    twitter: {
      card: largeCard ? 'summary_large_image' : 'summary',
      description: description!,
      images: [preview],
      site: '@MUI_hq', // https://x.com/MUI_hq
      title: title!,
    },
  };

  return deepmerge(metadata, otherMetadata);
}
