import { styled } from '@mui/material/styles';

const Line = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: '100vh',
  top: 0,
  transform: 'translateY(-400px)',
  left: 0,
  borderLeft: '1px dashed',
  borderColor: (theme.vars || theme).palette.divider,
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: '0.875rem',
  fontFamily: 'Menlo, monospace',
  '& span': {
    position: 'absolute',
    top: 'calc(400px - 1em)',
    left: 4,
  },
}));

export default Line;
