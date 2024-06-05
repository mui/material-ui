import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const Content = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  flex: 'auto',
  transition: 'padding 0.4s',
  [theme.containerQueries.up(500)]: {
    padding: theme.spacing(3),
  },
}));

export default Content;
