import * as React from 'react';
import { useTheme } from '@mui/system';
import { Slider } from '@mui/base/Slider';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSliderBasic() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ width: 300 }}>
      <Slider
        slotProps={{
          root: ({ disabled }) => ({
            className: `h-1.5 w-full py-4 inline-block relative touch-none ${
              disabled
                ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
            }`,
          }),
          rail: {
            className: 'block absolute w-full h-1 rounded-sm bg-current opacity-40',
          },
          track: { className: 'block absolute h-1 rounded-sm bg-current' },
          thumb: (_, { active, focused }) => ({
            className: `absolute w-4 h-4 -ml-1.5 -mt-1.5 box-border rounded-full outline-0 border-3 border-solid border-current bg-white hover:shadow-outline-purple ${
              focused || active ? 'shadow-outline-purple' : ''
            }`,
          }),
        }}
        defaultValue={10}
      />
      <Slider
        slotProps={{
          root: ({ disabled }) => ({
            className: `h-1.5 w-full py-4 inline-block relative touch-none ${
              disabled
                ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
            }`,
          }),
          rail: {
            className: 'block absolute w-full h-1 rounded-sm bg-current opacity-40',
          },
          track: { className: 'block absolute h-1 rounded-sm bg-current' },
          thumb: (_, { active, focused }) => ({
            className: `absolute w-4 h-4 -ml-1.5 -mt-1.5 box-border rounded-full outline-0 border-3 border-solid border-current bg-white hover:shadow-outline-purple ${
              focused || active ? 'shadow-outline-purple' : ''
            }`,
          }),
        }}
        defaultValue={10}
        disabled
      />
    </div>
  );
}
