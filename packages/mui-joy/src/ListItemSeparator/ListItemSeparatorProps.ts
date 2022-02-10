import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';
import { ListItemSeparatorClasses } from './listItemSeparatorClasses';

export interface ListItemSeparatorInsetOverrides {}

export interface ListItemSeparatorTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListItemSeparatorClasses>;
    /**
     * The empty space on the side(s) of the separator.
     */
    inset?: OverridableStringUnion<
      'gutter' | 'startAdornment' | 'startContent',
      ListItemSeparatorInsetOverrides
    >;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListItemSeparatorProps<
  D extends React.ElementType = ListItemSeparatorTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemSeparatorTypeMap<P, D>, D>;
