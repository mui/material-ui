import * as React from 'react';
import { createTheme } from '../styles';
import SystemBox from '@material-ui/system/Box';

const defaultTheme = createTheme();

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const Box = (props) => {
  return <SystemBox {...props} theme={!props.theme || isEmpty(props.theme) ? defaultTheme : props.theme} />
}

export default Box;
