import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BottomNavigationClasses } from './bottomNavigationClasses';

export interface BottomNavigationTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<BottomNavigationClasses>;
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
     * @default false
     */
    showLabels?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
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

export type BottomNavigationProps<
  D extends React.ElementType = BottomNavigationTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BottomNavigationTypeMap<P, D>, D>;

export default BottomNavigation;
