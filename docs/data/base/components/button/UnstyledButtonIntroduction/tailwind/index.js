import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton } from '@mui/base/Button';
import Stack from '@mui/material/Stack';
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
      <Stack spacing={2} direction="row">
        <CustomButton>Button</CustomButton>
        <CustomButton disabled>Disabled</CustomButton>
      </Stack>
    </div>
  );
}

const CustomButton = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseButton
      ref={ref}
      className={clsx(
        'ui-disabled:text-slate-700 ui-disabled:dark:text-slate-200 ui-disabled:bg-slate-200 ui-disabled:dark:bg-slate-700 ui-disabled:cursor-default ui-disabled:shadow-none ui-disabled:dark:shadow-none ui-disabled:hover:bg-slate-200 ui-disabled:hover:dark:bg-slate-700 ui-disabled:border-none cursor-pointer rounded-lg border border-solid border-violet-500 bg-violet-500 px-4 py-2 font-sans text-sm font-semibold leading-normal text-white shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] transition hover:bg-violet-600 focus-visible:shadow-[0_0_0_4px_#ddd6fe] focus-visible:outline-none active:scale-[0.99] active:bg-violet-700 active:shadow-none dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa]',
        className,
      )}
      {...other}
    />
  );
});

CustomButton.propTypes = {
  className: PropTypes.string,
};
