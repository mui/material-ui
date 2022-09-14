import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ListItemButtonProps } from '../ListItemButton/ListItemButtonProps';
import { SxProps } from '../styles/types';

export type AutocompleteOptionSlot = 'root';

export interface AutocompleteOptionTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: ListItemButtonProps['color'];
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: ListItemButtonProps['variant'];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type AutocompleteOptionProps<
  D extends React.ElementType = AutocompleteOptionTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<AutocompleteOptionTypeMap<P, D>, D>;

export interface AutocompleteOptionOwnerState extends AutocompleteOptionProps {}
