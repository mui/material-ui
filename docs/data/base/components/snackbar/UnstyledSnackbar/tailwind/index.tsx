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
        className="box-border cursor-pointer rounded-lg border border-solid border-slate-200 bg-white px-4 py-2 font-sans text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50 focus-visible:shadow-[0_0_0_4px_#ddd6fe] focus-visible:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 hover:dark:bg-slate-800 dark:focus-visible:shadow-[0_0_0_4px_#a78bfa]"
        type="button"
        onClick={handleOpen}
      >
        Open snackbar
      </button>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <div
            className="animation-appear min-w-snackbar max-w-snackbar fixed bottom-4 left-auto right-4 z-50 flex justify-start rounded-lg border border-solid border-slate-200 bg-white p-3 font-sans font-semibold text-purple-900 shadow-md transition-transform dark:border-slate-700 dark:bg-slate-900 dark:text-purple-100"
            {...getRootProps()}
          >
            Hello World
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}
