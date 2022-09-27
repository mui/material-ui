import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, HTMLElementType, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { useMenu, MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { ListRoot } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import { styled, useThemeProps } from '../styles';
import { MenuTypeMap, MenuProps, MenuOwnerState } from './MenuProps';
import { getMenuUtilityClass } from './menuClasses';

const useUtilityClasses = (ownerState: MenuProps) => {
  const { open, variant, color, size } = ownerState;
  const slots = {
    root: [
      'root',
      open && 'expanded',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getMenuUtilityClass, {});
};

const MenuRoot = styled(ListRoot, {
  name: 'JoyMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--_outline-inside': '1', // to prevent the focus outline from being cut by overflow
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.surface, // for sticky List
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)', // negative amount of the List's padding block
    ...scopedVariables,
    boxShadow: theme.vars.shadow.md,
    overflow: 'auto',
    zIndex: 1300, // the same value as Material UI Menu. TODO: revisit the appropriate value later.
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
  };
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyMenu',
  });

  const {
    actions,
    anchorEl,
    children,
    component,
    color = 'neutral',
    disablePortal = false,
    keepMounted = false,
    id,
    onClose,
    open = false,
    modifiers,
    variant = 'outlined',
    size = 'md',
    ...other
  } = props;

  // cache the modifiers to prevent Popper from being recreated when React rerenders menu.
  const cachedModifiers = React.useMemo(
    () => [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
      ...(modifiers || []),
    ],
    [modifiers],
  );

  const {
    registerItem,
    unregisterItem,
    getListboxProps,
    getItemProps,
    getItemState,
    highlightFirstItem,
    highlightLastItem,
  } = useMenu({
    open,
    onClose,
    listboxId: id,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      highlightFirstItem,
      highlightLastItem,
    }),
    [highlightFirstItem, highlightLastItem],
  );

  const ownerState = {
    ...props,
    disablePortal,
    color,
    variant,
    size,
    modifiers,
    open,
    nesting: false,
    row: false,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: MenuRoot,
    externalForwardedProps: other,
    getSlotProps: getListboxProps,
    externalSlotProps: {},
    additionalProps: {
      anchorEl,
      open,
      disablePortal,
      keepMounted,
      ref,
      component: MenuRoot,
      as: component, // use `as` to insert the component inside of the MenuRoot
      modifiers: cachedModifiers,
    },
    className: classes.root,
    ownerState,
  });

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open,
  };

  return (
    <PopperUnstyled {...rootProps}>
      <MenuUnstyledContext.Provider value={contextValue}>
        <ListProvider nested>{children}</ListProvider>
      </MenuUnstyledContext.Provider>
    </PopperUnstyled>
  );
}) as OverridableComponent<MenuTypeMap>;

Menu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions: refType,
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object,
      effect: PropTypes.func,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      name: PropTypes.any,
      options: PropTypes.object,
      phase: PropTypes.oneOf([
        'afterMain',
        'afterRead',
        'afterWrite',
        'beforeMain',
        'beforeRead',
        'beforeWrite',
        'main',
        'read',
        'write',
      ]),
      requires: PropTypes.arrayOf(PropTypes.string),
      requiresIfExists: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose: PropTypes.func,
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * The size of the component (affect other nested list* components because the `Menu` inherits `List`).
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
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
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Menu;
