import * as React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function Head(props) {
  const t = useSelector((state) => state.options.t);
  const { description = t('strapline'), title = t('headTitle'), children } = props;
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const router = useRouter();

  return (
    <NextHead>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@MaterialUI" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://material-ui.com/static/logo.png" />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={`https://material-ui.com${router.asPath}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://material-ui.com/static/logo.png" />
      <meta property="og:ttl" content="604800" />
      {/* Algolia */}
      <meta name="docsearch:language" content={userLanguage} />
      <meta name="docsearch:version" content="next" />
      {children}
    </NextHead>
  );
}

Head.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string,
};
