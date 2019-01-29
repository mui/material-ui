import * as React from 'react';
import { ReferenceObject } from 'popper.js';
import { PortalProps } from '../Portal';
import { TransitionProps } from '../transitions/transition';

export type PopperPlacementType =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  transition?: boolean;
  anchorEl?: null | HTMLElement | ReferenceObject | ((element: HTMLElement) => HTMLElement);
  children:
    | React.ReactNode
    | ((props: {
        placement: PopperPlacementType;
        TransitionProps?: TransitionProps;
      }) => React.ReactNode);
  container?: PortalProps['container'];
  disablePortal?: PortalProps['disablePortal'];
  keepMounted?: boolean;
  modifiers?: object;
  open: boolean;
  placement?: PopperPlacementType;
  popperOptions?: object;
}

declare const Popper: React.ComponentType<PopperProps>;

export default Popper;
