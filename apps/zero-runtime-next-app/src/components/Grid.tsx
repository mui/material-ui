import { styled } from '@mui/zero-runtime';

const Grid = styled('div')(({ theme }: any) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(25%, auto))',
  maxWidth: '100%',
  width: 'var(--max-width)',
  [theme.breakpoints.down(700.05)]: {
    gridTemplateColumns: '1fr',
    marginBottom: '120px',
    maxWidth: '320px',
    textAlign: 'center',
  },
  [theme.breakpoints.between(701, 1120.05)]: {
    gridTemplateColumns: 'repeat(2, 50%)',
  },
}));

export const HalfWidth = styled.div({
  marginLeft: 20,
  width: '50%',
  maxHeight: 100,
  padding: 20,
  border: '1px solid #ccc',
});

export default Grid;
