import { styled } from '@mui/material/styles';

export const Component = styled('div')(({ theme }) => ({
  backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, 0.5),
  '&:hover': {
    backgroundColor: theme.lighten(theme.palette.primary.main, 0.2),
  },
  '&:active': {
    backgroundColor: theme.darken(theme.palette.primary.main, 0.2),
  },
}));