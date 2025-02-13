'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useButton } from '@mui/base/useButton';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { Interpolation } from '@mui/system';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { styled, Theme, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import CircularProgress from '../CircularProgress';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import { ButtonOwnerState, ButtonTypeMap, ExtendButton } from './ButtonProps';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import ToggleButtonGroupContext from '../ToggleButtonGroup/ToggleButtonGroupContext';

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
  const {
    color,
    disabled,
    focusVisible,
    focusVisibleClassName,
    fullWidth,
    size,
    variant,
    loading,
  } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      loading && 'loading',
    ],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
    loadingIndicatorCenter: ['loadingIndicatorCenter'],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ButtonStartDecorator = styled('span', {
  name: 'JoyButton',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: ButtonOwnerState }>({
  '--Icon-margin': '0 0 0 calc(var(--Button-gap) / -2)',
  '--CircularProgress-margin': '0 0 0 calc(var(--Button-gap) / -2)',
  display: 'inherit',
  marginRight: 'var(--Button-gap)',
});

const ButtonEndDecorator = styled('span', {
  name: 'JoyButton',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: ButtonOwnerState }>({
  '--Icon-margin': '0 calc(var(--Button-gap) / -2) 0 0',
  '--CircularProgress-margin': '0 calc(var(--Button-gap) / -2) 0 0',
  display: 'inherit',
  marginLeft: 'var(--Button-gap)',
});

const ButtonLoadingCenter = styled('span', {
  name: 'JoyButton',
  slot: 'LoadingCenter',
  overridesResolver: (props, styles) => styles.loadingIndicatorCenter,
})<{ ownerState: ButtonOwnerState }>(({ theme, ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
  ...(ownerState.disabled && {
    color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
  }),
}));

export const getButtonStyles = ({
  theme,
  ownerState,
}: {
  theme: Theme;
  ownerState: Partial<Omit<ButtonOwnerState, 'slots' | 'slotProps'>>;
}): Interpolation<any> => {
  return [
    {
      '--Icon-margin': 'initial', // reset the icon's margin.
      '--Icon-color':
        ownerState.color !== 'neutral' || ownerState.variant === 'solid'
          ? 'currentColor'
          : theme.vars.palette.text.icon,
      ...(ownerState.size === 'sm' && {
        '--Icon-fontSize': theme.vars.fontSize.lg,
        '--CircularProgress-size': '20px', // must be `px` unit, otherwise the CircularProgress is broken in Safari
        '--CircularProgress-thickness': '2px',
        '--Button-gap': '0.375rem',
        minHeight: 'var(--Button-minHeight, 2rem)',
        fontSize: theme.vars.fontSize.sm,
        paddingBlock: 'var(--Button-paddingBlock, 0.25rem)',
        paddingInline: '0.75rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Icon-fontSize': theme.vars.fontSize.xl,
        '--CircularProgress-size': '20px', // must be `px` unit, otherwise the CircularProgress is broken in Safari
        '--CircularProgress-thickness': '2px',
        '--Button-gap': '0.5rem',
        minHeight: 'var(--Button-minHeight, 2.25rem)', // use min-height instead of height to make the button resilient to its content
        fontSize: theme.vars.fontSize.sm,
        // internal --Button-paddingBlock is used to control the padding-block of the button from the outside, for example as a decorator of an Input
        paddingBlock: 'var(--Button-paddingBlock, 0.375rem)', // the padding-block act as a minimum spacing between content and root element
        paddingInline: '1rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Icon-fontSize': theme.vars.fontSize.xl2,
        '--CircularProgress-size': '28px', // must be `px` unit, otherwise the CircularProgress is broken in Safari
        '--CircularProgress-thickness': '4px',
        '--Button-gap': '0.75rem',
        minHeight: 'var(--Button-minHeight, 2.75rem)',
        fontSize: theme.vars.fontSize.md,
        paddingBlock: 'var(--Button-paddingBlock, 0.5rem)',
        paddingInline: '1.5rem',
      }),
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box',
      borderRadius: `var(--Button-radius, ${theme.vars.radius.sm})`, // to be controlled by other components, for example Input
      margin: `var(--Button-margin)`, // to be controlled by other components, for example Input
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      userSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textDecoration: 'none', // prevent user agent underline when used as anchor
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.lg,
      lineHeight: theme.vars.lineHeight.md,
      ...(ownerState.fullWidth && {
        width: '100%',
      }),
      [theme.focus.selector]: theme.focus.default,
    } as const,
    {
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
      '&:hover': {
        '@media (hover: hover)': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
      },
      '&:active, &[aria-pressed="true"]':
        theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
      [`&.${buttonClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
      ...(ownerState.loadingPosition === 'center' && {
        // this has to come after the variant styles to take effect.
        [`&.${buttonClasses.loading}`]: {
          color: 'transparent',
        },
      }),
    },
  ];
};

const ButtonRoot = styled('button', {
  name: 'JoyButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonOwnerState }>(getButtonStyles);
/**
 *
 * Demos:
 *
 * - [Button](https://mui.com/joy-ui/react-button/)
 * - [Button Group](https://mui.com/joy-ui/react-button-group/)
 * - [Toggle Button Group](https://mui.com/joy-ui/react-toggle-button-group/)
 *
 * API:
 *
 * - [Button API](https://mui.com/joy-ui/api/button/)
 */
const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyButton',
  });

  const {
    children,
    action,
    color: colorProp = 'primary',
    variant: variantProp = 'solid',
    size: sizeProp = 'md',
    fullWidth = false,
    startDecorator,
    endDecorator,
    loading = false,
    loadingPosition = 'center',
    loadingIndicator: loadingIndicatorProp,
    disabled: disabledProp,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const buttonGroup = React.useContext(ButtonGroupContext);
  const toggleButtonGroup = React.useContext(ToggleButtonGroupContext);

  const variant = inProps.variant || buttonGroup.variant || variantProp;
  const size = inProps.size || buttonGroup.size || sizeProp;
  const color = inProps.color || buttonGroup.color || colorProp;
  const disabled =
    (inProps.loading || inProps.disabled) ?? (buttonGroup.disabled || loading || disabledProp);

  const buttonRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    disabled,
    rootRef: handleRef,
  });

  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress color={color} thickness={{ sm: 2, md: 3, lg: 4 }[size] || 3} />
  );

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    color,
    fullWidth,
    variant,
    size,
    focusVisible,
    loading,
    loadingPosition,
    disabled,
  };

  const classes = useUtilityClasses(ownerState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let onClick = props.onClick;
    if (typeof slotProps.root === 'function') {
      onClick = slotProps.root(ownerState).onClick;
    } else if (slotProps.root) {
      onClick = slotProps.root.onClick;
    }

    onClick?.(event);

    if (toggleButtonGroup) {
      toggleButtonGroup.onClick?.(event, props.value);
    }
  };

  let ariaPressed = props['aria-pressed'];

  if (typeof slotProps.root === 'function') {
    ariaPressed = slotProps.root(ownerState)['aria-pressed'];
  } else if (slotProps.root) {
    ariaPressed = slotProps.root['aria-pressed'];
  }

  if (toggleButtonGroup?.value) {
    if (Array.isArray(toggleButtonGroup.value)) {
      ariaPressed = toggleButtonGroup.value.includes(props.value as string);
    } else {
      ariaPressed = toggleButtonGroup.value === props.value;
    }
  }

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: ButtonRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
    additionalProps: {
      onClick: handleClick,
      'aria-pressed': ariaPressed,
    },
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: ButtonStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: ButtonEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotLoadingIndicatorCenter, loadingIndicatorCenterProps] = useSlot(
    'loadingIndicatorCenter',
    {
      className: classes.loadingIndicatorCenter,
      elementType: ButtonLoadingCenter,
      externalForwardedProps,
      ownerState,
    },
  );

  return (
    <SlotRoot {...rootProps}>
      {(startDecorator || (loading && loadingPosition === 'start')) && (
        <SlotStartDecorator {...startDecoratorProps}>
          {loading && loadingPosition === 'start' ? loadingIndicator : startDecorator}
        </SlotStartDecorator>
      )}

      {children}
      {loading && loadingPosition === 'center' && (
        <SlotLoadingIndicatorCenter {...loadingIndicatorCenterProps}>
          {loadingIndicator}
        </SlotLoadingIndicatorCenter>
      )}

      {(endDecorator || (loading && loadingPosition === 'end')) && (
        <SlotEndDecorator {...endDecoratorProps}>
          {loading && loadingPosition === 'end' ? loadingIndicator : endDecorator}
        </SlotEndDecorator>
      )}
    </SlotRoot>
  );
}) as ExtendButton<ButtonTypeMap>;

Button.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    loadingIndicatorCenter: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endDecorator: PropTypes.elementType,
    loadingIndicatorCenter: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
  }),
  /**
   * Element placed before the children.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

// @ts-ignore internal logic for ToggleButtonGroup
Button.muiName = 'Button';

export default Button;
