import * as React from 'react';
import { Placement, Middleware } from '@floating-ui/react-dom';

export interface FloatingPopupActions {
  update: () => void;
}

export interface FloatingPopupChildrenProps {
  placement: Placement;
  TransitionProps?: FloatingPopupTransitionProps | undefined;
  arrowStyles: React.CSSProperties;
  anchorHidden: boolean;
  isPositioned: boolean;
}

export interface FloatingPopupTransitionProps {
  in: boolean;
  onEnter: () => void;
  onExited: () => void;
}

export interface VirtualElement {
  getBoundingClientRect: () =>
    | DOMRect
    | {
        width: number;
        height: number;
        top: number;
        right: number;
        bottom: number;
        left: number;
        x?: number | undefined;
        y?: number | undefined;
      };
}

export interface FloatingPopupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  // --- Core positioning ---
  anchorEl?: HTMLElement | VirtualElement | (() => HTMLElement | VirtualElement) | null | undefined;
  open: boolean;
  placement?: Placement | undefined;
  strategy?: 'absolute' | 'fixed' | undefined;
  middleware?: Middleware[] | undefined;
  transform?: boolean | undefined;

  // --- Children ---
  children?: React.ReactNode | ((props: FloatingPopupChildrenProps) => React.ReactNode);
  transition?: boolean | undefined;

  // --- Arrow ---
  /**
   * The arrow element to position. Preferred: pass the element from `useState`.
   * Also works: `RefObject` (resolved lazily via Derivable pattern + useLayoutEffect).
   */
  arrowRef?: React.RefObject<HTMLElement | null> | HTMLElement | null | undefined;
  arrowPadding?: number | undefined;

  // --- DOM ---
  disablePortal?: boolean | undefined;
  container?: Element | (() => Element) | undefined;
  keepMounted?: boolean | undefined;

  // --- Imperative ---
  popperRef?: React.Ref<FloatingPopupActions> | undefined;
}
