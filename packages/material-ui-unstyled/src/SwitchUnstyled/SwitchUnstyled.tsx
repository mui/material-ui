import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useSwitch, { UseSwitchProps } from './useSwitch';
import classes from './switchUnstyledClasses';

export interface SwitchUnstyledProps extends UseSwitchProps {
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Thumb?: React.ElementType;
    Input?: React.ElementType;
  };

  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps?: {
    root?: {};
    thumb?: {};
    input?: {};
  };
}

/**
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [SwitchUnstyled API](https://material-ui.com/api/switch-unstyled/)
 */
const SwitchUnstyled = React.forwardRef(function SwitchUnstyled(
  props: SwitchUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const { components = {}, componentsProps = {}, ...otherProps } = props;

  const Root: React.ElementType = components.Root ?? 'span';
  const rootProps: any = componentsProps.root ?? {};

  const Thumb: React.ElementType = components.Thumb ?? 'span';
  const thumbProps: any = componentsProps.thumb ?? {};

  const Input: React.ElementType = components.Input ?? 'input';
  const inputProps: any = componentsProps.input ?? {};

  const { getInputProps, getRootProps, isChecked, isDisabled, hasVisibleFocus } = useSwitch({
    ...otherProps,
  });

  const stateClasses = {
    [classes.checked]: isChecked,
    [classes.disabled]: isDisabled,
    [classes.focusVisible]: hasVisibleFocus,
  };

  // Touching the `stateClasses` object before passing it to `clsx` makes the babel-plugin-optimize-clsx
  // produce valid output. Without it, the regression tests break.
  // eslint-disable-next-line no-empty
  if (stateClasses) {
  }

  return (
    <Root
      ref={ref}
      {...getRootProps({ ...otherProps, ...rootProps })}
      className={clsx(classes.root, stateClasses, rootProps?.className)}
    >
      <Thumb {...thumbProps} className={clsx(classes.thumb, thumbProps?.className)} />
      <Input
        type="checkbox"
        {...getInputProps(inputProps)}
        className={clsx(classes.input, inputProps?.className)}
      />
    </Root>
  );
});

SwitchUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: PropTypes.object,
} as any;

export default SwitchUnstyled;
