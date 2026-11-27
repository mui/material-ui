'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn } from '@base-ui/react/types';
import { styled } from '../zero-styled';
import {
  Menu2ItemEndAdornment,
  Menu2ItemStartAdornment,
} from '../Unstable_Menu2/Menu2ItemAdornment';
import Menu2ItemBase, { menu2ItemOverridesResolver } from '../internal/Menu2ItemBase';
import Menu2RenderRoot from '../internal/Menu2RenderRoot';
import { useDefaultProps } from '../DefaultPropsProvider';
import type {
  Menu2ItemBaseOwnerState,
  Menu2LinkItemBaseProps,
  Menu2ItemVisualProps,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2ItemAdornments,
  Menu2ItemRootSlot,
  mergeMenu2ItemClassName,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import type { Menu2LinkItemClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2LinkItemUtilityClass } from '../Unstable_Menu2/menu2Classes';
import type { Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';

const Menu2LinkItemRoot = styled(Menu2ItemBase, {
  name: 'MuiMenu2LinkItem',
  slot: 'root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2LinkItemOwnerState }>({});

const Menu2LinkItemStartAdornment = styled(Menu2ItemStartAdornment, {
  name: 'MuiMenu2LinkItem',
  slot: 'startAdornment',
})({});

const Menu2LinkItemEndAdornment = styled(Menu2ItemEndAdornment, {
  name: 'MuiMenu2LinkItem',
  slot: 'endAdornment',
})({});

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2LinkItem API](https://next.mui.com/material-ui/api/menu-2-link-item/)
 */
const Menu2LinkItem = React.forwardRef(function Menu2LinkItem(
  inProps: Menu2LinkItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2LinkItem',
  });

  const {
    className,
    classes: classesProp,
    disableGutters = false,
    disableRipple,
    divider = false,
    endAdornment,
    inset = false,
    render: renderProp,
    slots,
    slotProps,
    startAdornment,
    sx,
    style,
    ...other
  } = props;
  // Base UI link items have no disabled state.
  const ownerState = {
    ...props,
    disableGutters,
    divider,
    inset,
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2LinkItemClasses>(
    ownerState,
    getMenu2LinkItemUtilityClass,
  );

  return (
    <BaseMenu.LinkItem
      ref={ref}
      render={(renderProps, state) => {
        const itemOwnerState = { ...ownerState, ...state };
        return (
          <Menu2ItemRootSlot<Menu2LinkItemOwnerState, Menu2LinkItemState>
            baseProps={renderProps}
            ownerState={itemOwnerState}
            elementType={Menu2LinkItemRoot}
            defaultComponent="a"
            component={renderProp ? Menu2RenderRoot : undefined}
            disableRipple={disableRipple}
            internalRender={renderProp}
            internalRenderState={state}
            slots={slots}
            slotProps={slotProps}
            sx={sx}
            {...getMenu2ItemAdornments({
              classes,
              endAdornment,
              EndAdornment: Menu2LinkItemEndAdornment,
              inset,
              ownerState: itemOwnerState,
              startAdornment,
              StartAdornment: Menu2LinkItemStartAdornment,
            })}
          />
        );
      }}
      className={mergeMenu2ItemClassName(className, classes, ownerState)}
      style={style}
      {...other}
    />
  );
});

export type Menu2LinkItemState = BaseMenu.LinkItem.State;

export interface Menu2LinkItemOwnerState
  extends
    Omit<Menu2LinkItemProps, keyof Menu2ItemBaseOwnerState>,
    Omit<Menu2ItemBaseOwnerState, 'disabled'> {
  /** Whether Base UI currently highlights the item. */
  highlighted: boolean;
}

export interface Menu2LinkItemSlots {
  /**
   * The component that renders the root.
   * Replaces the default styled root and takes precedence over `render`.
   * @default Menu2LinkItemRoot
   */
  root?: React.ElementType | undefined;
}

export interface Menu2LinkItemSlotProps {
  root?: Menu2RootSlotProps<Menu2LinkItemOwnerState, 'a'>['root'] | undefined;
}

export interface Menu2LinkItemProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
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
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to an anchor element to preserve link behavior, Material styles, and ripple.
   * Put content in the children prop of Menu2LinkItem. Replacing the supplied children can remove the ripple.
   * Applies to the default root only. Use `slots.root` to replace the styled root.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<React.ComponentPropsWithRef<'a'>, 'color'>, Menu2LinkItemState>
    | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

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
   * Content after the label, such as a keyboard shortcut.
   */
  endAdornment: PropTypes.node,
  /**
   * The URL that the link item points to.
   */
  href: PropTypes.string,
  /**
   * If `true`, the item keeps an empty start adornment column.
   * Its label then aligns with the labels of items that have a start adornment.
   * It has no effect when `startAdornment` is set.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label: PropTypes.string,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to an anchor element to preserve link behavior, Material styles, and ripple.
   * Put content in the children prop of Menu2LinkItem. Replacing the supplied children can remove the ripple.
   * Applies to the default root only. Use `slots.root` to replace the styled root.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
   * Content before the label, such as an icon.
   */
  startAdornment: PropTypes.node,
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
