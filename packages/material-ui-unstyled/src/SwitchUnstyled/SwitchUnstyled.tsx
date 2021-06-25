import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import isPropValid from '@emotion/is-prop-valid';
import useSwitch, { SwitchState, UseSwitchProps } from './useSwitch';
import classes from './switchUnstyledClasses';

export interface SwitchUnstyledProps extends UseSwitchProps {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Thumb?: React.ElementType;
    Input?: React.ElementType;
  };

  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps?: {
    root?: {};
    thumb?: {};
    input?: {};
  };
}

const appendComponentState = (
  component: React.ElementType,
  componentsProps: Record<string, any>,
  state: SwitchState,
) => {
  if (typeof component !== 'string') {
    componentsProps.componentState = state;
  }
};

const getForwardableProps = (targetElement: React.ElementType, props: object) => {
  if (typeof targetElement !== 'string') {
    return props;
  }

  return Object.keys(props)
    .filter(isPropValid)
    .reduce((acc, current) => {
      acc[current] = (props as Record<string, string>)[current];
      return acc;
    }, {} as Record<string, any>);
};

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
  const {
    component,
    components = {},
    componentsProps = {},
    onChange,
    onBlur,
    onFocus,
    onFocusVisible,
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    required,
    readOnly: readOnlyProp,
    ...otherProps
  } = props;

  const Root: React.ElementType = component ?? components.Root ?? 'span';
  const rootProps: any = { ...getForwardableProps(Root, otherProps), ...componentsProps.root };

  const Thumb: React.ElementType = components.Thumb ?? 'span';
  const thumbProps: any = componentsProps.thumb ?? {};

  const Input: React.ElementType = components.Input ?? 'input';
  const inputProps: any = componentsProps.input ?? {};

  const useSwitchProps = {
    onChange,
    onBlur,
    onFocus,
    onFocusVisible,
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    readOnly: readOnlyProp,
  };

  const { getInputProps, checked, disabled, focusVisible, readOnly, pressed } =
    useSwitch(useSwitchProps);

  const componentState: SwitchState = React.useMemo(
    () => ({ checked, disabled, focusVisible, readOnly, pressed }),
    [checked, disabled, focusVisible, readOnly, pressed],
  );

  appendComponentState(Root, rootProps, componentState);
  appendComponentState(Input, inputProps, componentState);
  appendComponentState(Thumb, thumbProps, componentState);

  const stateClasses = {
    [classes.checked]: checked,
    [classes.disabled]: disabled,
    [classes.focusVisible]: focusVisible,
    [classes.readOnly]: readOnly,
    [classes.pressed]: pressed,
  };

  return (
    <Root
      ref={ref}
      {...rootProps}
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
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
} as any;

export default SwitchUnstyled;
