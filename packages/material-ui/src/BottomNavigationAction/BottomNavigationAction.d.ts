import * as React from 'react';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type BottomNavigationActionTypeMap<
  P,
  D extends React.ElementType
> = ExtendButtonBaseTypeMap<{
  props: P & {
    icon?: string | React.ReactElement;
    label?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    onClick?: React.ReactEventHandler<any>;
    selected?: boolean;
    showLabel?: boolean;
    value?: any;
  };
  defaultComponent: D;
  classKey: BottomNavigationActionClassKey;
}>;

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/bottom-navigation Bottom Navigation}
 *
 * API:
 * - {@link https://material-ui.com/api/BottomNavigationAction BottomNavigationAction API}
 * - inherits {@link https://material-ui.com/api//api/button-base ButtonBase API}
 */
declare const BottomNavigationAction: ExtendButtonBase<
  BottomNavigationActionTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type BottomNavigationActionClassKey = 'root' | 'selected' | 'iconOnly' | 'wrapper' | 'label';

export type BottomNavigationActionProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BottomNavigationActionTypeMap<P, D>, D>;

export default BottomNavigationAction;
