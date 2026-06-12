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
  MenuPreviewItemBaseProps,
  MenuPreviewItemOwnerState,
  MenuPreviewItemVisualProps,
  menuPreviewItemOverridesResolver,
  useMenuPreviewItemUtilityClasses,
} from '../MenuPreview/menuPreviewItemShared';
import {
  getMenuPreviewRadioItemUtilityClass,
  menuPreviewRadioItemClasses,
  MenuPreviewRadioItemClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewRadioItemProps
  extends
    Omit<BaseMenu.RadioItem.Props, 'className'>,
    MenuPreviewItemBaseProps,
    MenuPreviewItemVisualProps<MenuPreviewRadioItemClasses> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Value of the radio item.
   */
  value: any;
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
   * @default false
   */
  closeOnClick?: boolean | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseMenu.RadioItem.Props['className'];
}

const MenuPreviewRadioItemRoot = styled('div', {
  name: 'MuiMenuPreviewRadioItem',
  slot: 'Root',
  overridesResolver: menuPreviewItemOverridesResolver,
})<{ ownerState: MenuPreviewItemOwnerState }>(
  memoTheme(({ theme }) => getMenuPreviewItemStyles(theme, menuPreviewRadioItemClasses)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewRadioItem API](https://mui.com/material-ui/api/menu-preview-radio-item/)
 */
const MenuPreviewRadioItem = React.forwardRef(function MenuPreviewRadioItem(
  inProps: MenuPreviewRadioItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewRadioItem',
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
  const classes = useMenuPreviewItemUtilityClasses<MenuPreviewRadioItemClasses>(
    ownerState,
    getMenuPreviewRadioItemUtilityClass,
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
      <BaseMenu.RadioItem
        ref={ref}
        render={render ?? <MenuPreviewRadioItemRoot ownerState={ownerState} sx={sx} />}
        className={mergeStateClassName(className, (state) =>
          clsx(
            getMenuPreviewItemClassName(classes, ownerState, state),
            state.checked && classes.checked,
          ),
        )}
        disabled={disabled}
        {...other}
      />
    </ListContext.Provider>
  );
});

MenuPreviewRadioItem.propTypes /* remove-proptypes */ = {
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
   * Whether to close the menu when the item is clicked.
   * @default false
   */
  closeOnClick: PropTypes.bool,
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
  /**
   * Value of the radio item.
   */
  value: PropTypes.any.isRequired,
} as any;

export default MenuPreviewRadioItem;
