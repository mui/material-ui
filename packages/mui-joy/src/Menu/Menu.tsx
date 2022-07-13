import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { useMenu, MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import List from '../List';
import Sheet from '../Sheet';
import { styled, useThemeProps } from '../styles';
import { MenuTypeMap, MenuProps } from './MenuProps';
import { getMenuUtilityClass } from './menuClasses';

const useUtilityClasses = (ownerState: MenuProps) => {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded'],
  };

  return composeClasses(slots, getMenuUtilityClass, {});
};

const MenuRoot = styled(PopperUnstyled, {
  name: 'MuiMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuProps }>(({ theme, ownerState }) => ({
  '--Menu-radius': theme.vars.radius.sm,
  borderRadius: 'var(--Menu-radius)',
  boxShadow: theme.vars.shadow.sm,
  ...(ownerState.size === 'sm' && {
    paddingBlock: theme.spacing(0.5),
  }),
  ...(ownerState.size === 'md' && {
    paddingBlock: theme.spacing(0.75),
  }),
  ...(ownerState.size === 'lg' && {
    paddingBlock: theme.spacing(1),
  }),
  zIndex: 1,
}));

const MenuListbox = styled(List, {
  name: 'MuiMenu',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})({
  '--List-radius': 'var(--Menu-radius)',
  '--List-padding': 'var(--Menu-padding, 0px)',
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps<typeof inProps>({
    props: inProps,
    name: 'MuiMenu',
  });

  const {
    actions,
    anchorEl,
    children,
    color = 'neutral',
    componentsProps = {},
    disablePortal = true,
    keepMounted = false,
    listboxId,
    onClose,
    open = false,
    modifiers = [],
    variant = 'outlined',
    size = 'md',
    ...other
  } = props;

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
    listboxId,
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
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: MenuRoot,
    externalForwardedProps: other,
    externalSlotProps: componentsProps.root,
    additionalProps: {
      anchorEl,
      open,
      disablePortal,
      keepMounted,
      role: undefined,
      ref,
      component: Sheet,
      color,
      variant,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
        ...modifiers,
      ],
    },
    className: classes.root,
    ownerState,
  });

  const listboxProps = useSlotProps({
    elementType: MenuListbox,
    getSlotProps: getListboxProps,
    additionalProps: { size },
    externalSlotProps: componentsProps.listbox,
    ownerState,
    className: classes.listbox,
  });

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open,
  };

  return (
    <MenuRoot {...rootProps}>
      <MenuListbox {...listboxProps}>
        <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
      </MenuListbox>
    </MenuRoot>
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
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * @ignore
   */
  listboxId: PropTypes.string,
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
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Menu;
