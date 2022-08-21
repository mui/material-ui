import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { ModalUnstyledOwnProps } from '@mui/base/ModalUnstyled';
import { SxProps } from '../styles/types';

export type ModalSlot = 'root' | 'backdrop';

interface ComponentsProps {
  root?: SlotComponentProps<'div', { sx?: SxProps }, ModalOwnerState>;
  backdrop?: SlotComponentProps<'div', { sx?: SxProps }, ModalOwnerState>;
}

export interface ModalTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<
      ModalUnstyledOwnProps,
      | 'children'
      | 'container'
      | 'disableAutoFocus'
      | 'disableEnforceFocus'
      | 'disableEscapeKeyDown'
      | 'disablePortal'
      | 'disableRestoreFocus'
      | 'disableScrollLock'
      | 'hideBackdrop'
      | 'keepMounted'
      | 'onClose'
      | 'open'
    > & {
      /**
       * The props used for each slot inside the Modal.
       * @default {}
       */
      componentsProps?: ComponentsProps;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type ModalProps<
  D extends React.ElementType = ModalTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalTypeMap<P, D>, D>;

export type ModalOwnerState = ModalProps & {
  disableAutoFocus: boolean;
  disableEnforceFocus: boolean;
  disableEscapeKeyDown: boolean;
  disablePortal: boolean;
  disableRestoreFocus: boolean;
  disableScrollLock: boolean;
  hideBackdrop: boolean;
  keepMounted: boolean;
};
