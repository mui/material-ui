import * as React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

// #major-version-switch
const HOST = 'https://mui.com';

export default function Head(props) {
  const t = useTranslate();
  const {
    card = '/static/social-previews/default-preview.jpg',
    children,
    description = t('strapline'),
    largeCard = true,
    title = t('headTitle'),
  } = props;
  const userLanguage = useUserLanguage();
  const router = useRouter();
  const preview = card.startsWith('http') ? card : `${HOST}${card}`;
  return (
    <NextHead>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />
      {/* https://twitter.com/MaterialUI */}
      <meta name="twitter:site" content="@MaterialUI" />
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
      {children}
    </NextHead>
  );
}

Head.propTypes = {
  card: PropTypes.string,
  children: PropTypes.node,
  description: PropTypes.string,
  largeCard: PropTypes.bool,
  title: PropTypes.string,
};
