import * as React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const GlobalStyle = createGlobalStyle((props) => {
  const { styles, defaultTheme } = props;

  return typeof styles === 'function'
    ? (props) => styles(isEmpty(props.theme) ? defaultTheme : props.theme)
    : typeof styles === 'string'
    ? [...props.styles]
    : styles;
});

function Global(props) {
  const { styles } = props;
  return <GlobalStyle styles={styles} />;
}

export default Global;

Global.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
