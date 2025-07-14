import { darken } from '@mui/system/colorManipulator';

const Button = styled('button')(({ theme }) => ({
  backgroundColor: darken(theme.palette.primary.main, 0.1),
  '&:active': {
    backgroundColor: darken(theme.palette.primary.main, 0.3),
  },
  '&:disabled': {
    backgroundColor: darken(theme.palette.action.disabled, 0.1),
  },
}));

const Card = styled('div')(({ theme }) => ({
  boxShadow: `0 2px 4px ${darken(theme.palette.background.paper, 0.15)}`,
  borderColor: darken(theme.palette.divider, 0.2),
}));