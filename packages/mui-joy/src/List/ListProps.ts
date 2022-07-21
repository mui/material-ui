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
     * @default false
     */
    row?: boolean;
    /**
     * If `true`, this list creates new list CSS variables scope to prevent the children from inheriting variables from the upper parent.
     * This props is used in the listbox of Menu, Select.
     * @default false
     */
    scoped?: boolean;
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
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
