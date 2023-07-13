'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

export default function GlobalStyles(props) {
  const { styles, defaultTheme = {} } = props;

  const globalStyles =
    typeof styles === 'function'
      ? (themeInput) => styles(isEmpty(themeInput) ? defaultTheme : themeInput)
      : styles;

  return <Global styles={globalStyles} />;
}

GlobalStyles.propTypes = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
};
