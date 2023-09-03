import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Switch as BaseSwitch } from '@mui/base/Switch';
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

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const Switch = React.forwardRef((props, ref) => {
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
              `relative inline-block w-10 h-6 m-2.5 ${
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
              'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 m-0',
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
              `absolute block w-full h-full rounded-2xl ${
                ownerState.checked
                  ? 'bg-purple-500'
                  : 'bg-slate-400 dark:bg-slate-600'
              }`,
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
              `block w-4 h-4 top-1 ${
                ownerState.checked ? 'left-5' : 'left-1'
              } rounded-2xl ${
                ownerState.focusVisible
                  ? `${
                      ownerState.checked ? 'bg-white' : 'bg-slate-500'
                    } shadow-outline-switch`
                  : 'bg-white'
              } relative transition-all`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

Switch.propTypes = {
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};
