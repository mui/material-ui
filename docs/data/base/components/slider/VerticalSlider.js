import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import SliderUnstyled from '@mui/base/Slider';
import { styled, alpha } from '@mui/system';

function valuetext(value) {
  return `${value}°C`;
}

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? '#1976d2' : '#90caf9'};
  height: 100%;
  width: 4px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    height: 100%;
    width: inherit;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    width: inherit;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 14px;
    height: 14px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid currentColor;
    background-color: #fff;
    left: 50%;
    -webkit-transform: translate(-50%, 50%);
    -moz-transform: translate(-50%, 50%);
    -ms-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? '#1976d2' : '#90caf9',
        0.15,
      )};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? '#1976d2' : '#90caf9',
        0.3,
      )};
    }
  }
`,
);
export default function VerticalSlider() {
  return (
    <Stack sx={{ height: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Temperature"
        orientation="vertical"
        getAriaValueText={valuetext}
        defaultValue={30}
      />
      <StyledSlider orientation="vertical" defaultValue={30} />
    </Stack>
  );
}
