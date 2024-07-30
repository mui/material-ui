'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/base/useButton';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import { getIconButtonUtilityClass } from './iconButtonClasses';
import { IconButtonOwnerState, IconButtonTypeMap, ExtendIconButton } from './IconButtonProps';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import ToggleButtonGroupContext from '../ToggleButtonGroup/ToggleButtonGroupContext';
import CircularProgress from '../CircularProgress';

const useUtilityClasses = (ownerState: IconButtonOwnerState) => {
  const { color, disabled, focusVisible, focusVisibleClassName, size, variant, loading } =
    ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      loading && 'loading',
    ],
    loadingIndicator: ['loadingIndicator'],
  };

  const composedClasses = composeClasses(slots, getIconButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

export const StyledIconButton = styled('button')<{ ownerState: IconButtonOwnerState }>(
  ({ theme, ownerState }) => [
    {
      '--Icon-margin': 'initial', // reset the icon's margin.
      '--Icon-color':
        ownerState.color !== 'neutral' || ownerState.variant === 'solid'
          ? 'currentColor'
          : theme.vars.palette.text.icon,
      ...(ownerState.instanceSize && {
        '--IconButton-size': { sm: '2rem', md: '2.25rem', lg: '2.75rem' }[ownerState.instanceSize],
      }),
      ...(ownerState.size === 'sm' && {
        '--Icon-fontSize': 'calc(var(--IconButton-size, 2rem) / 1.6)', // 1.25rem by default
        '--CircularProgress-size': '20px',
        '--CircularProgress-thickness': '2px',
        minWidth: 'var(--IconButton-size, 2rem)', // use min-width instead of height to make the button resilient to its content
        minHeight: 'var(--IconButton-size, 2rem)', // use min-height instead of height to make the button resilient to its content
        fontSize: theme.vars.fontSize.sm,
        paddingInline: '2px', // add a gap, in case the content is long, for example multiple icons
      }),
      ...(ownerState.size === 'md' && {
        '--Icon-fontSize': 'calc(var(--IconButton-size, 2.25rem) / 1.5)', // 1.5rem by default
        '--CircularProgress-size': '20px',
        '--CircularProgress-thickness': '2px',
        minWidth: 'var(--IconButton-size, 2.25rem)',
        minHeight: 'var(--IconButton-size, 2.25rem)',
        fontSize: theme.vars.fontSize.md,
        paddingInline: '0.25rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Icon-fontSize': 'calc(var(--IconButton-size, 2.75rem) / 1.571)', // 1.75rem by default
        '--CircularProgress-size': '28px',
        '--CircularProgress-thickness': '4px',
        minWidth: 'var(--IconButton-size, 2.75rem)',
        minHeight: 'var(--IconButton-size, 2.75rem)',
        fontSize: theme.vars.fontSize.lg,
        paddingInline: '0.375rem',
      }),
      WebkitTapHighlightColor: 'transparent',
      paddingBlock: 0,
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.md,
      margin: `var(--IconButton-margin)`, // to be controlled by other components, for example Input
      borderRadius: `var(--IconButton-radius, ${theme.vars.radius.sm})`, // to be controlled by other components, for example Input
      border: 'none',
      boxSizing: 'border-box',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      [theme.focus.selector]: { '--Icon-color': 'currentColor', ...theme.focus.default },
    } as const,
    {
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
      '&:hover': {
        '@media (hover: hover)': {
          '--Icon-color': 'currentColor',
          ...theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
        },
      },
      '&:active, &[aria-pressed="true"]': {
        '--Icon-color': 'currentColor',
        ...theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
      },
      '&:disabled': theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
  ],
);

export const IconButtonRoot = styled(StyledIconButton, {
  name: 'JoyIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});

const ButtonLoading = styled('span', {
  name: 'JoyIconButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => styles.loadingIndicator,
})<{ ownerState: IconButtonOwnerState }>(({ theme, ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
  ...(ownerState.disabled && {
    color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
  }),
}));

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
 * - [IconButton API](https://mui.com/joy-ui/api/icon-button/)
 */
const IconButton = React.forwardRef(function IconButton(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyIconButton',
  });

  const {
    children,
    action,
    component = 'button',
    color: colorProp = 'neutral',
    disabled: disabledProp,
    variant: variantProp = 'plain',
    loading = false,
    loadingIndicator: loadingIndicatorProp,
    size: sizeProp = 'md',
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
    component,
    color,
    disabled,
    variant,
    loading,
    size,
    focusVisible,
    instanceSize: inProps.size,
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
    elementType: IconButtonRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      onClick: handleClick,
      'aria-pressed': ariaPressed,
    },
  });

  const [SlotLoadingIndicator, loadingIndicatorProps] = useSlot('loadingIndicator', {
    className: classes.loadingIndicator,
    elementType: ButtonLoading,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      {loading ? (
        <SlotLoadingIndicator {...loadingIndicatorProps}>{loadingIndicator}</SlotLoadingIndicator>
      ) : (
        children
      )}
    </SlotRoot>
  );
}) as ExtendIconButton<IconButtonTypeMap>;

IconButton.propTypes /* remove-proptypes */ = {
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
   * @default 'neutral'
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
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the loading indicator is shown and the icon button becomes disabled.
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
    loadingIndicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    loadingIndicator: PropTypes.elementType,
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
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

// @ts-ignore internal logic for ToggleButtonGroup
IconButton.muiName = 'IconButton';

export default IconButton;
