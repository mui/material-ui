import * as React from 'react';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import { styled, alpha, Box } from '@mui/system';

export default function VerticalSlider() {
  return (
    <Box sx={{ height: 300 }}>
      <Slider orientation="vertical" defaultValue={30} />
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
  700: '#0059B3',
  900: '#003A75',
};

const Slider = styled(BaseSlider)(
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


  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    height: 100%;
    width: inherit;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    width: inherit;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};  
    left: 50%;
    -webkit-transform: translate(-50%, 50%);
    -moz-transform: translate(-50%, 50%);
    -ms-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);
    transition-property: box-shadow, width, height;
    transition-timing-function: ease;
    transition-duration: 120ms;

    &:hover {
      box-shadow: 0 0 0 6px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[300],
        0.3,
      )};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[400],
        0.5,
      )};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[400],
        0.5,
      )};
      outline: none;
      width: 22px;
      height: 22px;
    }
  }
`,
);
