import { makeStyles as makeStylesWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

function makeStyles(stylesOrCreator, options = {}) {
  return makeStylesWithoutDefault(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}

export default makeStyles;
