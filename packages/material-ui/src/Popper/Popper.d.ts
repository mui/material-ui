import * as React from 'react';
import PopperJs, { ReferenceObject } from 'popper.js';
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
  anchorEl?: null | ReferenceObject | (() => ReferenceObject);
  children:
    | React.ReactNode
    | ((props: {
        placement: PopperPlacementType;
        TransitionProps?: {
          in: boolean;
          onEnter: () => {};
          onExited: () => {};
        };
      }) => React.ReactNode);
  container?: PortalProps['container'];
  disablePortal?: PortalProps['disablePortal'];
  keepMounted?: boolean;
  modifiers?: object;
  open: boolean;
  placement?: PopperPlacementType;
  popperOptions?: object;
  popperRef?: React.Ref<PopperJs>;
  transition?: boolean;
}

declare const Popper: React.ComponentType<PopperProps>;

export default Popper;
