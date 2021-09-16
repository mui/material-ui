import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DialogProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, DialogClassKey, 'children'> {
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby'?: string;
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby'?: string;
  /**
   * Dialog children, usually the included sub-components.
   */
  children?: React.ReactNode;
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   * @deprecated Use the onClose prop with the `reason` argument to filter the `backdropClick` events.
   */
  disableBackdropClick?: boolean;
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   */
  disableEscapeKeyDown?: boolean;
  /**
   * If `true`, the dialog will be full-screen
   */
  fullScreen?: boolean;
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   */
  fullWidth?: boolean;
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the onClose prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick?: ModalProps['onBackdropClick'];
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: ModalProps['onClose'];
  /**
   * Callback fired before the dialog enters.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEnter?: TransitionHandlerProps['onEnter'];
  /**
   * Callback fired when the dialog has entered.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntered?: TransitionHandlerProps['onEntered'];
  /**
   * Callback fired when the dialog is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntering?: TransitionHandlerProps['onEntering'];
  /**
   * Callback fired when the escape key is pressed,
   * `disableKeyboard` is false and the modal is in focus.
   * @deprecated Use the onClose prop with the `reason` argument to handle the `escapeKeyDown` events.
   */
  onEscapeKeyDown?: ModalProps['onEscapeKeyDown'];
  /**
   * Callback fired before the dialog exits.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExit?: TransitionHandlerProps['onExit'];
  /**
   * Callback fired when the dialog has exited.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExited?: TransitionHandlerProps['onExited'];
  /**
   * Callback fired when the dialog is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExiting?: TransitionHandlerProps['onExiting'];
  /**
   * If `true`, the Dialog is open.
   */
  open: ModalProps['open'];
  /**
   * The component used to render the body of the dialog.
   */
  PaperComponent?: React.ComponentType<PaperProps>;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * Determine the container for scrolling the dialog.
   */
  scroll?: 'body' | 'paper';
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type DialogClassKey =
  | 'root'
  | 'scrollPaper'
  | 'scrollBody'
  | 'container'
  | 'paper'
  | 'paperScrollPaper'
  | 'paperScrollBody'
  | 'paperWidthFalse'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'paperWidthLg'
  | 'paperWidthXl'
  | 'paperFullWidth'
  | 'paperFullScreen';

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 * Demos:
 *
 * - [Dialogs](https://mui.com/components/dialogs/)
 *
 * API:
 *
 * - [Dialog API](https://mui.com/api/dialog/)
 * - inherits [Modal API](https://mui.com/api/modal/)
 */
export default function Dialog(props: DialogProps): JSX.Element;
