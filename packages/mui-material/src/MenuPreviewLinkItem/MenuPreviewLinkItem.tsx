'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getMenuPreviewItemStyles } from '../MenuPreview/menuPreviewSharedStyles';
import {
  getMenuPreviewRootRender,
  MenuPreviewRootSlotProps,
  MenuPreviewRootSlots,
  resolveSlotProps,
} from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewItemOwnerState,
  MenuPreviewLinkItemBaseProps,
  MenuPreviewItemOwnerState,
  MenuPreviewItemVisualProps,
  menuPreviewItemOverridesResolver,
  mergeMenuPreviewItemClassName,
  useMenuPreviewItemUtilityClasses,
} from '../MenuPreview/menuPreviewItemShared';
import {
  getMenuPreviewLinkItemUtilityClass,
  menuPreviewLinkItemClasses,
  MenuPreviewLinkItemClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewLinkItemSlots extends MenuPreviewRootSlots {}

export interface MenuPreviewLinkItemSlotProps extends MenuPreviewRootSlotProps<MenuPreviewItemOwnerState> {}

export interface MenuPreviewLinkItemProps
  extends
    Omit<BaseMenu.LinkItem.Props, 'className' | 'render' | 'style'>,
    MenuPreviewLinkItemBaseProps,
    MenuPreviewItemVisualProps<
      MenuPreviewLinkItemClasses,
      MenuPreviewLinkItemSlots,
      MenuPreviewLinkItemSlotProps
    > {
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
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

const MenuPreviewLinkItemRoot = styled('a', {
  name: 'MuiMenuPreviewLinkItem',
  slot: 'Root',
  overridesResolver: menuPreviewItemOverridesResolver,
})<{ ownerState: MenuPreviewItemOwnerState }>(
  memoTheme(({ theme }) => getMenuPreviewItemStyles(theme, menuPreviewLinkItemClasses)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewLinkItem API](https://mui.com/material-ui/api/menu-preview-link-item/)
 */
const MenuPreviewLinkItem = React.forwardRef(function MenuPreviewLinkItem(
  inProps: MenuPreviewLinkItemProps,
  ref: React.ForwardedRef<Element>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewLinkItem',
  });

  const {
    className,
    classes: classesProp,
    component,
    dense = false,
    disableGutters = false,
    divider = false,
    selected = false,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    ...getMenuPreviewItemOwnerState({
      dense,
      disabled: false,
      disableGutters,
      divider,
      selected,
    }),
    classes: classesProp,
  };
  const classes = useMenuPreviewItemUtilityClasses<MenuPreviewLinkItemClasses>(
    ownerState,
    getMenuPreviewLinkItemUtilityClass,
  );
  const childContext = React.useMemo(
    () => ({
      dense,
      disableGutters,
    }),
    [dense, disableGutters],
  );

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.LinkItem
        ref={ref}
        render={getMenuPreviewRootRender(slots?.root ?? MenuPreviewLinkItemRoot, ownerState, {
          ...resolveSlotProps(slotProps?.root, ownerState),
          as: component,
          ownerState,
          sx,
        })}
        className={mergeMenuPreviewItemClassName(className, classes, ownerState)}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
});

MenuPreviewLinkItem.propTypes /* remove-proptypes */ = {
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

export default MenuPreviewLinkItem;
