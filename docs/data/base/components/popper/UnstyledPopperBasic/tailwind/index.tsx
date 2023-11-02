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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <button
        className="cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-violet-500 text-white rounded-lg px-4 py-2 border border-solid border-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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
        <div className=" z-50 rounded-lg font-medium font-sans text-sm m-1 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100">
          The content of the Popper.
        </div>
      </Popper>
    </div>
  );
}
