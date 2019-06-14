import React from 'react';
import NextHead from 'next/head';
import { _rewriteUrlForNextExport, withRouter } from 'next/router';
import PropTypes from 'prop-types';

function Head(props) {
  const { title, router, description } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MaterialUI" />
      <meta name="twitter:title" content={`${title} [v3]`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://v3.material-ui.com/static/brand.png" />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={`https://v3.material-ui.com${_rewriteUrlForNextExport(router.asPath)}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://v3.material-ui.com/static/brand.png" />
      <meta property="og:ttl" content="604800" />
      {/* Algolia */}
      <meta name="docsearch:language" content="en" />
      <meta name="docsearch:version" content="v3" />
    </NextHead>
  );
}

Head.propTypes = {
  description: PropTypes.string,
  router: PropTypes.object.isRequired,
  title: PropTypes.string,
};

Head.defaultProps = {
  description: "React Components that Implement Google's Material Design.",
  title: "The world's most popular React UI framework - Material-UI",
};

export default withRouter(Head);
