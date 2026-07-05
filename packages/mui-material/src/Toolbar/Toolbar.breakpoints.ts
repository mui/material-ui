import type { BreakpointStylesDescriptor } from '../styles/BreakpointStylesRegistry';
import toolbarClasses from './toolbarClasses';

// The injector is early in <head>, so write responsive values as private CSS vars.
const toolbarBreakpointStyles: BreakpointStylesDescriptor = (theme) => [
  {
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      [`.${toolbarClasses.root}.${toolbarClasses.regular}`]: {
        '--MuiToolbar-regular-minHeight': '48px',
      },
    },
  },
  {
    [theme.breakpoints.up('sm')]: {
      [`.${toolbarClasses.root}.${toolbarClasses.gutters}`]: {
        '--MuiToolbar-gutters-paddingLeft': theme.spacing(3),
        '--MuiToolbar-gutters-paddingRight': theme.spacing(3),
      },
      [`.${toolbarClasses.root}.${toolbarClasses.regular}`]: {
        '--MuiToolbar-regular-minHeight': '64px',
      },
    },
  },
];

export default toolbarBreakpointStyles;
