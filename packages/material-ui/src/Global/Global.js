import * as React from 'react';
import { defaultTheme } from '../styles';
import { Global } from '@material-ui/styled-engine';

export default function Global(props) {
  return <Global {...props} defaultTheme={defaultTheme} />;
}

Global.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
