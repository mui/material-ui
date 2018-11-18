/* eslint-disable import/prefer-default-export, camelcase */

import borders from '@material-ui/system/borders';
import compose from '@material-ui/system/compose';
import createBox from '@material-ui/styles/createBox';
import display from '@material-ui/system/display';
import flexbox from '@material-ui/system/flexbox';
import palette from '@material-ui/system/palette';
import position from '@material-ui/system/position';
import shadows from '@material-ui/system/shadows';
import sizing from '@material-ui/system/sizing';
import spacing from '@material-ui/system/spacing';
import typography from '@material-ui/system/typography';
import css from '@material-ui/system/css';

/**
 * @ignore - do not document.
 */
export const unstable_Box = createBox(
  css(
    compose(
      borders,
      display,
      flexbox,
      position,
      palette,
      shadows,
      sizing,
      spacing,
      typography,
    ),
  ),
);
