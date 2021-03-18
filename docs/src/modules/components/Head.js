import * as React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

export default function Head(props) {
  const t = useTranslate();
  const {
    card = 'https://next.material-ui.com/static/branding/card.png',
    children,
    description = t('strapline'),
    largeCard = true,
    title = t('headTitle'),
  } = props;
  const userLanguage = useUserLanguage();
  const router = useRouter();

  return (
    <NextHead>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:site" content="@MaterialUI" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={card} />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={`https://material-ui.com${router.asPath}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={card} />
      <meta property="og:ttl" content="604800" />
      {/* Algolia */}
      <meta name="docsearch:language" content={userLanguage} />
      <meta name="docsearch:version" content="next" />
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
