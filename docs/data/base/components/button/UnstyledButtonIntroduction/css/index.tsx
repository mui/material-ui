import * as React from 'react';
import { Button, buttonClasses } from '@mui/base/Button';
import { useTheme } from '@mui/system';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsIntroduction() {
  return (
    <React.Fragment>
      <Stack spacing={2} direction="row">
        <Button className="CustomButton">Button</Button>
        <Button className="CustomButton" disabled>
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

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>{`
  .CustomButton {
    font-family: IBM Plex Sans,sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${cyan[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    border: 1px solid ${cyan[600]};
    box-shadow: 0px 2px 6px ${
      isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'
    }, inset 0px 1px 1px ${cyan[400]}, inset 0px -1px 1px ${cyan[700]} ;
  
  }
  .CustomButton:hover {
    background-color: ${cyan[600]};
  }
  .${buttonClasses.active} {
    background-color: ${cyan[700]};
  }
  .${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
  `}</style>
  );
}
