'use client';
import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@mui/types';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import mergeSlotProps from '../utils/mergeSlotProps';
import useSlot from '../utils/useSlot';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import MenuItemBase from '../MenuItem/MenuItemBase';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getMenuItemHighlightStyles, menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import Menu2RadioItemIndicator, {
  Menu2RadioItemIndicatorProps,
} from '../Unstable_Menu2RadioItemIndicator';
import {
  getMenu2RootRender,
  isMenu2RootNativeButton,
  Menu2RootSlotProps,
  SlotProps,
  suppressButtonBaseKeyboardActivation,
} from '../Unstable_Menu2/menu2Utils';
import {
  getMenu2ItemClassName,
  getMenu2ItemOwnerState,
  Menu2ItemBaseProps,
  Menu2ItemOwnerState,
  Menu2ItemVisualProps,
  useMenu2ItemUtilityClasses,
} from '../Unstable_Menu2/menu2ItemShared';
import {
  getMenu2RadioItemUtilityClass,
  menu2RadioItemClasses,
  Menu2RadioItemClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2RadioItemOwnerState extends Menu2ItemOwnerState {
  /** Whether the item is currently checked, including uncontrolled selection. */
  checked: boolean;
  /** Whether Base UI currently highlights the item. */
  highlighted: boolean;
}

export interface Menu2RadioItemSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the check indicator.
   * @default Menu2RadioItemIndicator
   */
  indicator?: React.ElementType | undefined;
}

export interface Menu2RadioItemSlotProps extends Menu2RootSlotProps<Menu2RadioItemOwnerState> {
  indicator?:
    | SlotProps<
        Partial<Menu2RadioItemIndicatorProps> & Record<string, any>,
        Menu2RadioItemOwnerState
      >
    | undefined;
}

export interface Menu2RadioItemOwnProps
  extends
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
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
}

export interface Menu2RadioItemTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & Menu2RadioItemOwnProps;
  defaultComponent: RootComponent;
}

export type Menu2RadioItemProps<
  RootComponent extends React.ElementType = Menu2RadioItemTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<Menu2RadioItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
};

const Menu2RadioItemRoot = styled(MenuItemBase, {
  name: 'MuiMenu2RadioItem',
  slot: 'Root',
  overridesResolver: menuItemOverridesResolver,
})<{ ownerState: Menu2RadioItemOwnerState }>(
  memoTheme(({ theme }) => getMenuItemHighlightStyles(theme, menu2RadioItemClasses.highlighted)),
);

interface Menu2RadioItemRootSlotProps extends Pick<
  Menu2RadioItemProps,
  'component' | 'disableRipple' | 'slotProps' | 'slots' | 'sx'
> {
  baseProps: React.ComponentPropsWithRef<'div'>;
  ownerState: Menu2RadioItemOwnerState;
}

function Menu2RadioItemRootSlot({
  baseProps,
  ownerState,
  component,
  disableRipple,
  slotProps,
  slots,
  sx,
}: Menu2RadioItemRootSlotProps) {
  const externalSlotProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), {
    sx,
  });
  const [IndicatorSlot, indicatorProps] = useSlot('indicator', {
    elementType: Menu2RadioItemIndicator,
    externalForwardedProps: { slots, slotProps },
    ownerState,
    className: undefined,
    additionalProps: { keepMounted: true },
    shouldForwardComponentProp: true,
  });
  const [RootSlot, rootProps] = useSlot('root', {
    elementType: Menu2RadioItemRoot,
    externalForwardedProps: { slots, slotProps: { root: externalSlotProps } },
    ownerState,
    className: undefined,
    ref: null,
    // Base UI lets an external handler cancel its internal handler.
    getSlotProps: (handlers): React.ComponentPropsWithRef<'div'> => mergeProps(baseProps, handlers),
    additionalProps: {
      children: (
        <React.Fragment>
          {/* Reserve space even while the indicator is unchecked. */}
          <IndicatorSlot {...indicatorProps} />
          {baseProps.children}
        </React.Fragment>
      ),
    },
    shouldForwardComponentProp: true,
  });

  return getMenu2RootRender(
    RootSlot,
    ownerState,
    {
      ...rootProps,
      component: component ?? 'div',
      ...(disableRipple !== undefined && { disableRipple }),
      ...suppressButtonBaseKeyboardActivation(rootProps),
    },
    Menu2RadioItemRoot,
  );
}

Menu2RadioItemRootSlot.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  baseProps: PropTypes.object.isRequired,
  /**
   * The component used for the root node.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  ownerState: PropTypes.object.isRequired,
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
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
    children,
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
        render={(renderProps, state) => (
          <Menu2RadioItemRootSlot
            baseProps={renderProps}
            ownerState={{ ...ownerState, ...state }}
            component={component}
            disableRipple={disableRipple}
            slotProps={slotProps}
            slots={slots}
            sx={sx}
          />
        )}
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
      >
        {children}
      </BaseMenu.RadioItem>
    </ListContext.Provider>
  );
}) as OverridableComponent<Menu2RadioItemTypeMap>;

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
   * Either a string to use a HTML element or a component.
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
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
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
