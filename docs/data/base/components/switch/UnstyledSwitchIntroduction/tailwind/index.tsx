import * as React from 'react';
import clsx from 'clsx';
import { Switch as BaseSwitch, SwitchProps } from '@mui/base/Switch';
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
      <Switch slotProps={{ input: { ...label } }} defaultChecked />
      <Switch slotProps={{ input: { ...label } }} />
      <Switch slotProps={{ input: { ...label } }} defaultChecked disabled />
      <Switch slotProps={{ input: { ...label } }} disabled />
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>((props, ref) => {
  return (
    <BaseSwitch
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `group relative inline-block w-[38px] h-[24px] m-2.5 ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-40'
                  : 'cursor-pointer'
              }`,
              resolvedSlotProps?.className,
            ),
          };
        },
        input: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 border-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        track: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.track,
            ownerState,
          );

          return {
            ...resolvedSlotProps,
            className: clsx(
              `absolute block w-full h-full transition rounded-full border border-solid outline-none border-slate-300 dark:border-gray-700 group-[.base--focusVisible]:shadow-outline-switch
              ${
                ownerState.checked
                  ? 'bg-purple-500'
                  : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800'
              } `,
              resolvedSlotProps?.className,
            ),
          };
        },
        thumb: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.thumb,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `block w-4 h-4 top-1 rounded-2xl border border-solid outline-none border-slate-300 dark:border-gray-700 transition shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:shadow-[0_1px_2px_rgb(0_0_0_/_0.25)] ${
                ownerState.checked
                  ? 'left-[18px] bg-white shadow-[0_0_0_rgb(0_0_0_/_0.3)]'
                  : 'left-[4px] bg-white'
              }  relative transition-all`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});
