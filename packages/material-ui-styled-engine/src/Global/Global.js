import * as React from 'react';
import PropTypes from 'prop-types';
import { Global as EmotionGlobal, css } from '@emotion/react';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function Global(props) {
  const { styles, defaultTheme } = props;

  const globalStyles =
    typeof styles === 'function'
      ? (themeInput) => styles(isEmpty(themeInput) ? defaultTheme : themeInput)
      : styles;

  return <EmotionGlobal styles={globalStyles} />;
}

Global.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
