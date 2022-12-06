import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type BreadcrumbsSlot = 'root' | 'ol' | 'li' | 'separator';

export interface BreadcrumbsPropsSizeOverrides {}

export type BreadcrumbsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  BreadcrumbsSlot,
  {
    root: SlotProps<'nav', {}, BreadcrumbsOwnerState>;
    ol: SlotProps<'ol', {}, BreadcrumbsOwnerState>;
    li: SlotProps<'li', {}, BreadcrumbsOwnerState>;
    separator: SlotProps<'li', {}, BreadcrumbsOwnerState>;
  }
>;

export interface BreadcrumbsTypeMap<P = {}, D extends React.ElementType = 'nav'> {
  props: P &
    BreadcrumbsSlotsAndSlotProps & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Custom separator node.
       * @default '/'
       */
      separator?: React.ReactNode;
      /**
       * The size of the component.
       * It accepts theme values between 'sm' and 'lg'.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', BreadcrumbsPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type BreadcrumbsProps<
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<BreadcrumbsTypeMap<P, D>, D>;

export interface BreadcrumbsOwnerState extends BreadcrumbsProps {}
