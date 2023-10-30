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

export default function UnstyledButtonsSimple() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={`${isDarkMode ? 'dark' : undefined}`}>
      <Stack spacing={2} direction="row">
        <CustomButton className="hover:bg-violet-600 active:bg-violet-700">
          Button
        </CustomButton>
        <CustomButton slots={{ root: 'span' }} disabled>
          Disabled
        </CustomButton>
      </Stack>
    </div>
  );
}

const CustomButton = React.forwardRef((props, ref) => {
  const { className, disabled, ...other } = props;
  return (
    <BaseButton
      ref={ref}
      className={clsx(
        'cursor-pointer transition text-sm font-sans font-semibold leading-normal rounded-lg px-4 py-2 border border-solid border-violet-500  hover:bg-violet-600 active:bg-violet-700 active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none',
        !disabled &&
          'text-white bg-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed]',
        disabled &&
          'text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 cursor-not-allowed shadow-none hover:bg-slate-200 hover:dark:bg-slate-700 border-none',
        className,
      )}
      disabled={disabled}
      {...other}
    />
  );
});

CustomButton.propTypes = {
  className: PropTypes.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
};
