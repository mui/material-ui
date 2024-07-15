import * as React from 'react';
import { Button } from '@mui/base/Button';
import { useTheme } from '@mui/system';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsIntroduction() {
  return (
    <React.Fragment>
      <Stack spacing={2} direction="row">
        <Button className="IntroductionButton">Button</Button>
        <Button className="IntroductionButton" disabled>
          Disabled
        </Button>
      </Stack>
      <Styles />
    </React.Fragment>
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
  .IntroductionButton {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${cyan[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${cyan[500]};
    box-shadow: 0 2px 1px ${
      isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${cyan[400]}, inset 0 -2px 1px ${cyan[600]};
  }
  .IntroductionButton:hover {
    background-color: ${cyan[600]};
  }
  .IntroductionButton.base--active {
    background-color: ${cyan[700]};
    box-shadow: none;
    transform: scale(0.99);
  }
  .IntroductionButton.base--focusVisible {
    box-shadow: 0 0 0 4px ${isDarkMode ? cyan[300] : cyan[200]};
    outline: none;
  }
  .IntroductionButton.base--disabled {
    background-color: ${isDarkMode ? grey[700] : grey[200]};
    color: ${isDarkMode ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `}</style>
  );
}
