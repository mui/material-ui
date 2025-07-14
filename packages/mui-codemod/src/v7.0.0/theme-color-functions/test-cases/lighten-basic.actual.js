import { lighten } from '@mui/system/colorManipulator';

const Component = styled('div')(({ theme }) => ({
  backgroundColor: lighten(theme.palette.primary.main, 0.2),
  color: lighten(theme.palette.text.primary, 0.5),
  border: `1px solid ${lighten(theme.palette.divider, 0.1)}`,
  '&:hover': {
    backgroundColor: lighten(theme.palette.primary.dark, 0.3),
  },
}));