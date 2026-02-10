import { styled } from '@pigment-css/react';

export const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: currentColor;
  opacity: 0.38;
  font-size: ${({ theme }) => (theme.vars ?? theme).size.font.h1};
`;

function App() {
  return <SliderRail sx={{ color: 'red' }} />;
}

function App2(props) {
  return (
    <SliderRail
      sx={
        props.variant === 'secondary'
          ? { color: props.isRed ? 'red' : 'blue' }
          : { backgroundColor: 'blue', color: 'white' }
      }
    />
  );
}

function App3(props) {
  return (
    <SliderRail sx={props.variant === 'secondary' && { color: props.isRed ? 'red' : 'blue' }} />
  );
}

const textAlign = 'center';
const styles4 = {
  mb: 1,
  textAlign,
};

function App4(props) {
  return <SliderRail sx={styles4} />;
}
