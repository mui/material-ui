import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
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
    <div className={`${isDarkMode ? 'dark' : undefined}`}>
      <button
        className="cursor-pointer rounded-lg border border-solid border-violet-500 bg-violet-500 px-4 py-2 font-sans text-sm font-semibold leading-normal text-white shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] transition hover:bg-violet-600 focus-visible:shadow-[0_0_0_4px_#ddd6fe] focus-visible:outline-none active:bg-violet-700 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa]"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        Toggle Popup
      </button>
      <BasePopup
        id={id}
        open={open}
        anchor={anchor}
        disablePortal
        className="z-50 mt-2 rounded-lg border border-solid border-slate-200 bg-white p-3 font-sans text-sm font-medium text-slate-900 shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        <div>The content of the Popup.</div>
      </BasePopup>
    </div>
  );
}
