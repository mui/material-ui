import * as React from 'react';
import { PortalProps } from '../Portal';

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  anchorEl?: HTMLElement | ((element: HTMLElement) => HTMLElement);
  children: () => React.ReactElement<any> | React.ReactElement<any>;
  container?: PortalProps['container'];
  disablePortal?: PortalProps['disablePortal'];
  keepMounted?: boolean;
  modifiers?: Object;
  open: boolean;
  placement?:
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
  popperOptions?: Object;
}

declare const Popper: React.ComponentType<PopperProps>;

export default Popper;
