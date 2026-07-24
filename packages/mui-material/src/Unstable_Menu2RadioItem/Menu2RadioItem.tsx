'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getMenu2ItemStyles } from '../Unstable_Menu2/menu2SharedStyles';
import {
  getMenu2RootRender,
  isMenu2RootNativeButton,
  Menu2RootSlotProps,
  resolveSlotProps,
} from '../Unstable_Menu2/menu2Utils';
import {
  getMenu2ItemClassName,
  getMenu2ItemOwnerState,
  Menu2ItemBaseProps,
  Menu2ItemOwnerState,
  Menu2ItemVisualProps,
  menu2ItemOverridesResolver,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2RadioItemUtilityClass,
  menu2RadioItemClasses,
  Menu2RadioItemClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2RadioItemSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
}

export interface Menu2RadioItemSlotProps extends Menu2RootSlotProps<Menu2ItemOwnerState> {}

export interface Menu2RadioItemProps
  extends
    Omit<BaseMenu.RadioItem.Props, 'className' | 'nativeButton' | 'render' | 'style'>,
    Menu2ItemBaseProps,
    Menu2ItemVisualProps<Menu2RadioItemClasses, Menu2RadioItemSlots, Menu2RadioItemSlotProps> {
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
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

const Menu2RadioItemRoot = styled('div', {
  name: 'MuiMenu2RadioItem',
  slot: 'Root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2ItemOwnerState }>(
  memoTheme(({ theme }) => getMenu2ItemStyles(theme, menu2RadioItemClasses)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [Menu2RadioItem API](https://mui.com/material-ui/api/menu-preview-radio-item/)
 */
const Menu2RadioItem = React.forwardRef(function Menu2RadioItem(
  inProps: Menu2RadioItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2RadioItem',
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
    ...getMenu2ItemOwnerState({ dense, disabled, disableGutters, divider, selected }),
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2RadioItemClasses>(
    ownerState,
    getMenu2RadioItemUtilityClass,
  );
  const childContext = React.useMemo(
    () => ({
      dense,
      disableGutters,
    }),
    [dense, disableGutters],
  );
  const RootSlot = slots?.root ?? Menu2RadioItemRoot;

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.RadioItem
        ref={ref}
        render={getMenu2RootRender(RootSlot, ownerState, {
          ...resolveSlotProps(slotProps?.root, ownerState),
          as: component,
          ownerState,
          sx,
        })}
        className={(state) =>
          clsx(
            className,
            getMenu2ItemClassName(classes, ownerState, state),
            state.checked && classes.checked,
          )
        }
        disabled={disabled}
        nativeButton={nativeButtonProp ?? isMenu2RootNativeButton(RootSlot, component)}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
});

Menu2RadioItem.propTypes /* remove-proptypes */ = {
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
  /**
   * Value of the radio item.
   */
  value: PropTypes.any.isRequired,
} as any;

export default Menu2RadioItem;
