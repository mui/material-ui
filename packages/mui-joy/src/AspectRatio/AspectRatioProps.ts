import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type AspectRatioSlot = 'root' | 'content';

export interface AspectRatioSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the content.
   * @default 'div'
   */
  content?: React.ElementType;
}

export interface AspectRatioPropsColorOverrides {}
export interface AspectRatioPropsVariantOverrides {}

export type AspectRatioSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AspectRatioSlots,
  {
    root: SlotProps<'div', {}, AspectRatioOwnerState>;
    content: SlotProps<'div', {}, AspectRatioOwnerState>;
  }
>;

export interface AspectRatioTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    AspectRatioSlotsAndSlotProps & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, AspectRatioPropsColorOverrides>;
      /**
       * Used to render icon or text elements inside the AspectRatio if `src` is not set.
       * This can be an element, or just a string.
       */
      children?: React.ReactNode;
      /**
       * By default, the AspectRatio will maintain the aspect ratio of its content.
       * Set this prop to `true` when the container is a flex row and you want the AspectRatio to fill the height of its container.
       * @default false
       */
      flex?: boolean;
      /**
       * The minimum calculated height of the element (not the CSS height).
       */
      minHeight?: number | string;
      /**
       * The maximum calculated height of the element (not the CSS height).
       */
      maxHeight?: number | string;
      /**
       * The CSS object-fit value of the first-child.
       * @default 'cover'
       */
      objectFit?: React.CSSProperties['objectFit'];
      /**
       * The aspect-ratio of the element. The current implementation uses padding instead of the CSS aspect-ratio due to browser support.
       * https://caniuse.com/?search=aspect-ratio
       * @default '16 / 9'
       */
      ratio?: number | string;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'soft'
       */
      variant?: OverridableStringUnion<VariantProp, AspectRatioPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type AspectRatioProps<
  D extends React.ElementType = AspectRatioTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AspectRatioTypeMap<P, D>, D>;

export interface AspectRatioOwnerState extends ApplyColorInversion<AspectRatioProps> {}
