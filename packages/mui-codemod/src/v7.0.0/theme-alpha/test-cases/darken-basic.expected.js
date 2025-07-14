import { darken } from '@mui/system/colorManipulator';

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.darken(theme.palette.primary.main, 0.1),
  '&:active': {
    backgroundColor: theme.darken(theme.palette.primary.main, 0.3),
  },
  '&:disabled': {
    backgroundColor: theme.darken(theme.palette.action.disabled, 0.1),
  },
}));

const Card = styled('div')(({ theme }) => ({
  boxShadow: `0 2px 4px ${theme.darken(theme.palette.background.paper, 0.15)}`,
  borderColor: theme.darken(theme.palette.divider, 0.2),
}));