import * as React from 'react';
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UseSnackbar() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 5000,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <button
        className="cursor-pointer font-sans text-sm box-border rounded-lg font-semibold px-4 py-2 leading-normal bg-transparent border border-solid border-slate-300 dark:border-slate-700 text-purple-600 dark:text-purple-300 hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-300 focus-visible:border-purple-500 focus-visible:hover:border-purple-500 focus-visible:dark:hover:border-purple-500 focus-visible:outline-0 focus-visible:shadow-outline-purple"
        type="button"
        onClick={handleOpen}
      >
        Open snackbar
      </button>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <div
            className="fixed z-50 font-sans flex right-4 bottom-4 left-auto justify-start rounded-lg font-semibold bg-slate-50 dark:bg-slate-900 p-3 animation-appear transition-transform border border-solid border-slate-200 dark:border-slate-700 min-w-snackbar max-w-snackbar shadow-md text-purple-900 dark:text-purple-100"
            {...getRootProps()}
          >
            Hello World
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}
