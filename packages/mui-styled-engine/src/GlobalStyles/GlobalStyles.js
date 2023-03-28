import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

export default function GlobalStyles(props) {
  const { styles, defaultTheme = {}, identifier } = props;

  const globalStyles =
    typeof styles === 'function'
      ? (themeInput) => {
          const theme = isEmpty(themeInput) ? defaultTheme : themeInput;
          return styles(identifier ? theme[identifier] || theme : theme);
        }
      : styles;

  return <Global styles={globalStyles} />;
}

GlobalStyles.propTypes = {
  defaultTheme: PropTypes.object,
  identifier: PropTypes.string,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
