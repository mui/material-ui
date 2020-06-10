import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface IconTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The name of the icon font ligature.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: Exclude<PropTypes.Color, 'default'> | 'action' | 'disabled' | 'error';
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     */
    fontSize?: 'inherit' | 'default' | 'small' | 'large';
  };
  defaultComponent: D;
  classKey: IconClassKey;
}
/**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [Icon API](https://material-ui.com/api/icon/)
 */
declare const Icon: OverridableComponent<IconTypeMap>;

export type IconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSizeInherit'
  | 'fontSizeSmall'
  | 'fontSizeLarge';

export type IconProps<
  D extends React.ElementType = IconTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<IconTypeMap<P, D>, D>;

export default Icon;
