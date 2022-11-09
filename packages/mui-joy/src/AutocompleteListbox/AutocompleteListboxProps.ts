import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ListProps } from '../List/ListProps';
import { SxProps } from '../styles/types';

export type AutocompleteListboxSlot = 'root';

export interface AutocompleteListboxTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: ListProps['color'];
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: ListProps['variant'];
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: ListProps['size'];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type AutocompleteListboxProps<
  D extends React.ElementType = AutocompleteListboxTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<AutocompleteListboxTypeMap<P, D>, D>;

export interface AutocompleteListboxOwnerState extends AutocompleteListboxProps {}
