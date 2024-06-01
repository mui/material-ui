import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const DynamicCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.containerQueries.up(350)]: {
    flexDirection: 'row',
  },
}));

export default DynamicCard;
