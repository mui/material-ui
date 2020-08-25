import * as React from 'react';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type BottomNavigationActionTypeMap<
  P,
  D extends React.ElementType
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the root element if selected. */
      selected?: string;
      /** Pseudo-class applied to the root element if `showLabel={false}` and not selected. */
      iconOnly?: string;
      /** Styles applied to the span element that wraps the icon and label. */
      wrapper?: string;
      /** Styles applied to the label's span element. */
      label?: string;
    };
    /**
     * The icon element.
     */
    icon?: React.ReactNode;
    /**
     * The label element.
     */
    label?: React.ReactNode;
    /**
     * If `true`, the `BottomNavigationAction` will show its label.
     * By default, only the selected `BottomNavigationAction`
     * inside `BottomNavigation` will show its label.
     */
    showLabel?: boolean;
    /**
     * You can provide your own value. Otherwise, we fallback to the child position index.
     */
    value?: any;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Bottom Navigation](https://material-ui.com/components/bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigationAction API](https://material-ui.com/api/bottom-navigation-action/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const BottomNavigationAction: ExtendButtonBase<BottomNavigationActionTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

export type BottomNavigationActionClassKey = keyof NonNullable<
  BottomNavigationActionProps['classes']
>;

export type BottomNavigationActionProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BottomNavigationActionTypeMap<P, D>, D>;

export default BottomNavigationAction;
