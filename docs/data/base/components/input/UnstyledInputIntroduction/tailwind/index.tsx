import * as React from 'react';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import { useTheme } from '@mui/system';
import clsx from 'clsx';

export default function UnstyledInputIntroduction() {
  return <Input aria-label="Demo input" placeholder="Type something…" />;
}

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <BaseInput
      ref={ref}
      {...props}
      className={clsx(isDarkMode ? 'dark' : '', props.className)}
      slotProps={{
        ...props.slotProps,
        input: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'w-80 text-sm font-normal font-sans leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple dark:outline-purple-600 focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-600 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});
