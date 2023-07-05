import * as React from 'react';
import PropTypes from 'prop-types';
import useMenuButton from '@mui/base/useMenuButton';
import composeClasses from '@mui/base/composeClasses';
import { OverridableComponent } from '@mui/types';
import {
  type MenuButtonProps,
  type MenuButtonOwnerState,
  type MenuButtonTypeMap,
} from './MenuButtonProps';
import menuButtonClasses, { getMenuButtonUtilityClass } from './menuButtonClasses';
import useThemeProps from '../styles/useThemeProps';
import useSlot from '../utils/useSlot';
import { styled, useColorInversion } from '../styles';

const useUtilityClasses = (ownerState: MenuButtonOwnerState) => {
  const { active, disabled } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', active && 'active'],
  };

  return composeClasses(slots, getMenuButtonUtilityClass);
};

export const MenuButtonRoot = styled('button', {
  name: 'JoyMenuButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuButtonOwnerState }>(({ theme, ownerState }) => {
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
      [theme.focus.selector]: theme.focus.default,
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    {
      '&:hover': {
        '@media (hover: hover)': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
      },
    },
    { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
    {
      [`&.${menuButtonClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
  ];
});

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/joy-ui/react-menu/)
 *
 * API:
 *
 * - [MenuButton API](https://mui.com/joy-ui/api/menu-button/)
 */
const MenuButton = React.forwardRef(function MenuButton(
  inProps: MenuButtonProps,
  forwardedRef: React.ForwardedRef<HTMLElement>,
) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyMenuButton',
  });

  const {
    children,
    color: colorProp = 'primary',
    component,
    disabled = false,
    size: sizeProp = 'md',
    slotProps = {},
    slots = {},
    variant: variantProp = 'solid',
    ...other
  } = props;

  const variant = inProps.variant || variantProp;
  const size = inProps.size || sizeProp;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const { getRootProps, open, active } = useMenuButton({ rootRef: forwardedRef });

  const ownerState: MenuButtonOwnerState = {
    ...props,
    active,
    color,
    disabled,
    open,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    elementType: MenuButtonRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ref: forwardedRef,
    ownerState,
    className: classes.root,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<MenuButtonTypeMap>;

MenuButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
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
   * @ignore
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default MenuButton;
