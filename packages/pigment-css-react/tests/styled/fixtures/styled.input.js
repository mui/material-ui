import { styled, keyframes } from '@pigment-css/react';
import PropTypes from 'prop-types';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const Component = styled.div(({ theme }) => ({
  color: '#ff5252',
  animation: `${rotateKeyframe} 2s ease-out 0s infinite`,
}));

export const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: currentColor;
  opacity: 0.38;
`;

const SliderRail2 = styled.span`
  display: block;
  opacity: 0.38;
  ${SliderRail} {
    display: none;
  }
`;

export function App() {
  return (
    <Component>
      <SliderRail />
      <SliderRail2 />
    </Component>
  );
}

App.propTypes = {
  children: PropTypes.element,
};

App.muiName = 'App';
