import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { ModalProps } from '../Modal';
import { SlideProps } from '../Slide';
import { PaperProps } from '../Paper';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DrawerProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, 'open' | 'children'> {
  /**
   * Side from which the drawer will appear.
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * The contents of the drawer.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `variant="permanent or persistent"`. */
    docked?: string;
    /** Styles applied to the `Paper` component. */
    paper?: string;
    /** Styles applied to the `Paper` component if `anchor="left"`. */
    paperAnchorLeft?: string;
    /** Styles applied to the `Paper` component if `anchor="right"`. */
    paperAnchorRight?: string;
    /** Styles applied to the `Paper` component if `anchor="top"`. */
    paperAnchorTop?: string;
    /** Styles applied to the `Paper` component if `anchor="bottom"`. */
    paperAnchorBottom?: string;
    /** Styles applied to the `Paper` component if `anchor="left"` and `variant` is not "temporary". */
    paperAnchorDockedLeft?: string;
    /** Styles applied to the `Paper` component if `anchor="top"` and `variant` is not "temporary". */
    paperAnchorDockedTop?: string;
    /** Styles applied to the `Paper` component if `anchor="right"` and `variant` is not "temporary". */
    paperAnchorDockedRight?: string;
    /** Styles applied to the `Paper` component if `anchor="bottom"` and `variant` is not "temporary". */
    paperAnchorDockedBottom?: string;
    /** Styles applied to the `Modal` component. */
    modal?: string;
  };
  /**
   * The elevation of the drawer.
   */
  elevation?: number;
  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   */
  ModalProps?: Partial<ModalProps>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: ModalProps['onClose'];
  /**
   * If `true`, the drawer is open.
   */
  open?: boolean;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps?: Partial<SlideProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * The variant to use.
   */
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export type DrawerClassKey = keyof NonNullable<DrawerProps['classes']>;

/**
 * The props of the [Modal](https://material-ui.com/api/modal/) component are available
 * when `variant="temporary"` is set.
 * Demos:
 *
 * - [Drawers](https://material-ui.com/components/drawers/)
 *
 * API:
 *
 * - [Drawer API](https://material-ui.com/api/drawer/)
 */
export default function Drawer(props: DrawerProps): JSX.Element;
