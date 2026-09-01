'use client';
import * as React from 'react';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import ButtonBase from '../ButtonBase';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getMenu2ItemStyles } from '../Unstable_Menu2/menu2SharedStyles';
import {
  getMenu2ItemOwnerState,
  Menu2ItemBaseProps,
  Menu2ItemOwnerState,
  Menu2ItemVisualProps,
  Menu2SubmenuTriggerContext,
  menu2ItemOverridesResolver,
  mergeMenu2ItemClassName,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2RootRender,
  isMenu2RootNativeButton,
  Menu2RootSlotProps,
  suppressButtonBaseKeyboardActivation,
} from '../Unstable_Menu2/menu2Utils';
import {
  getMenu2ItemUtilityClass,
  menu2ItemClasses,
  Menu2ItemClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2ItemSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
}

export interface Menu2ItemSlotProps extends Menu2RootSlotProps<Menu2ItemOwnerState> {}

export interface Menu2ItemProps
  extends
    Omit<BaseMenu.Item.Props, 'className' | 'nativeButton' | 'render' | 'style'>,
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
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

const Menu2ItemRoot = styled(ButtonBase, {
  name: 'MuiMenu2Item',
  slot: 'Root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2ItemOwnerState }>(
  memoTheme(({ theme }) => getMenu2ItemStyles(theme, menu2ItemClasses)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
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
    component,
    dense = false,
    disabled = false,
    disableGutters = false,
    disableRipple,
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
  const classes = useMenu2ItemUtilityClasses<Menu2ItemClasses>(
    ownerState,
    getMenu2ItemUtilityClass,
  );
  const childContext = React.useMemo(
    () => ({
      dense,
      disableGutters,
    }),
    [dense, disableGutters],
  );
  const RootSlot = slots?.root ?? Menu2ItemRoot;
  // As a submenu trigger the item shares its node with `Menu.SubmenuTrigger`,
  // which owns the highlight. The inner item reads the wrong menu's store.
  const isSubmenuTrigger = React.useContext(Menu2SubmenuTriggerContext);

  const rootSlotProps = resolveComponentProps(slotProps?.root, ownerState);

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.Item
        ref={ref}
        render={getMenu2RootRender(
          RootSlot,
          ownerState,
          {
            ...rootSlotProps,
            // ButtonBase renders a <button> by default; the items keep their element.
            component: component ?? 'div',
            // Pass it only when the caller sets it. An explicit prop beats the
            // `MuiButtonBase` default props, so ButtonBase resolves the default.
            ...(disableRipple !== undefined && { disableRipple }),
            ownerState,
            sx,
            // Base UI owns the Enter and Space activation of the item.
            ...suppressButtonBaseKeyboardActivation(rootSlotProps),
          },
          Menu2ItemRoot,
        )}
        className={mergeMenu2ItemClassName(className, classes, ownerState, isSubmenuTrigger)}
        disabled={disabled}
        nativeButton={nativeButtonProp ?? isMenu2RootNativeButton(RootSlot, component)}
        style={style}
        {...other}
      />
    </ListContext.Provider>
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

export default Menu2Item;
