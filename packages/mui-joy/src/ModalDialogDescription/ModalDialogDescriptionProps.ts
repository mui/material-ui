import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';

export type ModalDialogDescriptionSlot = 'root';

export interface ModalDialogDescriptionTypeMap<P = {}, D extends React.ElementType = 'div'> {
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

export type ModalDialogDescriptionProps<
  D extends React.ElementType = ModalDialogDescriptionTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalDialogDescriptionTypeMap<P, D>, D>;

export interface ModalDialogDescriptionOwnerState extends ModalDialogDescriptionProps {}
