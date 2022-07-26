import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { TabPanelUnstyledOwnProps } from '@mui/base/TabPanelUnstyled';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type TabPanelSlot = 'root';

export interface TabPanelPropsColorOverrides {}

export interface TabPanelPropsVariantOverrides {}

export interface TabPanelTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<TabPanelUnstyledOwnProps, 'components' | 'componentsProps'> & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, TabPanelPropsColorOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The variant to use.
       * @default 'plain'
       */
      variant?: OverridableStringUnion<VariantProp, TabPanelPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type TabPanelProps<
  D extends React.ElementType = TabPanelTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TabPanelTypeMap<P, D>, D>;

export type TabPanelOwnerState = TabPanelProps & {
  hidden: boolean;
};
