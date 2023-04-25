import * as React from 'react';
import PropTypes from 'prop-types';
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
    & .label {
        background: unset;
        background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[300]};
        width: 32px;
        height: 32px;
        padding: 0px;
        visibility: hidden;
        color: #fff;
        border-radius: 50% 50% 50% 0;
        position: absolute;
        transform: translate(-35%, -140%) rotate(-45deg) scale(0);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :hover .label {
        visibility: visible;
        transform: translate(-35%, -140%) rotate(-45deg) scale(1);
    }
    :hover .value {
        transform: rotate(45deg);
        text-align: center;
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

function SliderValueLabel({ children }) {
  return (
    <span className="label">
      <div className="value">{children}</div>
    </span>
  );
}

SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function LabeledValuesSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <StyledSlider defaultValue={10} slots={{ valueLabel: SliderValueLabel }} />
    </Box>
  );
}
