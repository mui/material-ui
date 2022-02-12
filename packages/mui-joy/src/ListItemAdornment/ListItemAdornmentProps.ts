import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';
import { ListItemAdornmentClasses } from './listItemAdornmentClasses';

export interface ListItemAdornmentTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListItemAdornmentClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListItemAdornmentProps<
  D extends React.ElementType = ListItemAdornmentTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemAdornmentTypeMap<P, D>, D>;
