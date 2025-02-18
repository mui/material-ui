import { keyframes } from '@pigment-css/react';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const rotateKeyframe2 = keyframes`
  from {
    transform: rotate(360deg);
  }
  
  to {
    transform: rotate(0deg);
  }
`;
