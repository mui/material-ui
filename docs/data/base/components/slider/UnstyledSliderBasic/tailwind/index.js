import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@mui/system';
import Slider from '@mui/base/Slider';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

const Thumb = React.forwardRef(function Thumb(props, ref) {
  const { ownerState, className, ...other } = props;
  const focusVisible = props['data-index'] === ownerState.focusedThumbIndex;
  const active = props['data-index'] === ownerState.activeThumbIndex;
  return (
    <span
      ref={ref}
      className={clsx(
        `absolute w-4 h-4 -ml-1.5 -mt-1.5 box-border rounded-full outline-0 border-3 border-solid border-current bg-white hover:shadow-outline-purple ${
          focusVisible || active ? 'shadow-outline-purple' : ''
        }`,
        className,
      )}
      {...other}
    />
  );
});

Thumb.propTypes = {
  className: PropTypes.string,
  ownerState: PropTypes.shape({
    activeThumbIndex: PropTypes.number.isRequired,
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-valuetext': PropTypes.string,
    defaultValue: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
    ]),
    disabled: PropTypes.bool.isRequired,
    disableSwap: PropTypes.bool,
    dragging: PropTypes.bool.isRequired,
    focusedThumbIndex: PropTypes.number.isRequired,
    getAriaLabel: PropTypes.func,
    getAriaValueText: PropTypes.func,
    isRtl: PropTypes.bool.isRequired,
    marked: PropTypes.bool.isRequired,
    marks: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.number.isRequired,
        }),
      ),
      PropTypes.bool,
    ]),
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onChangeCommitted: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    rootRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        current: function (props, propName) {
          if (props[propName] == null) {
            return null;
          } else if (
            typeof props[propName] !== 'object' ||
            props[propName].nodeType !== 1
          ) {
            return new Error(
              "Expected prop '" + propName + "' to be of type Element",
            );
          }
        },
      }),
    ]),
    scale: PropTypes.func.isRequired,
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
    slots: PropTypes.shape({
      input: PropTypes.elementType,
      mark: PropTypes.elementType,
      markLabel: PropTypes.elementType,
      rail: PropTypes.elementType,
      root: PropTypes.elementType,
      thumb: PropTypes.elementType,
      track: PropTypes.elementType,
      valueLabel: PropTypes.elementType,
    }),
    step: PropTypes.number,
    tabIndex: PropTypes.number,
    track: PropTypes.oneOf(['inverted', 'normal', false]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
    ]),
    valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
      .isRequired,
  }).isRequired,
};

export default function UnstyledSliderBasic() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ width: 300 }}>
      <Slider
        slotProps={{
          root: ({ disabled }) => ({
            className: `h-1.5 w-full py-4 inline-block relative touch-none ${
              disabled
                ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
            }`,
          }),
          rail: {
            className: 'block absolute w-full h-1 rounded-sm bg-current opacity-40',
          },
          track: { className: 'block absolute h-1 rounded-sm bg-current' },
        }}
        slots={{
          thumb: Thumb,
        }}
        defaultValue={10}
      />
      <Slider
        slotProps={{
          root: ({ disabled }) => ({
            className: `h-1.5 w-full py-4 inline-block relative touch-none ${
              disabled
                ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
            }`,
          }),
          rail: {
            className: 'block absolute w-full h-1 rounded-sm bg-current opacity-40',
          },
          track: { className: 'block absolute h-1 rounded-sm bg-current' },
        }}
        slots={{
          thumb: Thumb,
        }}
        defaultValue={10}
        disabled
      />
    </div>
  );
}
