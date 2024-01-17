'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { isFilled, isAdornedStart } from '../InputBase/utils';
import FormControlContext from './FormControlContext';
import { FormControlTypeMap, FormControlOwnerState, FormControlProps } from './FormControl.types';
import { getFormControlUtilityClasses } from './formControlClasses';

const useUtilityClasses = (ownerState: FormControlOwnerState) => {
  const { classes, margin, fullWidth } = ownerState;
  const slots = {
    root: ['root', margin !== 'none' && `margin${capitalize(margin)}`, fullWidth && 'fullWidth'],
  };

  return composeClasses(slots, getFormControlUtilityClasses, classes);
};

const FormControlRoot = styled('div', {
  name: 'MuiFormControl',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => {
    return [
      styles.root,
      styles[`margin${capitalize(ownerState.margin)}`],
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})<{ ownerState: FormControlOwnerState }>(({ ownerState }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: 'top', // Fix alignment issue on Safari.
  ...(ownerState.margin === 'normal' && {
    marginTop: 16,
    marginBottom: 8,
  }),
  ...(ownerState.margin === 'dense' && {
    marginTop: 8,
    marginBottom: 4,
  }),
  ...(ownerState.fullWidth && {
    width: '100%',
  }),
}));

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
 * You can find one composition example below and more going to [the demos](/material-ui/react-text-field/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 */
const FormControl = React.forwardRef(function FormControl<
  RootComponentType extends React.ElementType = FormControlTypeMap['defaultComponent'],
>(inProps: FormControlProps<RootComponentType>, forwardedRef: React.ForwardedRef<any>) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormControl' });
  const {
    children,
    classes: classesProp = {},
    color = 'primary',
    component: componentProp,
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin = 'none',
    required = false,
    size = 'medium',
    slotProps = {},
    slots = {},
    variant = 'outlined',
    ...other
  } = props;

  const [adornedStart, setAdornedStart] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        const input =
          React.isValidElement(child) && isMuiElement(child, ['Select'])
            ? child.props.input
            : child;

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
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        if (
          React.isValidElement(child) &&
          (isFilled(child.props, true) || isFilled(child.props.slotProps?.input, true))
        ) {
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

  let registerEffect: undefined | (() => () => void);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'MUI: There are multiple `InputBase` components inside a FormControl.',
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

  const ownerState = {
    ...props,
    classes: classesProp,
    color,
    component: componentProp,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const childContext = React.useMemo(() => {
    return {
      adornedStart,
      setAdornedStart,
      color,
      disabled,
      error,
      filled,
      focused,
      fullWidth,
      hiddenLabel,
      size,
      onBlur: () => {
        setFocused(false);
      },
      onEmpty: () => {
        setFilled(false);
      },
      onFilled: () => {
        setFilled(true);
      },
      onFocus: () => {
        setFocused(true);
      },
      registerEffect,
      required,
      variant,
    };
  }, [
    adornedStart,
    color,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    registerEffect,
    required,
    size,
    variant,
  ]);

  const Root = slots.root ?? FormControlRoot;
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      as: componentProp,
    },
    ownerState,
    className: classes.root,
  });

  return (
    <FormControlContext.Provider value={childContext}>
      <Root {...rootProps}>{children}</Root>
    </FormControlContext.Provider>
  );
}) as OverridableComponent<FormControlTypeMap>;

FormControl.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside the FormControl.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['filled', 'outlined']),
} as any;

export default FormControl;
