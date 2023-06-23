import * as React from 'react';
import Input from '@mui/base/Input';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledInputBasic() {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <Input
      className={isDarkMode ? 'dark' : ''}
      slotProps={{
        input: {
          className:
            'w-80 text-sm font-normal leading-5 p-3 rounded-xl shadow shadow-slate-50 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-500 hover:border-purple-400 dark:hover:border-purple-400 focus:border-purple-400 dark:focus:border-purple-500 dark:border-slate-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0',
        },
      }}
      aria-label="Demo input"
      placeholder="Type something…"
    />
  );
}
