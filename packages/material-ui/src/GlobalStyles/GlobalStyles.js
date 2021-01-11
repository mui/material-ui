import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as StyledEngineGlobalStyles } from '@material-ui/styled-engine';
import defaultTheme from '../styles/defaultTheme';

/**
 * @ignore - do not document.
 */
export default function GlobalStyles(props) {
  return <StyledEngineGlobalStyles {...props} defaultTheme={defaultTheme} />;
}

GlobalStyles.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
