import * as React from 'react';
import { SxProps } from '@mui/system';
import { SlotComponentProps } from '@mui/base';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { TabScrollButtonProps } from '../TabScrollButton';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TabsClasses } from './tabsClasses';
import SvgIcon from '../SvgIcon';

export interface TabsPropsIndicatorColorOverrides {}

export interface TabsStartScrollButtonIconSlotPropsOverrides {}
export interface TabsEndScrollButtonIconSlotPropsOverrides {}

export interface TabsOwnerState extends TabsProps {
  vertical: boolean;
  fixed: boolean;
  hideScrollbar: boolean;
  scrollableX: boolean;
  scrollableY: boolean;
  centered: boolean;
  scrollButtonsHideMobile: boolean;
}

export interface TabsOwnProps {
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
   * The components used for each slot inside.
   * @default {}
   */
  slots?: {
    StartScrollButtonIcon?: React.ElementType;
    EndScrollButtonIcon?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps?: {
    startScrollButtonIcon?: SlotComponentProps<
      typeof SvgIcon,
      TabsStartScrollButtonIconSlotPropsOverrides,
      TabsOwnerState
    >;
    endScrollButtonIcon?: SlotComponentProps<
      typeof SvgIcon,
      TabsEndScrollButtonIconSlotPropsOverrides,
      TabsOwnerState
    >;
  };
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
   * @default  {}
   */
  TabIndicatorProps?: React.HTMLAttributes<HTMLDivElement> & {
    sx?: SxProps<Theme>;
  };
  /**
   * Props applied to the [`TabScrollButton`](/material-ui/api/tab-scroll-button/) element.
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
   *  -`fullWidth` will make the tabs grow to use all the available space,
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
