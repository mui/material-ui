'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/base/useButton';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import useSlot from '../utils/useSlot';
import { getIconButtonUtilityClass } from './iconButtonClasses';
import { IconButtonOwnerState, IconButtonTypeMap, ExtendIconButton } from './IconButtonProps';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';

const useUtilityClasses = (ownerState: IconButtonOwnerState) => {
  const { color, disabled, focusVisible, focusVisibleClassName, size, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
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
        '--IconButton-size': { sm: '2rem', md: '2.5rem', lg: '3rem' }[ownerState.instanceSize],
      }),
      ...(ownerState.size === 'sm' && {
        '--Icon-fontSize': 'calc(var(--IconButton-size, 2rem) / 1.6)', // 1.25rem by default
        '--CircularProgress-size': '20px',
        '--CircularProgress-thickness': '2px',
        minWidth: 'var(--IconButton-size, 2rem)', // use min-width instead of height to make the button resilient to its content
        minHeight: 'var(--IconButton-size, 2rem)', // use min-height instead of height to make the button resilient to its content
        fontSize: theme.vars.fontSize.sm,
        paddingInline: '2px', // add a gap, in case the content is long, e.g. multiple icons
      }),
      ...(ownerState.size === 'md' && {
        '--Icon-fontSize': 'calc(var(--IconButton-size, 2.5rem) / 1.667)', // 1.5rem by default
        '--CircularProgress-size': '24px',
        '--CircularProgress-thickness': '3px',
        minWidth: 'var(--IconButton-size, 2.5rem)',
        minHeight: 'var(--IconButton-size, 2.5rem)',
        fontSize: theme.vars.fontSize.md,
        paddingInline: '0.25rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Icon-fontSize': 'calc(var(--IconButton-size, 3rem) / 1.714)', // 1.75rem by default
        '--CircularProgress-size': '28px',
        '--CircularProgress-thickness': '4px',
        minWidth: 'var(--IconButton-size, 3rem)',
        minHeight: 'var(--IconButton-size, 3rem)',
        fontSize: theme.vars.fontSize.lg,
        paddingInline: '0.375rem',
      }),
      WebkitTapHighlightColor: 'transparent',
      paddingBlock: 0,
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.md,
      margin: `var(--IconButton-margin)`, // to be controlled by other components, eg. Input
      borderRadius: `var(--IconButton-radius, ${theme.vars.radius.sm})`, // to be controlled by other components, eg. Input
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
    size: sizeProp = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const buttonGroup = React.useContext(ButtonGroupContext);
  const variant = inProps.variant || buttonGroup.variant || variantProp;
  const size = inProps.size || buttonGroup.size || sizeProp;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, buttonGroup.color || colorProp);
  const disabled = inProps.disabled ?? (buttonGroup.disabled || disabledProp);

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    disabled,
    rootRef: handleRef,
  });

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
    size,
    focusVisible,
    instanceSize: inProps.size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: IconButtonRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as ExtendIconButton<IconButtonTypeMap>;

IconButton.propTypes /* remove-proptypes */ = {
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
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
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
   * @default 0
   */
  tabIndex: PropTypes.number,
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
