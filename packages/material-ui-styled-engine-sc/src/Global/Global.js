import * as React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle((props) => {
  if (typeof props.styles === 'string') {
    return [...props.styles];
  }

  return props.styles;
});

function Global(props) {
  const { styles } = props;
  return <GlobalStyle styles={styles} />;
}

export default Global;

Global.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
