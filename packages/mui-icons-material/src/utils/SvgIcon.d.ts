import { OverridableStringUnion, OverrideProps, OverridableComponent } from '@mui/types';
import * as React from 'react';
import { SxProps } from '@mui/system';

export interface SvgIconPropsFontSizeOverrides {}
export interface SvgIconPropsSizeOverrides {}
export interface SvgIconPropsColorOverrides {}

export interface SvgIconTypeMap<P = {}, D extends React.ElementType = 'svg'> {
  props: P & {
    /**
     * Node passed into the SVG element.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
     */
    color?: OverridableStringUnion<
      | 'inherit'
      | 'action'
      | 'disabled'
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning',
      SvgIconPropsColorOverrides
    >;
    /**
     * The theme's fontSize applied to the icon that will override the `size` prop.
     * Use this prop when you want to use a specific font-size from the theme.
     */
    fontSize?: OverridableStringUnion<
      'inherit' | 'large' | 'medium' | 'small',
      SvgIconPropsFontSizeOverrides
    >;
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor?: string;
    /**
     * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
     * prop will be ignored.
     * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
     * `component`'s viewBox to the root node.
     * @default false
     */
    inheritViewBox?: boolean;
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     */
    shapeRendering?: string;
    /**
     * The size of the component.
     * @default 'inherit'
     */
    size?: OverridableStringUnion<'inherit', SvgIconPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<any>;
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess?: string;
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox?: string;
  };
  defaultComponent: D;
}

export type SvgIconProps<
  D extends React.ElementType = SvgIconTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<SvgIconTypeMap<P, D>, D>;

declare const SvgIcon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
