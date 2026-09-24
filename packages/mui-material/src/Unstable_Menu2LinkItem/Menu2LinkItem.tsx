'use client';
import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@mui/types';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import MenuItemBase from '../internal/MenuItemBase';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getMenuItemHighlightStyles, menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import { Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
import {
  getMenu2ItemOwnerState,
  Menu2ItemBaseOwnerState,
  Menu2ItemRootSlot,
  Menu2LinkItemBaseProps,
  Menu2ItemVisualProps,
  mergeMenu2ItemClassName,
  useMenu2ItemListContext,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2LinkItemUtilityClass,
  Menu2LinkItemClasses,
  menu2LinkItemClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2LinkItemOwnerState extends Menu2ItemBaseOwnerState {
  /** Whether Base UI currently highlights the item. */
  highlighted: boolean;
}

export interface Menu2LinkItemSlots {
  /**
   * The component that renders the root.
   * @default 'a'
   */
  root?: React.ElementType | undefined;
}

export interface Menu2LinkItemSlotProps extends Menu2RootSlotProps<Menu2LinkItemOwnerState> {}

export interface Menu2LinkItemOwnProps
  extends
    Menu2LinkItemBaseProps,
    Menu2ItemVisualProps<Menu2LinkItemClasses, Menu2LinkItemSlots, Menu2LinkItemSlotProps> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The URL that the link item points to.
   */
  href?: string | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */
  closeOnClick?: boolean | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

export interface Menu2LinkItemTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'a',
> {
  props: AdditionalProps & Menu2LinkItemOwnProps;
  defaultComponent: RootComponent;
}

export type Menu2LinkItemProps<
  RootComponent extends React.ElementType = Menu2LinkItemTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<Menu2LinkItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
};

const Menu2LinkItemRoot = styled(MenuItemBase, {
  name: 'MuiMenu2LinkItem',
  slot: 'Root',
  overridesResolver: (props, styles) => [
    menuItemOverridesResolver(props, styles),
    { [`&.${menu2LinkItemClasses.highlighted}`]: styles.highlighted },
  ],
})<{ ownerState: Menu2LinkItemOwnerState }>(
  memoTheme(({ theme }) => getMenuItemHighlightStyles(theme)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2LinkItem = React.forwardRef(function Menu2LinkItem(
  inProps: Menu2LinkItemProps,
  ref: React.ForwardedRef<Element>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2LinkItem',
  });

  const {
    className,
    classes: classesProp,
    component,
    dense: denseProp = false,
    disableGutters = false,
    disableRipple,
    divider = false,
    selected = false,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const childContext = useMenu2ItemListContext(denseProp, disableGutters);
  const { dense } = childContext;
  const ownerState = {
    ...props,
    ...getMenu2ItemOwnerState({
      dense,
      disabled: false,
      disableGutters,
      divider,
      selected,
    }),
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2LinkItemClasses>(
    ownerState,
    getMenu2LinkItemUtilityClass,
  );

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.LinkItem
        ref={ref}
        render={(renderProps, state) => (
          <Menu2ItemRootSlot<Menu2LinkItemOwnerState>
            baseProps={renderProps}
            ownerState={{ ...ownerState, ...state }}
            elementType={Menu2LinkItemRoot}
            defaultComponent="a"
            component={component}
            disableRipple={disableRipple}
            slotProps={slotProps}
            slots={slots}
            sx={sx}
          />
        )}
        className={mergeMenu2ItemClassName(className, classes, ownerState)}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
}) as OverridableComponent<Menu2LinkItemTypeMap>;

Menu2LinkItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the element.
   */
  className: PropTypes.string,
  /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */
  closeOnClick: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * The URL that the link item points to.
   */
  href: PropTypes.string,
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label: PropTypes.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * Styles applied to the root element.
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Menu2LinkItem;
