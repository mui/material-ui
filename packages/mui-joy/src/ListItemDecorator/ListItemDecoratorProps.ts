import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { ListItemDecoratorClasses } from './listItemDecoratorClasses';

export type ListItemDecoratorSlot = 'root';

export interface ListItemDecoratorTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListItemDecoratorClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListItemDecoratorProps<
  D extends React.ElementType = ListItemDecoratorTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemDecoratorTypeMap<P, D>, D>;

export interface ListItemDecoratorOwnerState extends ListItemDecoratorProps {
  /**
   * @internal
   * The orientation of the parent ListItemButton.
   */
  parentOrientation: 'horizontal' | 'vertical';
}
