import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { TabsUnstyledOwnProps } from '@mui/base/TabsUnstyled';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type TabsSlot = 'root';

export interface TabsPropsColorOverrides {}

export interface TabsPropsVariantOverrides {}

export interface TabsPropsSizeOverrides {}

export interface TabsTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<TabsUnstyledOwnProps, 'components' | 'componentsProps'> & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, TabsPropsColorOverrides>;
      /**
       * The size of the component.
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', TabsPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The variant to use.
       * @default 'plain'
       */
      variant?: OverridableStringUnion<VariantProp, TabsPropsVariantOverrides>;
      /**
       * If `true`, the tab items are rendered vertically.
       */
      vertical?: boolean;
    };
  defaultComponent: D;
}

export type TabsProps<
  D extends React.ElementType = TabsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TabsTypeMap<P, D>, D>;

export type TabsOwnerState = TabsProps & {
  orientation: 'horizontal' | 'vertical';
  direction: 'ltr' | 'rtl';
};
