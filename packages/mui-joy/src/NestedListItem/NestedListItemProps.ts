import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';
import { NestedListItemClasses } from './nestedListItemClasses';

export type NestedListItemSlot = 'root' | 'secondaryAction';

export interface NestedListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<NestedListItemClasses>;
    /**
     * The element to display at the end of NestedListItem.
     */
    secondaryAction?: React.ReactNode;
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type NestedListItemProps<
  D extends React.ElementType = NestedListItemTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<NestedListItemTypeMap<P, D>, D>;
