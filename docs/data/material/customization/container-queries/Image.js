import { styled } from '@mui/material/styles';

const Image = styled('img')(({ theme }) => ({
  alignSelf: 'stretch',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  width: '100%',
  maxHeight: 160,
  transition: '0.4s',
  [theme.containerQueries.up(350)]: {
    maxWidth: '36%',
    maxHeight: 'initial',
  },
  [theme.containerQueries.up(500)]: {
    maxWidth: 240,
  },
}));

export default Image;
