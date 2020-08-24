import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DialogProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, 'children'> {
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
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the container element if `scroll="paper"`. */
    scrollPaper?: string;
    /** Styles applied to the container element if `scroll="body"`. */
    scrollBody?: string;
    /** Styles applied to the container element. */
    container?: string;
    /** Styles applied to the `Paper` component. */
    paper?: string;
    /** Styles applied to the `Paper` component if `scroll="paper"`. */
    paperScrollPaper?: string;
    /** Styles applied to the `Paper` component if `scroll="body"`. */
    paperScrollBody?: string;
    /** Styles applied to the `Paper` component if `maxWidth=false`. */
    paperWidthFalse?: string;
    /** Styles applied to the `Paper` component if `maxWidth="xs"`. */
    paperWidthXs?: string;
    /** Styles applied to the `Paper` component if `maxWidth="sm"`. */
    paperWidthSm?: string;
    /** Styles applied to the `Paper` component if `maxWidth="md"`. */
    paperWidthMd?: string;
    /** Styles applied to the `Paper` component if `maxWidth="lg"`. */
    paperWidthLg?: string;
    /** Styles applied to the `Paper` component if `maxWidth="xl"`. */
    paperWidthXl?: string;
    /** Styles applied to the `Paper` component if `fullWidth={true}`. */
    paperFullWidth?: string;
    /** Styles applied to the `Paper` component if `fullScreen={true}`. */
    paperFullScreen?: string;
  };
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
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
   * Callback fired when the escape key is pressed,
   * `disableKeyboard` is false and the modal is in focus.
   */
  onEscapeKeyDown?: ModalProps['onEscapeKeyDown'];
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
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
}

export type DialogClassKey = keyof NonNullable<DialogProps['classes']>;

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [Dialog API](https://material-ui.com/api/dialog/)
 * - inherits [Modal API](https://material-ui.com/api/modal/)
 */
export default function Dialog(props: DialogProps): JSX.Element;
