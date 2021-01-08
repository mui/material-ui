import * as React from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../styles/defaultTheme';
import { Global as StyledEngineGlobal } from '@material-ui/styled-engine';

export default function Global(props) {
  return <StyledEngineGlobal {...props} defaultTheme={defaultTheme} />;
}

Global.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
