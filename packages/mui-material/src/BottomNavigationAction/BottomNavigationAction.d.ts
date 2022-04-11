import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { BottomNavigationActionClasses } from './bottomNavigationActionClasses';

export type BottomNavigationActionTypeMap<
  P,
  D extends React.ElementType,
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
    classes?: Partial<BottomNavigationActionClasses>;
    /**
     * The icon to display.
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
     *
     * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
     */
    showLabel?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
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
 * - [Bottom navigation](https://mui.com/material-ui/react-bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigationAction API](https://mui.com/material-ui/api/bottom-navigation-action/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const BottomNavigationAction: ExtendButtonBase<
  BottomNavigationActionTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type BottomNavigationActionProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BottomNavigationActionTypeMap<P, D>, D>;

export default BottomNavigationAction;
