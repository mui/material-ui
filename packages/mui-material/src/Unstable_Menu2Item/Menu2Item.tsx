'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import Menu2ItemRoot from '../internal/Menu2ItemBase';
import Menu2RenderRoot from '../internal/Menu2RenderRoot';
import { useDefaultProps } from '../DefaultPropsProvider';
import type {
  Menu2ItemBaseOwnerState,
  Menu2ItemBaseProps,
  Menu2ItemVisualProps,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2ItemAdornments,
  getMenu2ItemOwnerState,
  Menu2ItemRootSlot,
  mergeMenu2ItemClassName,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import type { Menu2ItemClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2ItemUtilityClass } from '../Unstable_Menu2/menu2Classes';
import type { Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
import {
  Menu2ItemEndAdornment,
  Menu2ItemStartAdornment,
} from '../Unstable_Menu2/Menu2ItemAdornment';

export type Menu2ItemState = BaseMenu.Item.State;

export interface Menu2ItemOwnerState extends Menu2ItemBaseOwnerState {
  /** Whether Base UI currently highlights the item. */
  highlighted: boolean;
}

export interface Menu2ItemSlots {
  /**
   * The component that renders the root.
   * Replaces the default styled root and takes precedence over `render`.
   * @default Menu2ItemRoot
   */
  root?: React.ElementType | undefined;
}

export interface Menu2ItemSlotProps {
  root?: Menu2RootSlotProps<Menu2ItemOwnerState>['root'] | undefined;
}

export interface Menu2ItemProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    Menu2ItemBaseProps,
    Menu2ItemVisualProps<Menu2ItemClasses, Menu2ItemSlots, Menu2ItemSlotProps> {
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
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * Whether the item renders a native `<button>` element.
   * Inferred from `slots.root="button"` or a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton?: boolean | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to the element to preserve Material styles and ripple.
   * Put content in the children prop of Menu2Item. Replacing the supplied children can remove the ripple.
   * Applies to the default root only. Use `slots.root` to replace the styled root.
   */
  render?:
    React.ReactElement | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2ItemState> | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Item API](https://next.mui.com/material-ui/api/menu-2-item/)
 */
const Menu2Item = React.forwardRef(function Menu2Item(
  inProps: Menu2ItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Item',
  });

  const {
    className,
    classes: classesProp,
    disabled = false,
    disableGutters = false,
    disableRipple,
    divider = false,
    endAdornment,
    inset = false,
    nativeButton: nativeButtonProp,
    render: renderProp,
    slots,
    slotProps,
    startAdornment,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    ...getMenu2ItemOwnerState({ disabled, disableGutters, divider, inset }),
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2ItemClasses>(
    ownerState,
    getMenu2ItemUtilityClass,
  );
  const nativeButton =
    nativeButtonProp ??
    (slots?.root
      ? slots.root === 'button'
      : React.isValidElement(renderProp) && renderProp.type === 'button');

  return (
    <BaseMenu.Item
      ref={ref}
      render={(renderProps, state) => {
        const itemOwnerState = { ...ownerState, ...state };
        return (
          <Menu2ItemRootSlot<Menu2ItemOwnerState, Menu2ItemState>
            baseProps={renderProps}
            ownerState={itemOwnerState}
            elementType={Menu2ItemRoot}
            component={renderProp ? Menu2RenderRoot : undefined}
            disableRipple={disableRipple}
            nativeButton={nativeButton}
            internalRender={renderProp}
            internalRenderState={state}
            slots={slots}
            slotProps={slotProps}
            sx={sx}
            {...getMenu2ItemAdornments({
              classes,
              endAdornment,
              EndAdornment: Menu2ItemEndAdornment,
              inset,
              ownerState: itemOwnerState,
              startAdornment,
              StartAdornment: Menu2ItemStartAdornment,
            })}
          />
        );
      }}
      className={mergeMenu2ItemClassName(className, classes, ownerState)}
      disabled={disabled}
      nativeButton={nativeButton}
      style={style}
      {...other}
    />
  );
});

Menu2Item.propTypes /* remove-proptypes */ = {
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
   * Whether the item renders a native `<button>` element.
   * Inferred from `slots.root="button"` or a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   * @default false
   */
  nativeButton: PropTypes.bool,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to the element to preserve Material styles and ripple.
   * Put content in the children prop of Menu2Item. Replacing the supplied children can remove the ripple.
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

export default Menu2Item;
