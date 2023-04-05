import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';

export type ModalOverflowSlot = 'root';

export interface ModalOverflowTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ModalOverflowProps<
  D extends React.ElementType = ModalOverflowTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalOverflowTypeMap<P, D>, D>;

export interface ModalOverflowOwnerState extends ModalOverflowProps {}
