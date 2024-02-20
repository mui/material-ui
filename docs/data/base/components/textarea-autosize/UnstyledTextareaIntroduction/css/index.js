import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/system';

export default function UnstyledTextareaIntroduction() {
  return (
    <React.Fragment>
      <TextareaAutosize
        className="CustomTextareaIntrocudtion"
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
    <style>
      {`
      .CustomTextareaIntrocudtion {
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 24px ${isDarkMode ? cyan[900] : cyan[100]};
      }

     .CustomTextareaIntrocudtion:hover {
        border-color: ${cyan[400]};
      }

     .CustomTextareaIntrocudtion:focus {
        border-color: ${cyan[400]};
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[600] : cyan[200]};
        outline: none;
      }

      // firefox
      .CustomTextareaIntrocudtion:focus-visible {
        outline: 0;
      }
    `}
    </style>
  );
}
