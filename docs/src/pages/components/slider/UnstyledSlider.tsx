import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import SliderUnstyled from '@material-ui/unstyled/SliderUnstyled';
import Box from '@material-ui/core/Box';

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
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
    background-color: ${theme.palette.getContrastText(theme.palette.primary.main)};

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(theme.palette.primary.main, 0.15)};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${alpha(theme.palette.primary.main, 0.3)};
    }
  }
`,
);

export default function UnstyledSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <StyledSlider defaultValue={10} />
    </Box>
  );
}
