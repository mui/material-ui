import * as React from 'react';
import { Switch as BaseSwitch } from '@mui/base/Switch';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSwitchIntroduction() {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Switch aria-label="Demo switch" defaultChecked />
      <Switch aria-label="Demo switch" />
      <Switch aria-label="Demo switch" defaultChecked disabled />
      <Switch aria-label="Demo switch" disabled />
    </div>
  );
}

interface SwitchProps {
  'aria-label'?: string;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  readOnly?: boolean;
}
const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>((props, ref) => {
  const { 'aria-label': ariaLabel, ...other } = props;
  return (
    <BaseSwitch
      ref={ref}
      {...other}
      slotProps={{
        root: {
          className:
            'relative inline-block w-[38px] h-[24px] m-2.5 ui-disabled:cursor-not-allowed ui-disabled:opacity-40 cursor-pointer',
        },
        input: {
          'aria-label': ariaLabel,
          className:
            'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 border-none',
        },
        track: {
          className:
            'absolute block w-full h-full transition rounded-full border border-solid outline-none border-slate-300 dark:border-gray-700 shadow-[inset_0_1_1_rgb(0_0_0_/_0.05)] dark:shadow-[inset_0_1_1_rgb(0_0_0_/_0.5)] focus:shadow-purple-200 dark:focus:shadow-purple-600 ui-checked:bg-purple-500 ui-checked:border-none bg-slate-100 dark:ui-not-checked:bg-slate-900 hover:ui-not-checked:bg-slate-200 dark:hover:ui-not-checked:bg-slate-800',
        },
        thumb: {
          className:
            'block w-4 h-4 top-1 rounded-2xl border border-solid outline-none border-slate-300 dark:border-gray-700 transition shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:shadow-[0_1px_2px_rgb(0_0_0_/_0.25)] ui-checked:left-[18px] ui-checked:bg-white ui-checked:border-none ui-checked:shadow-[0_0_0_rgb(0_0_0_/_0.3)] ui-not-checked:left-[4px] relative transition-all',
        },
      }}
    />
  );
});
