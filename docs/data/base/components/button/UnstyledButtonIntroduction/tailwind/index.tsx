import * as React from 'react';
import { Button as BaseButton, ButtonProps } from '@mui/base/Button';
import clsx from 'clsx';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledButtonsIntroduction() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={`${isDarkMode ? 'dark' : undefined}`}>
      <div
        style={{
          display: 'flex',
          gap: 16,
        }}
      >
        <CustomButton>Button</CustomButton>
        <CustomButton disabled>Disabled</CustomButton>
      </div>
    </div>
  );
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseButton
        ref={ref}
        className={clsx(
          'transition text-sm font-sans font-semibold leading-none h-10 shrink-0 select-none align-middle inline-flex items-center justify-center bg-clip-padding box-border bg-violet-500 text-white rounded-lg px-4 border border-solid border-violet-500 shadow-[0_1px_2px_rgb(60_86_118_/_0.2),0_2px_4px_rgb(60_86_118_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_1px_2px_rgb(0_0_0/_0.15),0_2px_4px_rgb(0_0_0/_0.15),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none ui-disabled:text-slate-700 ui-disabled:dark:text-slate-200 ui-disabled:bg-slate-200 ui-disabled:dark:bg-slate-700 ui-disabled:cursor-default ui-disabled:shadow-none ui-disabled:dark:shadow-none ui-disabled:hover:bg-slate-200 ui-disabled:hover:dark:bg-slate-700 ui-disabled:border-none',
          className,
        )}
        {...other}
      />
    );
  },
);
