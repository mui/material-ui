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
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div className={`${isDarkMode ? 'dark' : undefined}`}>
      <button
        className="cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-violet-500 text-white rounded-lg px-4 py-2 border border-solid border-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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
        className="z-50 rounded-lg font-sans font-medium text-sm mt-2 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100"
      >
        <div>The content of the Popup.</div>
      </BasePopup>
    </div>
  );
}
