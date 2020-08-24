import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BottomNavigationTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
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
    };
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
     * @param {any} value We default to the index of the child.
     */
    onChange?: (event: React.SyntheticEvent, value: any) => void;
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
}
/**
 *
 * Demos:
 *
 * - [Bottom Navigation](https://material-ui.com/components/bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigation API](https://material-ui.com/api/bottom-navigation/)
 */
declare const BottomNavigation: OverridableComponent<BottomNavigationTypeMap>;

export type BottomNavigationClassKey = keyof NonNullable<
  BottomNavigationTypeMap['props']['classes']
>;

export type BottomNavigationProps<
  D extends React.ElementType = BottomNavigationTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BottomNavigationTypeMap<P, D>, D>;

export default BottomNavigation;
