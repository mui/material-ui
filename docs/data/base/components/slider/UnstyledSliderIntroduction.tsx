import * as React from 'react';
import { styled, alpha, Box } from '@mui/system';
import Slider, { sliderClasses } from '@mui/base/Slider';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? blue[500] : blue[300]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 1;
  }

  &.${sliderClasses.disabled} { 
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
    opacity: 0.5;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.4;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -6px;
    margin-top: -6px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: #fff;

    :hover,
    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? blue[400] : blue[300],
        0.15,
      )};
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[300],
        0.3,
      )};
    }
  }
`,
);

export default function UnstyledSlider() {
  return (
    <Box sx={{ width: 320 }}>
      <StyledSlider defaultValue={50} />
      <StyledSlider defaultValue={10} disabled />
    </Box>
  );
}
