import { styled, keyframes } from '@pigment-css/react';

const rotateKeyframe = keyframes({
  from: {
    transform: 'translateX(0%)',
  },
  to: {
    transform: 'translateX(100%)',
  },
});

const Component = styled.div(({ theme }) => ({
  animation: `${rotateKeyframe} 2s ease-out 0s infinite`,
  marginLeft: 10,
}));

export const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  border-top-left-radius: 3px;
`;

const SliderRail2 = styled.span`
  ${SliderRail} {
    padding-inline-start: none;
    margin: 0px 10px 10px 30px;
  }
`;
