import * as React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

function Global(props) {
  const { styles } = props;

  const GlobalStyle = createGlobalStyle(...styles);

  return <GlobalStyle />;
}

function areQual(prevProps, nextProps) {
  return prevProps.styles === nextProps.styles;
}

export default React.memo(Global, areQual)

Global.propTypes = {
  styles: PropTypes.string,
};
