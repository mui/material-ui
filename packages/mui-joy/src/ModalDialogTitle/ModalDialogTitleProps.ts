import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { ModalDialogProps } from '../ModalDialog/ModalDialogProps';

export type ModalDialogTitleSlot = 'root';

export interface ModalDialogTitleTypeMap<P = {}, D extends React.ElementType = 'h2'> {
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

export type ModalDialogTitleProps<
  D extends React.ElementType = ModalDialogTitleTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalDialogTitleTypeMap<P, D>, D>;

export interface ModalDialogTitleOwnerState extends ModalDialogTitleProps {
  size: ModalDialogProps['size'];
}
