'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getMenuPreviewItemStyles } from '../MenuPreview/menuPreviewSharedStyles';
import { mergeStateClassName } from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewItemClassName,
  getMenuPreviewItemOwnerState,
  MenuPreviewItemOwnerState,
  MenuPreviewItemVisualProps,
  MenuPreviewSubmenuTriggerBaseProps,
  menuPreviewItemOverridesResolver,
  useMenuPreviewItemUtilityClasses,
} from '../MenuPreview/menuPreviewItemShared';
import {
  getMenuPreviewSubmenuTriggerUtilityClass,
  menuPreviewSubmenuTriggerClasses,
  MenuPreviewSubmenuTriggerClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewSubmenuTriggerProps
  extends
    Omit<BaseMenu.SubmenuTrigger.Props, 'className'>,
    MenuPreviewSubmenuTriggerBaseProps,
    MenuPreviewItemVisualProps<MenuPreviewSubmenuTriggerClasses> {
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
   * How long to wait before the submenu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay?: number | undefined;
  /**
   * How long to wait before closing the submenu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay?: number | undefined;
  /**
   * Whether the submenu should also open when the trigger is hovered.
   */
  openOnHover?: boolean | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseMenu.SubmenuTrigger.Props['className'];
}

const MenuPreviewSubmenuTriggerRoot = styled('div', {
  name: 'MuiMenuPreviewSubmenuTrigger',
  slot: 'Root',
  overridesResolver: menuPreviewItemOverridesResolver,
})<{ ownerState: MenuPreviewItemOwnerState }>(
  memoTheme(({ theme }) => getMenuPreviewItemStyles(theme, menuPreviewSubmenuTriggerClasses)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewSubmenuTrigger API](https://mui.com/material-ui/api/menu-preview-submenu-trigger/)
 */
const MenuPreviewSubmenuTrigger = React.forwardRef(function MenuPreviewSubmenuTrigger(
  inProps: MenuPreviewSubmenuTriggerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewSubmenuTrigger',
  });

  const {
    className,
    classes: classesProp,
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    render,
    selected = false,
    sx,
    ...other
  } = props;
  const ownerState = {
    ...props,
    ...getMenuPreviewItemOwnerState({ dense, disabled, disableGutters, divider, selected }),
    classes: classesProp,
  };
  const classes = useMenuPreviewItemUtilityClasses<MenuPreviewSubmenuTriggerClasses>(
    ownerState,
    getMenuPreviewSubmenuTriggerUtilityClass,
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
      <BaseMenu.SubmenuTrigger
        ref={ref}
        render={render ?? <MenuPreviewSubmenuTriggerRoot ownerState={ownerState} sx={sx} />}
        className={mergeStateClassName(className, (state) =>
          clsx(getMenuPreviewItemClassName(classes, ownerState, state), state.open && classes.open),
        )}
        disabled={disabled}
        {...other}
      />
    </ListContext.Provider>
  );
});

MenuPreviewSubmenuTrigger.propTypes /* remove-proptypes */ = {
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
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * How long to wait before closing the submenu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay: PropTypes.number,
  /**
   * How long to wait before the submenu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay: PropTypes.number,
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
   * Whether the submenu should also open when the trigger is hovered.
   */
  openOnHover: PropTypes.bool,
  /**
   * Allows you to replace the component's HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default MenuPreviewSubmenuTrigger;
