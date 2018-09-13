import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

function Head(props) {
  const { title, description } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MaterialUI" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://material-ui.com/static/brand.png" />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://material-ui.com/static/brand.png" />
      <meta property="og:locale" content="en_US" />
    </NextHead>
  );
}

Head.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Head.defaultProps = {
  description: "React Components that Implement Google's Material Design.",
  title: "The world's most popular React UI framework - Material-UI",
};

export default Head;
