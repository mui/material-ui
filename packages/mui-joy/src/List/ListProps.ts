import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { ListClasses } from './listClasses';

export type ListSlot = 'root';

export interface ListPropsSizeOverrides {}

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListClasses>;
    /**
     * If `true`, display the list in horizontal direction.
     */
    row?: boolean;
    /**
     * The size of the component (affect other nested list* components).
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ListPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListTypeMap<P, D>, D>;
