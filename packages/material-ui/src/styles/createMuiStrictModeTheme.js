import { deepmerge } from '@material-ui/utils';
import createMuiTheme from './createMuiTheme';
import { unstable_StrictModeCollapse as StrictModeCollapse } from '../Collapse';
import { unstable_StrictModeFade as StrictModeFade } from '../Fade';
import { unstable_StrictModeGrow as StrictModeGrow } from '../Grow';
import { unstable_StrictModeSlide as StrictModeSlide } from '../Slide';
import { unstable_StrictModeZoom as StrictModeZoom } from '../Zoom';

export default function createMuiStrictModeTheme(options) {
  return createMuiTheme(
    deepmerge(
      {
        props: {
          // Collapse
          MuiExpansionPanel: {
            TransitionComponent: StrictModeCollapse,
          },
          MuiStepContent: {
            TransitionComponent: StrictModeCollapse,
          },
          // Fade
          MuiBackdrop: {
            TransitionComponent: StrictModeFade,
          },
          MuiDialog: {
            TransitionComponent: StrictModeFade,
          },
          // Grow
          MuiPopover: {
            TransitionComponent: StrictModeGrow,
          },
          MuiSnackbar: {
            TransitionComponent: StrictModeGrow,
          },
          MuiTooltip: {
            TransitionComponent: StrictModeGrow,
          },
          // Slide
          MuiDrawer: {
            TransitionComponent: StrictModeSlide,
          },
          // Zoom
          MuiSpeedDial: {
            TransitionComponent: StrictModeZoom,
          },
        },
      },
      options,
    ),
  );
}
