/* eslint-disable camelcase */

import borders from '@material-ui/system/borders';
import compose from '@material-ui/system/compose';
import styled from '@material-ui/styles/styled';
import display from '@material-ui/system/display';
import flexbox from '@material-ui/system/flexbox';
import palette from '@material-ui/system/palette';
import positions from '@material-ui/system/positions';
import shadows from '@material-ui/system/shadows';
import sizing from '@material-ui/system/sizing';
import spacing from '@material-ui/system/spacing';
import typography from '@material-ui/system/typography';
import css from '@material-ui/system/css';

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
export const unstable_Box = styled('div')(styleFunction, { name: 'MuiBox' });
