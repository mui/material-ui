import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/system';

export default function UnstyledTextareaAutosize() {
  return (
    <React.Fragment>
      <TextareaAutosize
        className="CustomTextarea"
        aria-label="empty textarea"
        placeholder="Empty"
      />
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

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .CustomTextarea {
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${isDarkMode ? grey[900] : grey[50]};
      }

     .CustomTextarea:hover {
        border-color: ${cyan[400]};
      }

     .CustomTextarea:focus {
        border-color: ${cyan[400]};
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
        outline: none;
      }
      
      // firefox
      .CustomTextarea:focus-visible {
      outline: 0;
      }
    `}
    </style>
  );
}
