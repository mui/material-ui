import * as React from 'react';
import { ModalOwnProps as BaseModalOwnProps } from '@mui/base/Modal';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type ModalSlot = 'root' | 'backdrop';

export interface ModalSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the backdrop.
   * @default 'div'
   */
  backdrop?: React.ElementType;
}

export type ModalSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ModalSlots,
  {
    root: SlotProps<'div', {}, ModalOwnerState>;
    backdrop: SlotProps<'div', {}, ModalOwnerState>;
  }
>;

export type ModalOwnProps = Pick<
  BaseModalOwnProps,
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
  | 'open'
> & {
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"closeClick"`.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'): void;
  }['bivarianceHack'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
};

export interface ModalTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & ModalOwnProps & ModalSlotsAndSlotProps;
  defaultComponent: D;
}

export type ModalProps<
  D extends React.ElementType = ModalTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalTypeMap<P, D>, D>;

export interface ModalOwnerState extends ModalProps {
  disableAutoFocus: boolean;
  disableEnforceFocus: boolean;
  disableEscapeKeyDown: boolean;
  disablePortal: boolean;
  disableRestoreFocus: boolean;
  disableScrollLock: boolean;
  hideBackdrop: boolean;
  keepMounted: boolean;
}
