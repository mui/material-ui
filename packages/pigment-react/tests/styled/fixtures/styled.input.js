import { styled, keyframes } from '@pigment-css/react';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const Component = styled.div({
  color: '#ff5252',
  animation: `${rotateKeyframe} 2s ease-out 0s infinite`,
});

const Component2 = styled.div`
  color: red;
  &:has(.foo) {
    color: blue;
  }
`;

const Component3 = styled('div')`
  color: red;
  &:has(.foo) {
    color: blue;
  }
`;
