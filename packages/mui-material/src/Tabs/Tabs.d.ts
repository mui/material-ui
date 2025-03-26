import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { Theme } from '../styles';
import TabScrollButton, { TabScrollButtonProps } from '../TabScrollButton';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TabsClasses } from './tabsClasses';
import SvgIcon from '../SvgIcon';

export interface TabsPropsIndicatorColorOverrides {}

export interface TabsRootSlotPropsOverrides {}
export interface TabsScrollerSlotPropsOverrides {}
export interface TabsListSlotPropsOverrides {}
export interface TabsScrollbarSlotPropsOverrides {}
export interface TabsIndicatorSlotPropsOverrides {}
export interface TabsScrollButtonsSlotPropsOverrides {}
export interface TabsStartScrollButtonIconSlotPropsOverrides {}
export interface TabsEndScrollButtonIconSlotPropsOverrides {}

export interface TabsSlots {
  /**
   * The component used for the popper.
   * @default div
   */
  root: React.ElementType;
  /**
   * The component used for the scroller.
   * @default div
   */
  scroller: React.ElementType;
  /**
   * The component used for the flex container.
   * @default div
   */
  list: React.ElementType;
  /**
   * The component used for the scroller.
   * @default ScrollbarSize
   */
  scrollbar: React.ElementType;
  /**
   * The component used for the tab indicator.
   * @default span
   */
  indicator: React.ElementType;
  /**
   * The component used for the scroll button.
   * @default TabScrollButton
   */
  scrollButtons: React.ElementType;
  /**
   * The component used for the start scroll button icon.
   * @default KeyboardArrowLeft
   */
  startScrollButtonIcon: React.ElementType;
  /**
   * The component used for the end scroll button icon.
   * @default KeyboardArrowRight
   */
  endScrollButtonIcon: React.ElementType;
}

export type TabsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TabsSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the div element.
     */
    root: SlotProps<'div', TabsRootSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the scroller slot.
     * By default, the avaible props are based on the div element.
     */
    scroller: SlotProps<'div', TabsScrollerSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the list slot.
     * By default, the avaible props are based on the div element.
     */
    list: SlotProps<'div', TabsListSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the scrollbar slot.
     * By default, the avaible props are based on the div element.
     */
    scrollbar: SlotProps<
      'div',
      { onChange?: (scrollbarWidth: undefined | number) => void } & TabsScrollbarSlotPropsOverrides,
      TabsOwnerState
    >;
    /**
     * Props forwarded to the indicator slot.
     * By default, the avaible props are based on the span element.
     */
    indicator: SlotProps<'span', TabsIndicatorSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the scrollButton slot.
     * By default, the avaible props are based on the [TabScrollButton](https://mui.com/material-ui/api/tab-scroll-button/#props) component.
     */
    scrollButtons: SlotProps<
      typeof TabScrollButton,
      TabsScrollButtonsSlotPropsOverrides,
      TabsOwnerState
    >;
    /**
     * Props forwarded to the startScrollButtonIcon slot.
     * By default, the avaible props are based on the [SvgIcon](https://mui.com/material-ui/api/svg-icon/#props) component.
     */
    startScrollButtonIcon: SlotProps<
      typeof SvgIcon,
      TabsStartScrollButtonIconSlotPropsOverrides,
      TabsOwnerState
    >;
    /**
     * Props forwarded to the endScrollButtonIcon slot.
     * By default, the avaible props are based on the [SvgIcon](https://mui.com/material-ui/api/svg-icon/#props) component.
     */
    endScrollButtonIcon: SlotProps<
      typeof SvgIcon,
      TabsEndScrollButtonIconSlotPropsOverrides,
      TabsOwnerState
    >;
  }
> & {
  slots?: {
    /**
     * @deprecated Use `slots.startScrollButtonIcon` instead.
     */
    StartScrollButtonIcon?: React.ElementType;
    /**
     * @deprecated Use `slots.endScrollButtonIcon` instead.
     */
    EndScrollButtonIcon?: React.ElementType;
  };
};

export interface TabsOwnerState extends Omit<TabsProps, 'slots' | 'slotProps'> {
  vertical: boolean;
  fixed: boolean;
  hideScrollbar: boolean;
  scrollableX: boolean;
  scrollableY: boolean;
  centered: boolean;
  scrollButtonsHideMobile: boolean;
}

export interface TabsOwnProps extends TabsSlotsAndSlotProps {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action?: React.Ref<TabsActions>;
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile?: boolean;
  /**
   * The label for the Tabs as a string.
   */
  'aria-label'?: string;
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby'?: string;
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered?: boolean;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabsClasses>;
  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor?: OverridableStringUnion<
    'secondary' | 'primary',
    TabsPropsIndicatorColorOverrides
  >;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The component used to render the scroll buttons.
   * @deprecated use the `slots.scrollButtons` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default TabScrollButton
   */
  ScrollButtonComponent?: React.ElementType;
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons?: 'auto' | true | false;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
  /**
   * Props applied to the tab indicator element.
   * @deprecated use the `slotProps.indicator` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default  {}
   */
  TabIndicatorProps?: React.HTMLAttributes<HTMLDivElement> & {
    sx?: SxProps<Theme>;
  };
  /**
   * Props applied to the [`TabScrollButton`](https://mui.com/material-ui/api/tab-scroll-button/) element.
   * @deprecated use the `slotProps.scrollButtons` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  TabScrollButtonProps?: Partial<TabScrollButtonProps>;
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor?: 'secondary' | 'primary' | 'inherit';
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value?: any;
  /**
   *  Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  - `fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface TabsTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & TabsOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [Tabs API](https://mui.com/material-ui/api/tabs/)
 */
declare const Tabs: OverridableComponent<TabsTypeMap>;

export interface TabsActions {
  updateIndicator(): void;
  updateScrollButtons(): void;
}

export type TabsProps<
  RootComponent extends React.ElementType = TabsTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TabsTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Tabs;
