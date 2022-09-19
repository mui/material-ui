import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { DividerClasses } from './dividerClasses';

export type DividerSlot = 'root';

export interface DividerInsetOverrides {}

export interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DividerClasses>;
    /**
     * The styles applied to the divider to shrink or stretch the line based on the orientation.
     * @default 'context'
     */
    inset?: OverridableStringUnion<'context' | 'fullscreen', DividerInsetOverrides>;
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type DividerProps<
  D extends React.ElementType = DividerTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<DividerTypeMap<P, D>, D>;

export interface DividerOwnerState extends DividerProps {
  /**
   * @internal
   * The internal prop for controlling CSS margin of the element.
   */
  'data-first-child'?: boolean;
}
