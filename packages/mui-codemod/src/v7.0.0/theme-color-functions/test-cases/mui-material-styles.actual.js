import { alpha, lighten, darken } from '@mui/material/styles';

export const Component = styled('div')(({ theme }) => ({
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.5)`
    : alpha(theme.palette.primary.main, 0.5),
  '&:hover': {
    backgroundColor: lighten(theme.palette.primary.main, 0.2),
  },
  '&:active': {
    backgroundColor: darken(theme.palette.primary.main, 0.2),
  },
}));