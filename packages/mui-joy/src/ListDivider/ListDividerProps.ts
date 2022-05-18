import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { ListDividerClasses } from './listDividerClasses';

export type ListDividerSlot = 'root';

export interface ListDividerInsetOverrides {}

export interface ListDividerTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListDividerClasses>;
    /**
     * The empty space on the side(s) of the divider.
     * This prop has no effect on the divider if the nearest parent List has `row` prop set to `true`.
     */
    inset?: OverridableStringUnion<
      'gutter' | 'startDecorator' | 'startContent',
      ListDividerInsetOverrides
    >;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListDividerProps<
  D extends React.ElementType = ListDividerTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListDividerTypeMap<P, D>, D>;
