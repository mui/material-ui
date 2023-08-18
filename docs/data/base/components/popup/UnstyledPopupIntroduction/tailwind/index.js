import * as React from 'react';
import { Popup } from '@mui/base/Unstable_Popup/Popup';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function SimplePopup() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <button
        className="'cursor-pointer disabled:cursor-not-allowed text-sm font-sans bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded-lg font-semibold px-4 py-2 border-none disabled:opacity-50"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        Toggle Popup
      </button>
      <Popup
        id={id}
        open={open}
        anchor={anchor}
        className={`${isDarkMode ? 'dark' : ''}`}
      >
        <div className=" z-50 rounded-lg font-medium font-sans text-sm mt-2 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-md text-purple-900 dark:text-purple-100">
          The content of the Popup.
        </div>
      </Popup>
    </div>
  );
}
