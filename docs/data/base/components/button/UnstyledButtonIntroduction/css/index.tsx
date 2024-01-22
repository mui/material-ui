import * as React from 'react';
import { Button } from '@mui/base/Button';
import { useTheme } from '@mui/system';

export default function UnstyledButtonsIntroduction() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
      }}
    >
      <Button className="Button">Button</Button>
      <Button className="Button" disabled>
        Disabled
      </Button>
      <Styles />
    </div>
  );
}

const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>{`
      .Button {
        all: unset;
        align-items: center;
        background-clip: padding-box;
        background-color: ${cyan[500]};
        border-color: ${cyan[500]};
        border-radius: .5rem;
        border-style: solid;
        border-width: .063rem;
        box-shadow: 0 1px 2px ${
          isDarkMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(60, 86, 118, 0.2)'
        }, 0 2px 3px ${
      isDarkMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(60, 86, 118, 0.2)'
    }, inset 0 1.5px 1px ${cyan[400]}, inset 0 -2px 1px ${cyan[600]};
        box-sizing: border-box;
        color: white;
        display: inline-flex;
        flex-shrink: 0;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: .875rem;
        font-weight: 600;
        height: 2.5rem;
        justify-content: center;
        line-height: 1;
        padding-left: 1rem;
        padding-right: 1rem;
        user-select: none;
        vertical-align: middle;
      }
      @media (prefers-reduced-motion: no-preference) {
        .Button {
          transition-duration: 150ms;
          transition-property: background-color, box-shadow;
          transition-timing-function: ease;
        }
      }
      @media (any-hover: hover) {
        .Button:hover {
          background-color: ${cyan[600]};
        }
      }
      .Button.base--active {
        background-color: ${cyan[700]};
        box-shadow: none;
      }
      .Button.base--focusVisible {
        outline-width: 2px;
        outline-style: solid;
        outline-color: ${isDarkMode ? cyan[300] : cyan[200]};
        outline-offset: 2px;
      }
      .Button.base--disabled {
        background-color: ${isDarkMode ? grey[700] : grey[200]};
        border: none;
        box-shadow: none;
        color: ${isDarkMode ? grey[200] : grey[700]};
        cursor: not-allowed;
      }
  `}</style>
  );
}
