'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { ListActionTypes } from '@mui/base/useList';
import { Popper } from '@mui/base/Popper';
import { useSlotProps } from '@mui/base/utils';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import GroupListContext from '../List/GroupListContext';
import { styled, useThemeProps } from '../styles';
import { applySolidInversion, applySoftInversion } from '../colorInversion';
import { VariantColorProvider } from '../styles/variantColorInheritance';
import { MenuTypeMap, MenuOwnerState } from './MenuProps';
import { getMenuUtilityClass } from './menuClasses';
import { ListOwnerState } from '../List';

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
    listbox: ['listbox'],
  };

  return composeClasses(slots, getMenuUtilityClass, {});
};

const MenuRoot = styled(StyledList, {
  name: 'JoyMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return [
    {
      '--focus-outline-offset': `calc(${theme.vars.focus.thickness} * -1)`, // to prevent the focus outline from being cut by overflow
      '--ListItem-stickyBackground':
        variantStyle?.backgroundColor ||
        variantStyle?.background ||
        theme.vars.palette.background.popup,
      '--ListItem-stickyTop': 'calc(var(--List-padding, var(--ListDivider-gap)) * -1)', // negative amount of the List's padding block
      ...scopedVariables,
      borderRadius: `var(--List-radius, ${theme.vars.radius.sm})`,
      boxShadow: theme.shadow.md,
      overflow: 'auto',
      // `unstable_popup-zIndex` is a private variable that lets other component, for example Modal, to override the z-index so that the listbox can be displayed above the Modal.
      zIndex: `var(--unstable_popup-zIndex, ${theme.vars.zIndex.popup})`,
      ...(!variantStyle?.backgroundColor && {
        backgroundColor: theme.vars.palette.background.popup,
      }),
      ...(ownerState.variant === 'solid' &&
        ownerState.color &&
        ownerState.invertedColors &&
        applySolidInversion(ownerState.color)(theme)),
      ...(ownerState.variant === 'soft' &&
        ownerState.color &&
        ownerState.invertedColors &&
        applySoftInversion(ownerState.color)(theme)),
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
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
 * - [Menu API](https://mui.com/joy-ui/api/menu/)
 * - inherits [Popper API](https://mui.com/base-ui/react-popper/components-api/#popper)
 */
const Menu = React.forwardRef(function Menu(inProps, ref: React.ForwardedRef<HTMLUListElement>) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyMenu',
  });

  const {
    actions,
    children,
    color = 'neutral',
    component,
    disablePortal = false,
    keepMounted = false,
    id,
    invertedColors = false,
    onItemsChange,
    modifiers: modifiersProp,
    variant = 'outlined',
    size = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const { contextValue, getListboxProps, dispatch, open, triggerElement } = useMenu({
    onItemsChange,
    id,
    listboxRef: ref,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      dispatch,
      resetHighlight: () => dispatch({ type: ListActionTypes.resetHighlight, event: null }),
    }),
    [dispatch],
  );

  const ownerState = {
    ...props,
    disablePortal,
    invertedColors,
    color,
    variant,
    size,
    open,
    nesting: false,
    row: false,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

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

  const rootProps = useSlotProps({
    elementType: MenuRoot,
    getSlotProps: getListboxProps,
    externalForwardedProps,
    externalSlotProps: {},
    ownerState: ownerState as MenuOwnerState & ListOwnerState,
    additionalProps: {
      anchorEl: triggerElement,
      open: open && triggerElement !== null,
      disablePortal,
      keepMounted,
      modifiers,
    },
    className: classes.root,
  });

  return (
    <MenuRoot
      {...rootProps}
      {...(!props.slots?.root && {
        as: Popper,
        slots: {
          root: component || 'ul',
        },
      })}
    >
      <MenuProvider value={contextValue}>
        {/* If `invertedColors` is true, let the children use their default variant */}
        <VariantColorProvider variant={invertedColors ? undefined : variant} color={color}>
          <GroupListContext.Provider value="menu">
            <ListProvider nested>{children}</ListProvider>
          </GroupListContext.Provider>
        </VariantColorProvider>
      </MenuProvider>
    </MenuRoot>
  );
}) as OverridableComponent<MenuTypeMap>;

Menu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions: refType,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
   * @default false
   */
  invertedColors: PropTypes.bool,
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
   * Function called when the items displayed in the menu change.
   */
  onItemsChange: PropTypes.func,
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Menu;
