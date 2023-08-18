import * as React from 'react';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { useTheme } from '@mui/system';

export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <React.Fragment>
      <button
        type="button"
        aria-describedby={id}
        className="Button"
        onClick={handleClick}
      >
        Toggle Popup
      </button>
      <Popup id={id} open={open} anchor={anchor}>
        <div className="CustomPopup">The content of the Popup.</div>
      </Popup>
      <Styles />
    </React.Fragment>
  );
}

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  500: '#6e7781',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

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
        .Button {
            font-family: IBM Plex Sans,sans-serif;
            font-weight: 600;
            font-size: 0.875rem;
            line-height: 1.5;
            background-color: ${cyan[500]};
            padding: 8px 16px;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            border: none;
      
            &:hover {
                background-color: ${cyan[600]};
            }
          }
  
        .CustomPopup{
            background-color: ${isDarkMode ? grey[900] : grey[50]};
          border-radius: 8px;
          border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
          box-shadow: ${
            isDarkMode ? `0 4px 8px rgb(0 0 0 / 0.7)` : `0 4px 8px rgb(0 0 0 / 0.1)`
          };
          padding: 0.75rem;
          color: ${isDarkMode ? cyan[100] : cyan[700]};
          font-size: 0.875rem;
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 500;
          opacity: 1;
          margin: 0.5rem 0px;
        }
    `}</style>
  );
}
