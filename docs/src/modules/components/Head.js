import React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { rewriteUrlForNextExport } from 'next/dist/next-server/lib/router/rewrite-url-for-export';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function Head(props) {
  const t = useSelector((state) => state.options.t);
  const { description = t('strapline'), title = t('headTitle'), children } = props;
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const router = useRouter();

  return (
    <NextHead>
      {/* Use minimum-scale=1 to enable GPU rasterization. */}
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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
      <meta
        property="og:url"
        content={`https://material-ui.com${rewriteUrlForNextExport(router.asPath)}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://material-ui.com/static/logo.png" />
      <meta property="og:ttl" content="604800" />
      {/* Algolia */}
      <meta name="docsearch:language" content={userLanguage} />
      <meta name="docsearch:version" content="master" />
      {children}
    </NextHead>
  );
}

Head.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string,
};
