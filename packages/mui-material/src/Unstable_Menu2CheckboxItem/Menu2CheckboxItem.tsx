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
  getMenu2CheckboxItemUtilityClass,
  menu2CheckboxItemClasses,
  Menu2CheckboxItemClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2CheckboxItemSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
}

export interface Menu2CheckboxItemSlotProps extends Menu2RootSlotProps<Menu2ItemOwnerState> {}

export interface Menu2CheckboxItemProps
  extends
    Omit<
      BaseMenu.CheckboxItem.Props,
      'className' | 'nativeButton' | 'onChange' | 'onCheckedChange' | 'render' | 'style'
    >,
    Menu2ItemBaseProps,
    Menu2ItemVisualProps<
      Menu2CheckboxItemClasses,
      Menu2CheckboxItemSlots,
      Menu2CheckboxItemSlotProps
    > {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the checkbox item is currently ticked.
   *
   * To render an uncontrolled checkbox item, use the `defaultChecked` prop instead.
   */
  checked?: boolean | undefined;
  /**
   * Whether the checkbox item is initially ticked.
   *
   * To render a controlled checkbox item, use the `checked` prop instead.
   * @default false
   */
  defaultChecked?: boolean | undefined;
  /**
   * Event handler called when the checkbox item is ticked or unticked.
   */
  onChange?:
    | ((
        event: Event,
        checked: boolean,
        eventDetails: BaseMenu.CheckboxItem.ChangeEventDetails,
      ) => void)
    | undefined;
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

const Menu2CheckboxItemRoot = styled('div', {
  name: 'MuiMenu2CheckboxItem',
  slot: 'Root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2ItemOwnerState }>(
  memoTheme(({ theme }) => getMenu2ItemStyles(theme, menu2CheckboxItemClasses)),
);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2CheckboxItem = React.forwardRef(function Menu2CheckboxItem(
  inProps: Menu2CheckboxItemProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2CheckboxItem',
  });

  const {
    checked,
    className,
    classes: classesProp,
    component,
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    nativeButton: nativeButtonProp,
    onChange,
    selected = false,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    ...getMenu2ItemOwnerState({
      checked,
      dense,
      disabled,
      disableGutters,
      divider,
      selected,
    }),
    classes: classesProp,
  };
  const classes = useMenu2ItemUtilityClasses<Menu2CheckboxItemClasses>(
    ownerState,
    getMenu2CheckboxItemUtilityClass,
  );
  const childContext = React.useMemo(
    () => ({
      dense,
      disableGutters,
    }),
    [dense, disableGutters],
  );
  const handleCheckedChange = React.useCallback(
    (newChecked: boolean, eventDetails: BaseMenu.CheckboxItem.ChangeEventDetails) => {
      onChange?.(eventDetails.event, newChecked, eventDetails);
    },
    [onChange],
  );
  const RootSlot = slots?.root ?? Menu2CheckboxItemRoot;

  return (
    <ListContext.Provider value={childContext}>
      <BaseMenu.CheckboxItem
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
        checked={checked}
        disabled={disabled}
        nativeButton={nativeButtonProp ?? isMenu2RootNativeButton(RootSlot, component)}
        onCheckedChange={handleCheckedChange}
        style={style}
        {...other}
      />
    </ListContext.Provider>
  );
});

Menu2CheckboxItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Whether the checkbox item is currently ticked.
   *
   * To render an uncontrolled checkbox item, use the `defaultChecked` prop instead.
   */
  checked: PropTypes.bool,
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
   * Whether the checkbox item is initially ticked.
   *
   * To render a controlled checkbox item, use the `checked` prop instead.
   * @default false
   */
  defaultChecked: PropTypes.bool,
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
   * Event handler called when the checkbox item is ticked or unticked.
   */
  onChange: PropTypes.func,
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

export default Menu2CheckboxItem;
