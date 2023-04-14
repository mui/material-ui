import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, FontSize, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type SvgIconSlot = 'root';

export interface SvgIconSlots {
  /**
   * The component that renders the root.
   * @default 'svg'
   */
  root?: React.ElementType;
}

export type SvgIconSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SvgIconSlots,
  {
    root: SlotProps<'svg', {}, SvgIconOwnerState>;
  }
>;

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
     * @default 'inherit'
     */
    color?: OverridableStringUnion<'inherit' | ColorPaletteProp, SvgIconPropsSizeOverrides>;
    /**
     * The fontSize applied to the icon. Defaults to 1rem, but can be configure to inherit font size.
     * @default 'xl'
     */
    fontSize?: OverridableStringUnion<'inherit' | keyof FontSize, SvgIconPropsSizeOverrides>;
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
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
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
  } & SvgIconSlotsAndSlotProps;
  defaultComponent: D;
}

export type SvgIconProps<
  D extends React.ElementType = SvgIconTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<SvgIconTypeMap<P, D>, D>;

export interface SvgIconOwnerState extends ApplyColorInversion<SvgIconProps> {
  /**
   * The `size` specified explicitly on the instance.
   */
  instanceFontSize: SvgIconProps['fontSize'];
}
