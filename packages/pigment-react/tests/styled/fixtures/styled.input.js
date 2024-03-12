import { styled } from '@pigment-css/react';

const Rail = styled('span')`
  display: block;
  opacity: 0.38;
`;

const Slider = styled('div')`
  display: block;
  opacity: 0.32;
  ${Rail} {
    display: none;
  }
`;
