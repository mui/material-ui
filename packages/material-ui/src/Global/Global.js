import * as React from 'react';
import PropTypes from 'prop-types';
import { Global as StyledEngineGlobal } from '@material-ui/styled-engine';
import defaultTheme from '../styles/defaultTheme';

/**
 * @ignore - do not document.
 */
export default function Global(props) {
  return <StyledEngineGlobal {...props} defaultTheme={defaultTheme} />;
}

Global.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
