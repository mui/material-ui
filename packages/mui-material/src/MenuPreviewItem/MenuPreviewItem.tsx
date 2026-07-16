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
  getMenuPreviewItemOwnerState,
  MenuPreviewItemBaseProps,
  MenuPreviewItemOwnerState,
  MenuPreviewItemVisualProps,
  menuPreviewItemOverridesResolver,
  mergeMenuPreviewItemClassName,
  useMenuPreviewItemUtilityClasses,
} from '../MenuPreview/menuPreviewItemShared';
import {
  getMenuPreviewRootRender,
  isMenuPreviewRootNativeButton,
  MenuPreviewRootSlotProps,
  resolveSlotProps,
} from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewItemUtilityClass,
  menuPreviewItemClasses,
  MenuPreviewItemClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewItemSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
}

export interface MenuPreviewItemSlotProps extends MenuPreviewRootSlotProps<MenuPreviewItemOwnerState> {}

export interface MenuPreviewItemProps
  extends
    Omit<BaseMenu.Item.Props, 'className' | 'nativeButton' | 'render' | 'style'>,
    MenuPreviewItemBaseProps,
    MenuPreviewItemVisualProps<
      MenuPreviewItemClasses,
      MenuPreviewItemSlots,
      MenuPreviewItemSlotProps
    > {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default true
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

const MenuPreviewItemRoot = styled('div', {
  name: 'MuiMenuPreviewItem',
  slot: 'Root',
  overridesResolver: menuPreviewItemOverridesResolver,
})<{ ownerState: MenuPreviewItemOwnerState }>(
  memoTheme(({ theme }) => getMenuPreviewItemStyles(theme, menuPreviewItemClasses)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewItem API](https://mui.com/material-ui/api/menu-preview-item/)
 */
const MenuPreviewItem = React.forwardRef(function MenuPreviewItem(
  inProps: MenuPreviewItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewItem',
  });

  const {
    className,
    classes: classesProp,
    component,
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    nativeButton: nativeButtonProp,
    selected = false,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    ...getMenuPreviewItemOwnerState({ dense, disabled, disableGutters, divider, selected }),
    classes: classesProp,
  };
  const classes = useMenuPreviewItemUtilityClasses<MenuPreviewItemClasses>(
    ownerState,
    getMenuPreviewItemUtilityClass,
  );
  const childContext = React.useMemo(
    () => ({
      dense,
      disableGutters,
    }),
    [dense, disableGutters],
  );
  const RootSlot = slots?.root ?? MenuPreviewItemRoot;

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.Item
        ref={ref}
        render={getMenuPreviewRootRender(RootSlot, ownerState, {
          ...resolveSlotProps(slotProps?.root, ownerState),
          as: component,
          ownerState,
          sx,
        })}
        className={mergeMenuPreviewItemClassName(className, classes, ownerState)}
        disabled={disabled}
        nativeButton={nativeButtonProp ?? isMenuPreviewRootNativeButton(RootSlot, component)}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
});

MenuPreviewItem.propTypes /* remove-proptypes */ = {
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
   * @default true
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
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
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
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label: PropTypes.string,
  /**
   * Whether the component is rendered as a native button.
   *
   * By default, this is inferred from the root slot and `component` prop.
   */
  nativeButton: PropTypes.bool,
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

export default MenuPreviewItem;
