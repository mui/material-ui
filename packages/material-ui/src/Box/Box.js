import borders from '@material-ui/system/borders';
import compose from '@material-ui/system/compose';
import display from '@material-ui/system/display';
import flexbox from '@material-ui/system/flexbox';
import palette from '@material-ui/system/palette';
import positions from '@material-ui/system/positions';
import shadows from '@material-ui/system/shadows';
import sizing from '@material-ui/system/sizing';
import spacing from '@material-ui/system/spacing';
import typography from '@material-ui/system/typography';
import css from '@material-ui/system/css';
import { styled } from '@material-ui/styles';

export const styleFunction = css(
  compose(
    borders,
    display,
    flexbox,
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
