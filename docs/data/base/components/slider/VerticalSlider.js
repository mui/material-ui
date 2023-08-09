import * as React from 'react';
import { Slider, sliderClasses } from '@mui/base/Slider';
import { styled, alpha, Box } from '@mui/system';

export default function VerticalSlider() {
  return (
    <Box sx={{ height: 300 }}>
      <StyledSlider orientation="vertical" defaultValue={30} />
    </Box>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const StyledSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
  height: 95%;
  width: 4px;
  display: inline-block;
  position: relative;
  margin-top: 0.75rem;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    height: 100%;
    width: inherit;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    width: inherit;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: #fff;
    left: 50%;
    -webkit-transform: translate(-50%, 50%);
    -moz-transform: translate(-50%, 50%);
    -ms-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);

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
