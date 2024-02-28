import * as React from 'react';
import clsx from 'clsx';
import { Checkbox as BaseCheckbox, CheckboxProps } from '@mui/base/Checkbox';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledCheckboxIntroduction() {
  const label = { 'aria-label': 'Demo checkbox' };

  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Checkbox slotProps={{ input: { ...label } }} defaultChecked />
      <Checkbox slotProps={{ input: { ...label } }} />
      <Checkbox slotProps={{ input: { ...label } }} defaultChecked disabled />
      <Checkbox slotProps={{ input: { ...label } }} disabled />
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Checkbox = React.forwardRef<HTMLSpanElement, CheckboxProps>((props, ref) => {
  return (
    <BaseCheckbox
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
              'w-5 h-5 accent-purple-500 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 focus-visible:outline-0',

              // from input styles
              // leading-5
              // px-3
              // py-2

              // from checkbox example styles
              // text-blue-600
              // bg-gray-100
              // border-gray-300
              // rounded
              // focus:ring-blue-500
              // dark:focus:ring-blue-600
              // dark:ring-offset-gray-800
              // focus:ring-2
              // dark:bg-gray-700
              // dark:border-gray-600

              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});
