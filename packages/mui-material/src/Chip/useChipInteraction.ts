'use client';
import * as React from 'react';
import useLazyRipple from '../useLazyRipple';

interface RippleHandlers {
  onMouseDown?: React.MouseEventHandler<HTMLElement> | undefined;
  onMouseUp?: React.MouseEventHandler<HTMLElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLElement> | undefined;
  onDragLeave?: React.DragEventHandler<HTMLElement> | undefined;
  onTouchStart?: React.TouchEventHandler<HTMLElement> | undefined;
  onTouchEnd?: React.TouchEventHandler<HTMLElement> | undefined;
  onTouchMove?: React.TouchEventHandler<HTMLElement> | undefined;
  onContextMenu?: React.MouseEventHandler<HTMLElement> | undefined;
}

interface UseChipInteractionOptions {
  disabled?: boolean | undefined;
  disableRipple?: boolean | undefined;
  onBlur?: React.FocusEventHandler<HTMLElement> | undefined;
  onMouseDown?: React.MouseEventHandler<HTMLElement> | undefined;
  onMouseUp?: React.MouseEventHandler<HTMLElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLElement> | undefined;
  onDragLeave?: React.DragEventHandler<HTMLElement> | undefined;
  onTouchStart?: React.TouchEventHandler<HTMLElement> | undefined;
  onTouchEnd?: React.TouchEventHandler<HTMLElement> | undefined;
  onTouchMove?: React.TouchEventHandler<HTMLElement> | undefined;
  onContextMenu?: React.MouseEventHandler<HTMLElement> | undefined;
}

const EMPTY_RIPPLE_HANDLERS: RippleHandlers = {};

export default function useChipInteraction(options: UseChipInteractionOptions) {
  const {
    disabled = false,
    disableRipple = false,
    onBlur,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onDragLeave,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onContextMenu,
  } = options;

  const ripple = useLazyRipple();
  const enableTouchRipple = ripple.shouldMount && !disabled && !disableRipple;

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (ripple.shouldMount) {
      ripple.stop(event);
    }
    onBlur?.(event);
  };

  const rippleHandlers =
    disabled || disableRipple
      ? EMPTY_RIPPLE_HANDLERS
      : {
          onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
            onMouseDown?.(event);
            ripple.start(event);
          },
          onMouseUp: (event: React.MouseEvent<HTMLElement>) => {
            onMouseUp?.(event);
            ripple.stop(event);
          },
          onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
            onMouseLeave?.(event);
            ripple.stop(event);
          },
          onDragLeave: (event: React.DragEvent<HTMLElement>) => {
            onDragLeave?.(event);
            ripple.stop(event);
          },
          onTouchStart: (event: React.TouchEvent<HTMLElement>) => {
            onTouchStart?.(event);
            ripple.start(event);
          },
          onTouchEnd: (event: React.TouchEvent<HTMLElement>) => {
            onTouchEnd?.(event);
            ripple.stop(event);
          },
          onTouchMove: (event: React.TouchEvent<HTMLElement>) => {
            onTouchMove?.(event);
            ripple.stop(event);
          },
          onContextMenu: (event: React.MouseEvent<HTMLElement>) => {
            onContextMenu?.(event);
            ripple.stop(event);
          },
        };

  return {
    handleBlur,
    rippleHandlers,
    enableTouchRipple,
    touchRippleRef: ripple.ref,
  };
}
