import * as React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

// #major-version-switch
const HOST = 'https://mui.com';

export default function Head(props) {
  const t = useTranslate();
  const {
    card = '/static/social-previews/default-preview.jpg',
    children,
    description = t('strapline'),
    disableAlternateLocale = false,
    largeCard = true,
    title = t('headTitle'),
  } = props;
  const userLanguage = useUserLanguage();
  const router = useRouter();
  const preview = card.startsWith('http') ? card : `${HOST}${card}`;
  const { canonicalAs } = pathnameToLanguage(router.asPath);

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />
      {/* https://twitter.com/MUI_hq */}
      <meta name="twitter:site" content="@MUI_hq" />
      {/* #major-version-switch */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={preview} />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {/* #major-version-switch */}
      <meta property="og:url" content={`${HOST}${router.asPath}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={preview} />
      <meta property="og:ttl" content="604800" />
      {/* Algolia */}
      <meta name="docsearch:language" content={userLanguage} />
      {/* #major-version-switch */}
      <meta name="docsearch:version" content="master" />
      {disableAlternateLocale
        ? null
        : LANGUAGES_SSR.map((userLanguage2) => (
            <link
              key={userLanguage2}
              rel="alternate"
              href={`https://mui.com${
                userLanguage2 === 'en' ? '' : `/${userLanguage2}`
              }${canonicalAs}`}
              hrefLang={userLanguage2}
            />
          ))}
      {children}
    </NextHead>
  );
}

Head.propTypes = {
  card: PropTypes.string,
  children: PropTypes.node,
  description: PropTypes.string,
  disableAlternateLocale: PropTypes.bool,
  largeCard: PropTypes.bool,
  title: PropTypes.string,
};
