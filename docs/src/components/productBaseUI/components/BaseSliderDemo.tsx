import * as React from 'react';
import Box from '@mui/material/Box';
import SliderUnstyled from '@mui/base/Slider';
import { styled } from '@mui/system';

const StyledSlider = styled('span')`
  color: var(--muidocs-palette-primary-main);
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

  &.Mui-disabled {
    pointer-events: none;
    cursor: default;
    color: var(--muidocs-palette-primary-600);
    opacity: 0.5;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.4;
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
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem rgba(var(--muidocs-palette-primary-lightChannel) / 0.4);
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem rgba(var(--muidocs-palette-primary-lightChannel) / 0.4);
    }
  }
`;

export default function BaseTabsDemo({ styling }: { styling?: 'system' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        py: 2,
        px: 5,
        maxWidth: 300,
        mx: 'auto',
      }}
    >
      <SliderUnstyled slots={{ root: !styling ? undefined : StyledSlider }} defaultValue={10} />
      <SliderUnstyled
        slots={{ root: !styling ? undefined : StyledSlider }}
        defaultValue={10}
        disabled
      />
    </Box>
  );
}
BaseTabsDemo.getCode = (styling?: 'system') => {
  if (styling === 'system') {
    return `import SliderUnstyled from '@mui/base/Slider';
import { styled } from '@mui/system';

const StyledSlider = styled('span')\`
  // 🪄 styles here.
\`;

<SliderUnstyled slots={{ root: StyledSlider }} defaultValue={10} />
`;
  }
  return `import SliderUnstyled from '@mui/base/Slider';

<SliderUnstyled defaultValue={10} />
`;
};
