import * as React from 'react';
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';
import SliderUnstyled from '@material-ui/unstyled/SliderUnstyled';
import Box from '@material-ui/core/Box';

const StyledSlider = styled(SliderUnstyled)`
  color: black;
  height: 2px;
  width: 100%;
  padding: 13px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 2px;
    border-radius: 1px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 12px;
    height: 12px;
    margin-left: -6px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &::after {
      position: absolute;
      content: '';
      border-radius: 50%;
      left: -15px;
      top: -15px;
      right: -15px;
      bottom: -15px;
    }

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 8px ${alpha('#000', 0.16)};
    }

    &.Mui-active {
      box-shadow: 0 0 0 14px ${alpha('#000', 0.16)};
    }
  }
`;

export default function UnstyledSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <StyledSlider defaultValue={10} />
    </Box>
  );
}
