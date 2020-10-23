import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type TabTypeMap<P = {}, D extends React.ElementType = 'div'> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children?: null;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if both `icon` and `label` are provided. */
      labelIcon?: string;
      /** Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="inherit"`. */
      textColorInherit?: string;
      /** Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
      textColorPrimary?: string;
      /** Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="secondary"`. */
      textColorSecondary?: string;
      /** Pseudo-class applied to the root element if `selected={true}` (controlled by the Tabs component). */
      selected?: string;
      /** Pseudo-class applied to the root element if `disabled={true}` (controlled by the Tabs component). */
      disabled?: string;
      /** Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component). */
      fullWidth?: string;
      /** Styles applied to the root element if `wrapped={true}`. */
      wrapped?: string;
      /** Styles applied to the `icon` and `label`'s wrapper element. */
      wrapper?: string;
    };
    /**
     * If `true`, the tab will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * The icon element.
     */
    icon?: string | React.ReactElement;
    /**
     * The label element.
     */
    label?: React.ReactNode;
    /**
     * You can provide your own value. Otherwise, we fallback to the child position index.
     */
    value?: any;
    /**
     * Tab labels appear in a single row.
     * They can use a second line if needed.
     * @default false
     */
    wrapped?: boolean;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [Tab API](https://material-ui.com/api/tab/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const Tab: ExtendButtonBase<TabTypeMap>;

export type TabClassKey = keyof NonNullable<TabTypeMap['props']['classes']>;

export type TabProps<
  D extends React.ElementType = TabTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabTypeMap<P, D>, D>;

export default Tab;
