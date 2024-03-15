import { styled } from '@pigment-css/react';

const SliderRail = styled('span', {
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

function App2(props) {
  return (
    <SliderRail
      sx={({ theme }) => ({
        mb: 1,
        ...theme.applyStyles('dark', {
          color: 'white',
        }),
      })}
    />
  );
}
