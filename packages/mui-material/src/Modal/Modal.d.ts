import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverrideProps } from '@mui/types';
import {
  ExtendModalUnstyledTypeMap,
  ExtendModalUnstyled,
  ModalUnstyledTypeMap,
} from '@mui/base/ModalUnstyled';
import { Theme } from '../styles';
import { BackdropProps } from '../Backdrop';

export type ModalTypeMap<D extends React.ElementType = 'div', P = {}> = ExtendModalUnstyledTypeMap<{
  props: P & {
    /**
     * A backdrop component. This prop enables custom backdrop rendering.
     * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
     * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
     * @default styled(Backdrop, {
     *   name: 'MuiModal',
     *   slot: 'Backdrop',
     *   overridesResolver: (props, styles) => {
     *     return styles.backdrop;
     *   },
     * })({
     *   zIndex: -1,
     * })
     */
    BackdropComponent?: React.ElementType<BackdropProps>;
    /**
     * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
     * @deprecated Use `slotProps.backdrop` instead.
     */
    BackdropProps?: Partial<BackdropProps>;
    /**
     * The components used for each slot inside the Modal.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: {
      Root?: React.ElementType;
      Backdrop?: React.ElementType;
    };
    /**
     * The props used for each slot inside the Modal.
     * @default {}
     */
    componentsProps?: ModalUnstyledTypeMap['props']['slotProps'];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

type ModalRootProps = NonNullable<ModalTypeMap['props']['slotProps']>['root'];

export declare const ModalRoot: React.FC<ModalRootProps>;

export type ModalClassKey = keyof NonNullable<ModalTypeMap['props']['classes']>;

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * *   [Dialog](https://mui.com/material-ui/api/dialog/)
 * *   [Drawer](https://mui.com/material-ui/api/drawer/)
 * *   [Menu](https://mui.com/material-ui/api/menu/)
 * *   [Popover](https://mui.com/material-ui/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](https://mui.com/material-ui/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 *
 * Demos:
 *
 * - [Modal](https://mui.com/material-ui/react-modal/)
 *
 * API:
 *
 * - [Modal API](https://mui.com/material-ui/api/modal/)
 */
declare const Modal: ExtendModalUnstyled<ModalTypeMap>;

export type ModalClasses = Record<ModalClassKey, string>;

export declare const modalClasses: ModalClasses;

export type ModalProps<
  D extends React.ElementType = ModalTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ModalTypeMap<D, P>, D>;

export default Modal;
