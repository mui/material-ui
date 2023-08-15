import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/system';
import { Slider } from '@mui/base/Slider';
import clsx from 'clsx';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSliderIntroduction() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ width: 320 }}>
      <CustomSlider defaultValue={50} />
      <CustomSlider defaultValue={10} disabled />
    </div>
  );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const CustomSlider = React.forwardRef((props, ref) => {
  return (
    <Slider
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
              `h-1.5 w-full py-4 inline-block relative touch-none ${
                ownerState.disabled
                  ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                  : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
              }`,
              resolvedSlotProps?.className,
            ),
          };
        },
        rail: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.rail,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'block absolute w-full h-1 rounded-sm bg-current opacity-40',
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
              'block absolute h-1 rounded-sm bg-current',
              resolvedSlotProps?.className,
            ),
          };
        },
        thumb: (ownerState, { active, focused }) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.thumb,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `absolute w-4 h-4 -ml-1.5 -mt-1.5 box-border rounded-full outline-0 border-3 border-solid border-current bg-white hover:shadow-outline-purple ${
                focused || active ? 'shadow-outline-purple' : ''
              }`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

CustomSlider.propTypes = {
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mark: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    markLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rail: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    valueLabel: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
  }),
};
