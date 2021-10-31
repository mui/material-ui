import MuiContainer from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(MuiContainer)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15vw',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '7rem',
  },
}));

export default StyledContainer;
