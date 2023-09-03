import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { useTheme } from '@mui/system';

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <React.Fragment>
      <button
        type="button"
        aria-describedby={id}
        className="Button"
        onClick={handleClick}
      >
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className="CustomPopper">The content of the Popper.</div>
      </Popper>
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
    <style>{`

      .Button {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 8px 16px;
        line-height: 1.5;
        background: transparent;
        cursor: pointer;
        border: 1px solid ${isDarkMode ? grey[800] : grey[200]};
        color: ${isDarkMode ? cyan[300] : cyan[400]};
  
        &:hover {
          background: ${isDarkMode ? grey[900] : grey[100]};
          border-color: ${isDarkMode ? cyan[200] : cyan[400]};
        }
  
        &:focus-visible {
          border-color: ${cyan[400]};
          outline: 3px solid ${isDarkMode ? cyan[500] : cyan[200]};
        }
      }

      .CustomPopper{
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
        margin: 0.25rem 0px;
      }
  `}</style>
  );
}
