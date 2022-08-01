import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { TabPanelUnstyledOwnProps } from '@mui/base/TabPanelUnstyled';
import { SxProps } from '../styles/types';

export type TabPanelSlot = 'root';

export interface TabPanelPropsSizeOverrides {}

export interface TabPanelTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<TabPanelUnstyledOwnProps, 'components' | 'componentsProps'> & {
      /**
       * The size of the component.
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', TabPanelPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type TabPanelProps<
  D extends React.ElementType = TabPanelTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TabPanelTypeMap<P, D>, D>;

export type TabPanelOwnerState = TabPanelProps & {
  hidden: boolean;
  orientation?: 'horizontal' | 'vertical';
};
