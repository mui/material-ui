import { styled, keyframes } from '@mui/zero-runtime';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const Component = styled.div(({ theme }) => ({
  color: theme.palette.primary.main,
  animation: `${rotateKeyframe} 2s ease-out 0s infinite`,
}));
