import * as React from 'react';
import { Switch } from '@mui/base/Switch';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSwitchIntroduction() {
  const label = { 'aria-label': 'Demo switch' };

  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Switch
        slotProps={{
          root: ({ disabled }) => ({
            className: `relative inline-block w-10 h-6 m-2.5 ${
              disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            }`,
          }),
          input: {
            ...label,
            className:
              'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
          },
          track: ({ checked }) => ({
            className: `absolute block w-full h-full rounded-2xl ${
              checked ? 'bg-purple-500' : 'bg-slate-400 dark:bg-slate-600'
            }`,
          }),
          thumb: ({ checked, focusVisible }) => ({
            className: `block w-4 h-4 top-1 ${
              checked ? 'left-5' : 'left-1'
            } rounded-2xl ${
              focusVisible
                ? `${checked ? 'bg-white' : 'bg-slate-500'} shadow-outline-switch`
                : 'bg-white'
            } relative transition-all`,
          }),
        }}
        defaultChecked
      />
      <Switch
        slotProps={{
          root: ({ disabled }) => ({
            className: `relative inline-block w-10 h-6 m-2.5 ${
              disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            }`,
          }),
          input: {
            ...label,
            className:
              'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
          },
          track: ({ checked }) => ({
            className: `absolute block w-full h-full rounded-2xl ${
              checked ? 'bg-purple-500' : 'bg-slate-400 dark:bg-slate-600'
            }`,
          }),
          thumb: ({ checked, focusVisible }) => ({
            className: `block w-4 h-4 top-1 ${
              checked ? 'left-5' : 'left-1'
            } rounded-2xl ${
              focusVisible
                ? `${checked ? 'bg-white' : 'bg-slate-500'} shadow-outline-switch`
                : 'bg-white'
            } relative transition-all`,
          }),
        }}
      />
      <Switch
        slotProps={{
          root: ({ disabled }) => ({
            className: `relative inline-block w-10 h-6 m-2.5 ${
              disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            }`,
          }),
          input: {
            ...label,
            className:
              'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
          },
          track: ({ checked }) => ({
            className: `absolute block w-full h-full rounded-2xl ${
              checked ? 'bg-purple-500' : 'bg-slate-400 dark:bg-slate-600'
            }`,
          }),
          thumb: ({ checked, focusVisible }) => ({
            className: `block w-4 h-4 top-1 ${
              checked ? 'left-5' : 'left-1'
            } rounded-2xl ${
              focusVisible ? 'bg-slate-500 shadow-outline-switch' : 'bg-white'
            } relative transition-all`,
          }),
        }}
        defaultChecked
        disabled
      />
      <Switch
        slotProps={{
          root: ({ disabled }) => ({
            className: `relative inline-block w-10 h-6 m-2.5 ${
              disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            }`,
          }),
          input: {
            ...label,
            className:
              'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
          },
          track: ({ checked }) => ({
            className: `absolute block w-full h-full rounded-2xl ${
              checked ? 'bg-purple-500' : 'bg-slate-400 dark:bg-slate-600'
            }`,
          }),
          thumb: ({ checked, focusVisible }) => ({
            className: `block w-4 h-4 top-1 ${
              checked ? 'left-5' : 'left-1'
            } rounded-2xl ${
              focusVisible ? 'bg-slate-500 shadow-outline-switch' : 'bg-white'
            } relative transition-all`,
          }),
        }}
        disabled
      />
    </div>
  );
}
