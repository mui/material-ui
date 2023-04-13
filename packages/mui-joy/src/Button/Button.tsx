import * as React from 'react';
import PropTypes from 'prop-types';
import useButton from '@mui/base/useButton';
import composeClasses from '@mui/base/composeClasses';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import useSlot from '../utils/useSlot';
import CircularProgress from '../CircularProgress';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import { ButtonOwnerState, ButtonTypeMap, ExtendButton } from './ButtonProps';

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

export const ButtonRoot = styled('button', {
  name: 'JoyButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonOwnerState }>(({ theme, ownerState }) => {
  return [
    {
      '--Icon-margin': 'initial', // reset the icon's margin.
      ...(ownerState.size === 'sm' && {
        '--Icon-fontSize': '1.25rem',
        '--CircularProgress-size': '20px', // must be `px` unit, otherwise the CircularProgress is broken in Safari
        '--Button-gap': '0.375rem',
        minHeight: 'var(--Button-minHeight, 2rem)',
        fontSize: theme.vars.fontSize.sm,
        paddingBlock: '2px',
        paddingInline: '0.75rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Icon-fontSize': '1.5rem', // control the SvgIcon font-size
        '--CircularProgress-size': '24px', // must be `px` unit, otherwise the CircularProgress is broken in Safari
        '--Button-gap': '0.5rem',
        minHeight: 'var(--Button-minHeight, 2.5rem)', // use min-height instead of height to make the button resilient to its content
        fontSize: theme.vars.fontSize.sm,
        paddingBlock: '0.25rem', // the padding-block act as a minimum spacing between content and root element
        paddingInline: '1rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Icon-fontSize': '1.75rem',
        '--CircularProgress-size': '28px', // must be `px` unit, otherwise the CircularProgress is broken in Safari
        '--Button-gap': '0.75rem',
        minHeight: 'var(--Button-minHeight, 3rem)',
        fontSize: theme.vars.fontSize.md,
        paddingBlock: '0.375rem',
        paddingInline: '1.5rem',
      }),
      WebkitTapHighlightColor: 'transparent',
      borderRadius: `var(--Button-radius, ${theme.vars.radius.sm})`, // to be controlled by other components, eg. Input
      margin: `var(--Button-margin)`, // to be controlled by other components, eg. Input
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textDecoration: 'none', // prevent user agent underline when used as anchor
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.lg,
      lineHeight: 1,
      ...(ownerState.fullWidth && {
        width: '100%',
      }),
      [theme.focus.selector]: theme.focus.default,
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
    { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
    {
      [`&.${buttonClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
      ...(ownerState.loadingPosition === 'center' && {
        [`&.${buttonClasses.loading}`]: {
          color: 'transparent',
        },
      }),
    },
  ];
});
/**
 *
 * Demos:
 *
 * - [Button](https://mui.com/joy-ui/react-button/)
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
    variant = 'solid',
    size = 'md',
    fullWidth = false,
    startDecorator,
    endDecorator,
    loading = false,
    loadingPosition = 'center',
    loadingIndicator: loadingIndicatorProp,
    disabled,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    disabled: disabled || loading,
    ref: handleRef,
  });

  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress
      {...(color !== 'context' && { color })}
      thickness={{ sm: 2, md: 3, lg: 4 }[size] || 3}
    />
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
    disabled: disabled || loading,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: ButtonRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
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
   * If `true`, the loading indicator is shown.
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Button;
