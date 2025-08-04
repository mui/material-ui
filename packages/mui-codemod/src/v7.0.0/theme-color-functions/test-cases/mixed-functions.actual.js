import { alpha, lighten, darken } from '@mui/system/colorManipulator';

const ComplexComponent = styled('div')(({ theme }) => ({
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.1)`
    : alpha(theme.palette.primary.main, 0.1),
  border: `2px solid ${lighten(theme.palette.primary.main, 0.5)}`,
  '&:hover': {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`
      : alpha(theme.palette.primary.main, 0.2),
    borderColor: darken(theme.palette.primary.main, 0.2),
  },
  '&:active': {
    backgroundColor: darken(theme.palette.primary.dark, 0.1),
    color: lighten(theme.palette.primary.contrastText, 0.3),
  },
}));