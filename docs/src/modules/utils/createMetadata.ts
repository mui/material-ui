import { translate } from '@mui/docs/i18n/utils';
import { deepmerge } from '@mui/utils';
import { Metadata } from 'next';
import { getTranslations, getUserLanguageFromMetadata } from './i18n';

export interface GenerateMetadataProps<T = unknown> {
  params: Promise<{ lang?: string } & T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// #host-reference
const HOST = process.env.NEXT_PUBLIC_PULL_REQUEST_ID
  ? `https://deploy-preview-${process.env.NEXT_PUBLIC_PULL_REQUEST_ID}--${process.env.NEXT_PUBLIC_NETLIFY_SITE_NAME}.netlify.app`
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

  const {
    card = '/static/social-previews/home-preview.jpg',
    description = translate('strapline', translations, userLanguage),
    disableAlternateLocale = false,
    largeCard = true,
    title = translate('headTitle', translations, userLanguage),
    type = 'website',
    ...otherMetadata
  } = options;

  const preview = card.startsWith('http') ? card : `${HOST}${card}`;

  const metadata = {
    description: description,
    metadataBase: new URL(HOST),
    // facebook
    openGraph: {
      description: description!,
      images: [preview],
      title: title!,
      ttl: 604800,
      type: type,
      url: `./`,
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
