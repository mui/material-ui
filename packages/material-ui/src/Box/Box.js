import {
  borders,
  compose,
  display,
  flexbox,
  gridcontainer,
  griditem,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  css,
} from '@material-ui/system';
import styled from '../styles/styled';

export const styleFunction = css(
  compose(
    borders,
    display,
    flexbox,
    gridcontainer,
    griditem,
    positions,
    palette,
    shadows,
    sizing,
    spacing,
    typography,
  ),
);

/**
 * @ignore - do not document.
 */
const Box = styled('div')(styleFunction, { name: 'MuiBox' });

export default Box;
