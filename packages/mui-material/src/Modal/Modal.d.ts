import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base';
import {
  ModalTypeMap as BaseModalTypeMap,
  ModalClasses as BaseModalClasses,
} from '@mui/base/Modal';
import { Theme } from '../styles';
import Backdrop, { BackdropProps } from '../Backdrop';
import { OverridableComponent } from '../OverridableComponent';

export interface ModalComponentsPropsOverrides {}

export interface ModalOwnerState extends ModalProps {
  exited: boolean;
}

export interface ModalTypeMap<
  DefaultComponent extends React.ElementType = 'div',
  AdditionalProps = {},
> {
  props: AdditionalProps & {
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
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<BaseModalClasses>;
    /**
     * @ignore
     */
    className?: string;
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components?: {
      Root?: React.ElementType;
      Backdrop?: React.ElementType;
    };
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * This prop is an alias for the `slotProps` prop.
     * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
     *
     * @default {}
     */
    componentsProps?: {
      root?: SlotComponentProps<'div', ModalComponentsPropsOverrides, ModalOwnerState>;
      backdrop?: SlotComponentProps<
        typeof Backdrop,
        ModalComponentsPropsOverrides,
        ModalOwnerState
      >;
    };
    /**
     * The props used for each slot inside the Modal.
     * @default {}
     */
    slotProps?: {
      root?: SlotComponentProps<'div', ModalComponentsPropsOverrides, ModalOwnerState>;
      backdrop?: SlotComponentProps<
        typeof Backdrop,
        ModalComponentsPropsOverrides,
        ModalOwnerState
      >;
    };
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  } & Omit<BaseModalTypeMap['props'], 'slotProps'>;
  defaultComponent: DefaultComponent;
}

type ModalRootProps = NonNullable<ModalTypeMap['props']['slotProps']>['root'];

export declare const ModalRoot: React.FC<ModalRootProps>;

export type ModalClassKey = keyof NonNullable<ModalProps['classes']>;

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
declare const Modal: OverridableComponent<ModalTypeMap>;

export type ModalClasses = Record<ModalClassKey, string>;

export declare const modalClasses: ModalClasses;

export type ModalProps<
  RootComponent extends React.ElementType = ModalTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ModalTypeMap<RootComponent, AdditionalProps>, RootComponent> & {
  component?: React.ElementType;
};

export default Modal;
