import { keyframes, styled } from '@pigment-css/react';

export const bounceAnim = keyframes({
  'from, 20%, 53%, 80%, to': {
    transform: 'translate3d(0,0,0)',
  },
  '40%, 43%': {
    transform: 'translate3d(0, -30px, 0)',
  },
  '70%': {
    transform: 'translate3d(0, -15px, 0)',
  },
  '90%': {
    transform: 'translate3d(0,-4px,0)',
  },
});

export const Button = styled('button', {
  name: 'MuiButton',
  slot: 'Root',
})(
  () => ({
    fontFamily: 'sans-serif',
  }),
  {
    fontFamily: 'sans-serif',
    color: (props) => (props.isRed ? 'primary.main' : 'secondary.main'),
    '--css-variable': (props) => (props.isRed ? 'palette.primary.main' : 'palette.secondary.main'),
  },
);
