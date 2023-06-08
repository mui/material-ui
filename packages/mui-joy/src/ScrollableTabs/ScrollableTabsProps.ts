import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ScrollableTabsOwnProps } from '@mui/base/ScrollableTabs';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ScrollableTabsSlot = 'root';

export interface ScrollableTabsSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the scrollable element.
   * @default 'div'
   */
  scroller?: React.ElementType;
  /**
   * The component that renders the scroll buttons at the start.
   * @default 'div'
   */
  scrollButtonStart?: React.ElementType;
  /**
   * The component that renders the scroll buttons at the end.
   * @default 'div'
   */
  scrollButtonEnd?: React.ElementType;
}

export type ScrollableTabsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ScrollableTabsSlots,
  {
    root: SlotProps<'div', {}, ScrollableTabsOwnerState>;
    scroller: SlotProps<'div', {}, ScrollableTabsOwnerState>;
    scrollButtonStart: SlotProps<'div', {}, ScrollableTabsOwnerState>;
    scrollButtonEnd: SlotProps<'div', {}, ScrollableTabsOwnerState>;
  }
>;

export interface TabsPropsColorOverrides {}
export interface TabsPropsVariantOverrides {}
export interface TabsPropsSizeOverrides {}

export interface ScrollableTabsTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<ScrollableTabsOwnProps, 'slots' | 'slotProps'> & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, TabsPropsColorOverrides>;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', TabsPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'plain'
       */
      variant?: OverridableStringUnion<VariantProp, TabsPropsVariantOverrides>;
    } & ScrollableTabsSlotsAndSlotProps;
  defaultComponent: D;
}

export type ScrollableTabsProps<
  D extends React.ElementType = ScrollableTabsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ScrollableTabsTypeMap<P, D>, D>;

export interface ScrollableTabsOwnerState extends ApplyColorInversion<ScrollableTabsProps> {}
