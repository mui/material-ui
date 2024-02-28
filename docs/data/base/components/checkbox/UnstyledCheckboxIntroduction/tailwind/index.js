import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Checkbox as BaseCheckbox } from '@mui/base/Checkbox';
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

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const Checkbox = React.forwardRef((props, ref) => {
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
              'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 border-none',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

Checkbox.propTypes = {
  /**
   * The props used for each slot inside the Checkbox.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};
