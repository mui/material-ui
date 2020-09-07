import * as React from 'react';
import ButtonBase from '../ButtonBase';
import { TabScrollButtonProps } from '../TabScrollButton';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TabsTypeMap<P = {}, D extends React.ElementType = typeof ButtonBase> {
  props: P & {
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
     * The label for the Tabs as a string.
     */
    'aria-label'?: string;
    /**
     * An id or list of ids separated by a space that label the Tabs.
     */
    'aria-labelledby'?: string;
    /**
     * If `true`, the tabs will be centered.
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
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `orientation="vertical"`. */
      vertical?: string;
      /** Styles applied to the flex container element. */
      flexContainer?: string;
      /** Styles applied to the flex container element if `orientation="vertical"`. */
      flexContainerVertical?: string;
      /** Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
      centered?: string;
      /** Styles applied to the tablist element. */
      scroller?: string;
      /** Styles applied to the tablist element if `!variant="scrollable"`. */
      fixed?: string;
      /** Styles applied to the tablist element if `variant="scrollable"` and `orientation="horizontal"`. */
      scrollableX?: string;
      /** Styles applied to the tablist element if `variant="scrollable"` and `orientation="vertical"`. */
      scrollableY?: string;
      /** Styles applied to the tablist element if `variant="scrollable"` and `visibleScrollbar={false}`. */
      hideScrollbar?: string;
      /** Styles applied to the `ScrollButtonComponent` component. */
      scrollButtons?: string;
      /** Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`. */
      scrollButtonsDesktop?: string;
      /** Styles applied to the `TabIndicator` component. */
      indicator?: string;
    };
    /**
     * Determines the color of the indicator.
     * @default 'secondary'
     */
    indicatorColor?: 'secondary' | 'primary';
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
     * @param {any} value We default to the index of the child (number)
     */
    onChange?: (event: React.SyntheticEvent, value: any) => void;
    /**
     * The tabs orientation (layout flow direction).
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
     * - `desktop` will only present them on medium and larger viewports.
     * - `on` will always present them.
     * - `off` will never present them.
     * @default 'auto'
     */
    scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';
    /**
     * If `true` the selected tab changes on focus. Otherwise it only
     * changes on activation.
     */
    selectionFollowsFocus?: boolean;
    /**
     * Props applied to the tab indicator element.
     * @default  {}
     */
    TabIndicatorProps?: Partial<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element.
     */
    TabScrollButtonProps?: Partial<TabScrollButtonProps>;
    /**
     * Determines the color of the `Tab`.
     * @default 'inherit'
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
     * If `true`, the scrollbar will be visible. It can be useful when displaying
     * a long vertical list of tabs.
     * @default false
     */
    visibleScrollbar?: boolean;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [Tabs API](https://material-ui.com/api/tabs/)
 */
declare const Tabs: OverridableComponent<TabsTypeMap>;

export type TabsClassKey = keyof NonNullable<TabsTypeMap['props']['classes']>;

export interface TabsActions {
  updateIndicator(): void;
  updateScrollButtons(): void;
}

export type TabsProps<
  D extends React.ElementType = TabsTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabsTypeMap<P, D>, D>;

export default Tabs;
