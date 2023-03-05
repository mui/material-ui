import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, HTMLElementType, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import useMenu from '@mui/base/useMenu';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import { styled, useThemeProps } from '../styles';
import ColorInversion, { useColorInversion } from '../styles/ColorInversion';
import { MenuTypeMap, MenuOwnerState } from './MenuProps';
import { getMenuUtilityClass } from './menuClasses';

const useUtilityClasses = (ownerState: MenuOwnerState) => {
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

const MenuRoot = styled(StyledList, {
  name: 'JoyMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--focus-outline-offset': `calc(${theme.vars.focus.thickness} * -1)`, // to prevent the focus outline from being cut by overflow
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.popup,
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)', // negative amount of the List's padding block
    ...scopedVariables,
    boxShadow: theme.shadow.md,
    overflow: 'auto',
    zIndex: theme.vars.zIndex.popup,
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.popup,
    }),
  };
});
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/joy-ui/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/joy-ui/api/menu/)
 * - inherits [PopperUnstyled API](https://mui.com/base/api/popper-unstyled/)
 */
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
    color: colorProp = 'neutral',
    disablePortal = false,
    keepMounted = false,
    id,
    onClose,
    open = false,
    modifiers: modifiersProp,
    variant = 'outlined',
    size = 'md',
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = disablePortal ? getColor(inProps.color, colorProp) : colorProp;

  const { contextValue, getListboxProps, highlightFirstItem, highlightLastItem } = useMenu({
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
    },
    className: classes.root,
    ownerState,
  });

  const modifiers = React.useMemo(
    () => [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
      ...(modifiersProp || []),
    ],
    [modifiersProp],
  );

  const menuContextValue: MenuUnstyledContextType = React.useMemo(
    () => ({
      ...contextValue,
      open,
    }),
    [contextValue, open],
  );

  const result = (
    <PopperUnstyled {...rootProps} modifiers={modifiers}>
      <MenuUnstyledContext.Provider value={menuContextValue}>
        <ListProvider nested>
          {disablePortal ? (
            children
          ) : (
            // For portal popup, the children should not inherit color inversion from the upper parent.
            <ColorInversion.Provider value={undefined}>{children}</ColorInversion.Provider>
          )}
        </ListProvider>
      </MenuUnstyledContext.Provider>
    </PopperUnstyled>
  );

  return disablePortal ? (
    result
  ) : (
    // For portal popup, the children should not inherit color inversion from the upper parent.
    <ColorInversion.Provider value={undefined}>{result}</ColorInversion.Provider>
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
   * @default 'neutral'
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
   * @default 'md'
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Menu;
