import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_isMuiElement as isMuiElement } from '@material-ui/utils';
import composeClasses from '../composeClasses';
import FormControlContext from './FormControlContext';
import { getFormControlUnstyledUtilityClasses } from './formControlUnstyledClasses';
import { FormControlUnstyledProps } from './FormControlUnstyledProps';
import appendStyleProps from '../utils/appendStyleProps';
import { FormControlState } from './FormControlState';

// TODO: Move the next 3 functions to a separate module

function hasValue(value: any) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is empty or filled.
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
function isFilled(obj: any, SSR = false) {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== '') ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}

// Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.
function isAdornedStart(obj: any) {
  return obj.startAdornment;
}

const useUtilityClasses = (styleProps: FormControlUnstyledProps) => {
  const { classes, disabled } = styleProps;
  const slots = {
    root: ['root', disabled && 'disabled'],
  };

  return composeClasses(slots, getFormControlUnstyledUtilityClasses, classes);
};

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * You can find one composition example below and more going to [the demos](/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it create visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 */
const FormControl = React.forwardRef(function FormControl(
  props: FormControlUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled = false,
    error = false,
    extraContextProperties = {},
    focused: visuallyFocused,
    hiddenLabel = false,
    required = false,
    ...other
  } = props;

  const styleProps: FormControlUnstyledProps = {
    ...props,
    disabled,
    error,
    hiddenLabel,
    required,
  };

  const classes = useUtilityClasses(styleProps);

  const [adornedStart, setAdornedStart] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, (child: any) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        const input = isMuiElement(child, ['Select']) ? child.props.input : child;

        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });

  const [filled, setFilled] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, (child: any) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });

  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;

  let registerEffect = () => {};
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'Material-UI: There are multiple `InputBase` components inside a FormControl.',
            'This creates visual inconsistencies, only use one `InputBase`.',
          ].join('\n'),
        );
      }

      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }

  const onFilled = React.useCallback(() => {
    setFilled(true);
  }, []);

  const onEmpty = React.useCallback(() => {
    setFilled(false);
  }, []);

  const childContext: FormControlState = {
    adornedStart,
    setAdornedStart,
    disabled,
    error,
    filled,
    focused,
    hiddenLabel,
    onBlur: () => {
      setFocused(false);
    },
    onEmpty,
    onFilled,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    ...extraContextProperties,
  };

  const Root = component ?? components.Root ?? 'div';
  const rootProps: any = { ...other, ...componentsProps.root };

  appendStyleProps(Root, rootProps, styleProps);

  return (
    <FormControlContext.Provider value={childContext}>
      <Root
        className={clsx(classes.root, className, rootProps?.className)}
        ref={ref}
        {...rootProps}
      >
        {children}
      </Root>
    </FormControlContext.Provider>
  );
});

FormControl.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.object.isRequired,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
} as any;

export default FormControl;
