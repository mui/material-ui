import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';

export interface NestedListPropsSizeOverrides {}

export interface NestedListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type NestedListProps<
  D extends React.ElementType = NestedListTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<NestedListTypeMap<P, D>, D>;
