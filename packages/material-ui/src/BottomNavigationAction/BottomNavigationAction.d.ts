import * as React from 'react';
import { ButtonBaseTypeMap, ExtendButtonBase } from '../ButtonBase';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const BottomNavigationAction: ExtendButtonBase<{
  props: {
    icon?: string | React.ReactElement;
    label?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    onClick?: React.ReactEventHandler<any>;
    selected?: boolean;
    showLabel?: boolean;
    value?: any;
  };
  defaultComponent: ButtonBaseTypeMap['defaultComponent'];
  classKey: BottomNavigationActionClassKey;
}>;

export type BottomNavigationActionClassKey = 'root' | 'selected' | 'iconOnly' | 'wrapper' | 'label';

export type BottomNavigationActionProps = SimplifiedPropsOf<typeof BottomNavigationAction>;

export default BottomNavigationAction;
