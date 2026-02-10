'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { ListActionTypes } from '@mui/base/useList';
import { styled, useThemeProps } from '../styles';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import GroupListContext from '../List/GroupListContext';
import { MenuListOwnerState, MenuListTypeMap } from './MenuListProps';
import { getMenuListUtilityClass } from './menuListClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: MenuListOwnerState) => {
  const { variant, color, size } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getMenuListUtilityClass, {});
};

const MenuListRoot = styled(StyledList, {
  name: 'JoyMenuList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuListOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--focus-outline-offset': `calc(${theme.vars.focus.thickness} * -1)`, // to prevent the focus outline from being cut by overflow
    '--ListItem-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.surface,
    '--ListItem-stickyTop': 'calc(var(--List-padding, var(--ListDivider-gap)) * -1)', // negative amount of the List's padding block
    ...scopedVariables,
    borderRadius: `var(--List-radius, ${theme.vars.radius.sm})`,
    overflow: 'auto',
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
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
 * - [MenuList API](https://mui.com/joy-ui/api/menu-list/)
 */
const MenuList = React.forwardRef(function MenuList(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyMenuList',
  });

  const {
    actions,
    id: idProp,
    component,
    children,
    size = 'md',
    variant = 'outlined',
    color = 'neutral',
    onItemsChange,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const {
    contextValue: menuContextValue,
    getListboxProps,
    dispatch,
  } = useMenu({
    listboxRef: ref,
    id: idProp,
    onItemsChange,
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
    variant,
    color,
    size,
    nesting: false,
    row: false,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    elementType: MenuListRoot,
    getSlotProps: getListboxProps,
    externalForwardedProps,
    ownerState,
    className: classes.root,
  });

  return (
    <SlotRoot {...rootProps}>
      <MenuProvider value={menuContextValue}>
        <GroupListContext.Provider value="menu">
          <ListProvider nested>{children}</ListProvider>
        </GroupListContext.Provider>
      </MenuProvider>
    </SlotRoot>
  );
}) as OverridableComponent<MenuListTypeMap>;

MenuList.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  id: PropTypes.string,
  /**
   * Function called when the items displayed in the menu change.
   */
  onItemsChange: PropTypes.func,
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

export default MenuList;
