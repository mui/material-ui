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
     * The icon element.
     */
    icon?: React.ReactNode;
    /**
     * The label element.
     */
    label?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    onClick?: React.ReactEventHandler<any>;
    selected?: boolean;
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
  classKey: BottomNavigationActionClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Bottom Navigation](https://mui.com/components/bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigationAction API](https://mui.com/api/bottom-navigation-action/)
 * - inherits [ButtonBase API](https://mui.com/api/button-base/)
 */
declare const BottomNavigationAction: ExtendButtonBase<BottomNavigationActionTypeMap<
  {},
  ButtonBaseTypeMap['defaultComponent']
>>;

export type BottomNavigationActionClassKey = 'root' | 'selected' | 'iconOnly' | 'wrapper' | 'label';

export type BottomNavigationActionProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BottomNavigationActionTypeMap<P, D>, D>;

export default BottomNavigationAction;
