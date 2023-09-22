import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function SimplePopper() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <button
        className="cursor-pointer text-sm font-sans box-border rounded-lg font-semibold px-4 py-2 leading-normal bg-transparent border border-solid border-slate-300 dark:border-slate-700 text-purple-600 dark:text-purple-300 hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-300 focus-visible:border-purple-500 focus-visible:hover:border-purple-500 focus-visible:dark:hover:border-purple-500 focus-visible:outline-0 focus-visible:shadow-outline-purple"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        Toggle Popper
      </button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={`${isDarkMode ? 'dark' : ''}`}
      >
        <div className=" z-50 rounded-lg font-medium font-sans text-sm m-1 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-md text-purple-900 dark:text-purple-100">
          The content of the Popper.
        </div>
      </Popper>
    </div>
  );
}
