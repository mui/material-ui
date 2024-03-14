import * as React from 'react';
import Box from '@mui/material/Box';
import { Slider } from '@mui/base/Slider';
import { styled, GlobalStyles } from '@mui/system';

const rootStyles = `
  color: var(--primary);
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 1;
  }

  &.base--disabled {
    pointer-events: none;
    cursor: default;
    color: var(--primary);
    opacity: 0.5;
  }

  & .base-Slider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.4;
  }

  & .base-Slider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .base-Slider-thumb {
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: var(--primary);
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 4px var(--slider-ring);
    }

    &.base--focusVisible,
    &.base--active {
      box-shadow: 0 0 0 8px var(--slider-ring);
      outline: none;
      transform: scale(1.2);
    }
  }
`;

const StyledSlider = styled('span')(rootStyles);

const CSS = `.base-Slider-root {${rootStyles}}`;

export default function BaseTabsDemo({ styling }: { styling?: 'system' | 'tailwindcss' | 'css' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 144,
        gap: 2,
        py: 3,
        px: 5,
        maxWidth: 300,
        mx: 'auto',
      }}
    >
      {styling === 'css' && <GlobalStyles styles={CSS} />}
      {(styling === 'system' || styling === 'css') && (
        <React.Fragment>
          <Slider
            slots={{ root: styling !== 'system' ? undefined : StyledSlider }}
            defaultValue={50}
          />
          <Slider
            slots={{ root: styling !== 'system' ? undefined : StyledSlider }}
            defaultValue={30}
            disabled
          />
        </React.Fragment>
      )}
      {styling === 'tailwindcss' && (
        <React.Fragment>
          <Slider
            defaultValue={10}
            slotProps={{
              root: {
                className:
                  'py-4 px-0 w-full relative inline-flex items-center cursor-pointer text-[--primary] touch-action-none tap-highlight-transparent hover:opacity-100 ui-disabled:pointer-events-none ui-disabled:cursor-default ui-disabled:opacity-50 ui-disabled:cursor-default ui-disabled:text-[--primary] ui-disabled:opacity-50',
              },
              rail: {
                className: 'block absolute w-full h-[4px] rounded-full bg-current opacity-40',
              },
              track: {
                className: 'block absolute h-[4px] rounded-full bg-current',
              },
              thumb: {
                className:
                  'absolute w-[20px] h-[20px] -ml-[6px] box-border rounded-[50%] outline-none [border:4px_solid_currentcolor] bg-[--primary] hover:shadow-[0_0_0_4px_var(--slider-ring)] ui-focus-visible:shadow-[0_0_0_8px_var(--slider-ring)] ui-active:shadow-[0_0_0_8px_var(--slider-ring)] ui-active:scale-[1.2] transition',
              },
            }}
          />
          <Slider
            defaultValue={10}
            disabled
            slotProps={{
              root: {
                className:
                  'py-4 px-0 w-full relative inline-flex items-center cursor-pointer text-[--primary] touch-action-none tap-highlight-transparent hover:opacity-100 ui-disabled:pointer-events-none ui-disabled:cursor-default ui-disabled:opacity-50 ui-disabled:cursor-default ui-disabled:text-[--primary] ui-disabled:opacity-50',
              },
              rail: {
                className: 'block absolute w-full h-[4px] rounded-full bg-current opacity-40',
              },
              track: {
                className: 'block absolute h-[4px] rounded-full bg-current',
              },
              thumb: {
                className:
                  'absolute w-[20px] h-[20px] -ml-[6px] box-border rounded-[50%] outline-none [border:4px_solid_currentcolor] bg-[--primary] hover:shadow-[0_0_0_4px_var(--slider-ring)] ui-focus-visible:shadow-[0_0_0_8px_var(--slider-ring)] ui-active:shadow-[0_0_0_8px_var(--slider-ring)] ui-active:scale-[1.2] transition',
              },
            }}
          />
        </React.Fragment>
      )}
    </Box>
  );
}
BaseTabsDemo.getCode = (styling?: 'system' | 'tailwindcss' | 'css') => {
  if (styling === 'system') {
    return `import { Slider } from '@mui/base/Slider';
import { styled } from '@mui/system';

const StyledSlider = styled('span')\`${rootStyles}\`;

<Slider
  defaultValue={10}
  slots={{ root: StyledSlider }}
/>
<Slider
  disabled
  defaultValue={10}
  slots={{ root: StyledSlider }}
/>
`;
  }
  if (styling === 'css') {
    return `import { Slider } from '@mui/base/Slider';
import './styles.css';

<Slider
  defaultValue={10}
  slots={{ root: StyledSlider }}
/>
<Slider
  disabled
  defaultValue={10}
  slots={{ root: StyledSlider }}
/>

/* styles.css */
${CSS}
`;
  }
  if (styling === 'tailwindcss') {
    return `import { Slider } from '@mui/base/Slider';

<Slider
  defaultValue={10}
  slotProps={{
    root: {
      className: \`py-4 px-0 w-full relative 
        cursor-pointer text-[--primary] inline-flex items-center
        touch-action-none tap-highlight-transparent 
        hover:opacity-100 
        ui-disabled:pointer-events-none 
        ui-disabled:cursor-default 
        ui-disabled:opacity-50 
        ui-disabled:cursor-default 
        ui-disabled:text-[--primary] 
        ui-disabled:opacity-50\`,
    },
    rail: {
      className: \`block absolute w-full h-[4px] rounded-[2px]
        bg-current opacity-40\`,
    },
    track: {
      className: \`block absolute h-[4px] rounded-[2px] bg-current\`,
    },
    thumb: {
      className: \`absolute w-[16px] h-[16px] -ml-[6px] 
        -mt-[6px] box-border rounded-[50%] 
        outline-none [border:3px_solid_currentcolor] 
        bg-[--primary] hover:shadow-[0_0_0_0.25rem_var(--slider-ring)] 
        ui-focus-visible:shadow-[0_0_0_0.25rem_var(--slider-ring)] 
        ui-active:shadow-[0_0_0_0.25rem_var(--slider-ring)]\`,
    },
  }}
/>
<Slider
  disabled
  defaultValue={10}
  slotProps={{
    root: {
      className: \`py-4 px-0 w-full relative 
        cursor-pointer text-[--primary] inline-flex items-center
        touch-action-none tap-highlight-transparent 
        hover:opacity-100 
        ui-disabled:pointer-events-none 
        ui-disabled:cursor-default 
        ui-disabled:opacity-50 
        ui-disabled:cursor-default 
        ui-disabled:text-[--primary] 
        ui-disabled:opacity-50\`,
    },
    rail: {
      className: \`block absolute w-full h-[4px] rounded-[2px]
        bg-current opacity-40\`,
    },
    track: {
      className: \`block absolute h-[4px] rounded-[2px] bg-current\`,
    },
    thumb: {
      className: \`absolute w-[16px] h-[16px] -ml-[6px] 
        -mt-[6px] box-border rounded-[50%] 
        outline-none [border:3px_solid_currentcolor] 
        bg-[--primary] hover:shadow-[0_0_0_0.25rem_var(--slider-ring)] 
        ui-focus-visible:shadow-[0_0_0_0.25rem_var(--slider-ring)] 
        ui-active:shadow-[0_0_0_0.25rem_var(--slider-ring)]\`,
    },
  }}
/>`;
  }
  return '';
};
