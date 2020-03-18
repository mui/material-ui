import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BottomNavigationTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback.
     * @param {any} value We default to the index of the child.
     */
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    /**
     * If `true`, all `BottomNavigationAction`s will show their labels.
     * By default, only the selected `BottomNavigationAction` will show its label.
     */
    showLabels?: boolean;
    /**
     * The value of the currently selected `BottomNavigationAction`.
     */
    value?: any;
  };
  defaultComponent: D;
  classKey: BottomNavigationClassKey;
}

declare const BottomNavigation: OverridableComponent<BottomNavigationTypeMap>;

export type BottomNavigationClassKey = 'root';

export type BottomNavigationProps<
  D extends React.ElementType = BottomNavigationTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BottomNavigationTypeMap<P, D>, D>;

export default BottomNavigation;
