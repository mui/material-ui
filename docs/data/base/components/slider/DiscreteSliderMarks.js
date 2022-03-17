import * as React from 'react';
import { styled, alpha, Box } from '@mui/system';
import SliderUnstyled from '@mui/base/SliderUnstyled';

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? '#1976d2' : '#90caf9'};
  height: 4px;
  width: 100%;
  padding: 13px 0;
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
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-left: -6px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid currentColor;
    background-color: #fff;
  }

  & .MuiSlider-mark {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    top: 50%;
    opacity: 0.7;
    transform: translateX(-50%);
  }

  & .MuiSlider-markActive {
    background-color: #fff;
  }

  & .MuiSlider-markLabel {
    font-family: IBM Plex Sans;
    font-size: 14px;
    position: absolute;
    white-space: nowrap;
    top: 30px;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
  }

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
`,
);

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: 300 }}>
      <StyledSlider
        aria-label="Temperature"
        defaultValue={37}
        getAriaValueText={valuetext}
        marks={marks}
      />
    </Box>
  );
}
