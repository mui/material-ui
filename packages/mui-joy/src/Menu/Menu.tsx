import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, HTMLElementType, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import useMenu, { MenuProvider } from '@mui/base/useMenu';
import Popper from '@mui/base/Popper';
import { useSlotProps } from '@mui/base/utils';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import GroupListContext from '../List/GroupListContext';
import { styled, useThemeProps } from '../styles';
import ColorInversion, {
  ColorInversionProvider,
  useColorInversion,
} from '../styles/ColorInversion';
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
      '--List-radius': theme.vars.radius.sm,
      '--ListItem-stickyBackground':
        variantStyle?.backgroundColor ||
        variantStyle?.background ||
        theme.vars.palette.background.popup,
      '--ListItem-stickyTop': 'calc(var(--List-padding, var(--ListDivider-gap)) * -1)', // negative amount of the List's padding block
      ...scopedVariables,
      boxShadow: theme.shadow.md,
      overflow: 'auto',
      zIndex: theme.vars.zIndex.popup,
      ...(!variantStyle?.backgroundColor && {
        backgroundColor: theme.vars.palette.background.popup,
      }),
    },
    ownerState.color !== 'context' &&
      ownerState.invertedColors &&
      theme.colorInversion[ownerState.variant!]?.[ownerState.color!],
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
 * - inherits [Popper API](https://mui.com/base/api/popper/)
 */
const Menu = React.forwardRef(function Menu(inProps, ref: React.ForwardedRef<HTMLUListElement>) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyMenu',
  });

  const {
    actions,
    anchorEl,
    children,
    color: colorProp = 'neutral',
    component,
    disablePortal = false,
    keepMounted = false,
    invertedColors = false,
    id,
    onClose,
    open = false,
    modifiers: modifiersProp,
    variant = 'outlined',
    size = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = disablePortal ? getColor(inProps.color, colorProp) : colorProp;

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        onClose?.();
      }
    },
    [onClose],
  );

  const { contextValue, getListboxProps, dispatch } = useMenu({
    open,
    onOpenChange: handleOpenChange,
    listboxId: id,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      dispatch,
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
      ref,
      anchorEl,
      open,
      disablePortal,
      keepMounted,
      modifiers,
    },
    className: classes.root,
  });

  let result = (
    <MenuProvider value={contextValue}>
      <GroupListContext.Provider value="menu">
        <ListProvider nested>{children}</ListProvider>
      </GroupListContext.Provider>
    </MenuProvider>
  );

  if (invertedColors) {
    result = <ColorInversionProvider variant={variant}>{result}</ColorInversionProvider>;
  }

  result = (
    <MenuRoot
      {...rootProps}
      {...(!props.slots?.root && {
        as: Popper,
        slots: {
          root: component || 'ul',
        },
      })}
    >
      {result}
    </MenuRoot>
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
