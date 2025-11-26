'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import { useDndContext } from '../DndContext/useDndContext';
import type { UniqueIdentifier, Coordinates } from '../DndContext/DndContextTypes';

/**
 * Options for the useDraggable hook.
 */
export interface UseDraggableOptions {
  /**
   * Unique identifier for this draggable element.
   */
  id: UniqueIdentifier;
  /**
   * Optional data to attach to the draggable element.
   * This data will be accessible in drag event handlers.
   */
  data?: Record<string, unknown>;
  /**
   * If true, the element will not be draggable.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Return value from the useDraggable hook.
 */
export interface UseDraggableReturn {
  /**
   * ARIA and other attributes to apply to the draggable element.
   * These provide accessibility support and proper touch behavior.
   */
  attributes: {
    role: 'button';
    tabIndex: number;
    'aria-describedby': string;
    'aria-pressed': boolean;
    'aria-disabled': boolean;
    style?: React.CSSProperties;
  };
  /**
   * Event listeners to attach to the draggable element.
   * Spread these onto your element to enable dragging.
   */
  listeners: {
    onPointerDown: (event: React.PointerEvent) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
  } | undefined;
  /**
   * Ref callback to attach to the draggable DOM element.
   * This allows the hook to track the element's position.
   */
  setNodeRef: (node: HTMLElement | null) => void;
  /**
   * Current transform coordinates for the draggable element.
   * Null when not dragging. Use this to position a drag overlay or
   * apply transforms to the draggable element itself.
   */
  transform: Coordinates | null;
  /**
   * True if this element is currently being dragged.
   */
  isDragging: boolean;
}

const KEYBOARD_MOVE_DISTANCE = 25; // pixels to move per arrow key press

/**
 * Hook to make an element draggable via pointer and keyboard interactions.
 *
 * @example
 * ```tsx
 * function DraggableItem({ id, children }) {
 *   const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
 *     id,
 *   });
 *
 *   const style = {
 *     transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
 *     opacity: isDragging ? 0.5 : 1,
 *   };
 *
 *   return (
 *     <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDraggable(options: UseDraggableOptions): UseDraggableReturn {
  const { id, data = {}, disabled = false } = options;

  const {
    active,
    registerDraggable,
    unregisterDraggable,
    dragStart,
    dragMove,
    dragEnd,
    dragCancel,
  } = useDndContext();

  const nodeRef = React.useRef<HTMLElement | null>(null);
  const initialPointerPosition = React.useRef<Coordinates | null>(null);
  const initialNodePosition = React.useRef<Coordinates | null>(null);
  const isKeyboardDragging = React.useRef(false);
  const keyboardPosition = React.useRef<Coordinates | null>(null);

  // Track current pointer position for transform calculation
  const [currentPointerPosition, setCurrentPointerPosition] = React.useState<Coordinates | null>(null);

  const isDragging = active?.id === id;

  // Unregister on unmount
  useEnhancedEffect(() => {
    return () => {
      unregisterDraggable(id);
    };
  }, [id, unregisterDraggable]);

  /**
   * Calculate transform based on current drag state
   */
  const transform = React.useMemo<Coordinates | null>(() => {
    if (!isDragging) {
      return null;
    }

    // For keyboard dragging, use accumulated keyboard position
    if (isKeyboardDragging.current && keyboardPosition.current) {
      return keyboardPosition.current;
    }

    // For pointer dragging, calculate delta from initial to current position
    if (initialPointerPosition.current && currentPointerPosition) {
      return {
        x: currentPointerPosition.x - initialPointerPosition.current.x,
        y: currentPointerPosition.y - initialPointerPosition.current.y,
      };
    }

    return null;
  }, [isDragging, currentPointerPosition]);

  /**
   * Handle pointer down event - start drag operation
   */
  const handlePointerDown = useEventCallback((event: React.PointerEvent) => {
    if (disabled) {
      return;
    }

    // Only handle left mouse button or touch
    if (event.button !== 0) {
      return;
    }

    // Prevent default to avoid text selection
    event.preventDefault();

    const node = nodeRef.current;
    if (!node) {
      return;
    }

    // Capture pointer for reliable move/up events
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch (e) {
      // Ignore errors if pointer capture is not supported (e.g., in JSDOM)
    }

    // Store initial positions
    const rect = node.getBoundingClientRect();
    initialPointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
    initialNodePosition.current = {
      x: rect.left,
      y: rect.top,
    };
    isKeyboardDragging.current = false;

    // Start drag operation
    dragStart(id);

    // Set up document-level move and up handlers
    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (initialPointerPosition.current) {
        const coords = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };
        setCurrentPointerPosition(coords);
        dragMove(coords);
      }
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerCancel);

      // Release pointer capture
      if (event.currentTarget instanceof Element) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch (e) {
          // Ignore errors if pointer capture was already released
        }
      }

      initialPointerPosition.current = null;
      initialNodePosition.current = null;
      setCurrentPointerPosition(null);

      dragEnd();
    };

    const handlePointerCancel = (cancelEvent: PointerEvent) => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerCancel);

      // Release pointer capture
      if (event.currentTarget instanceof Element) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch (e) {
          // Ignore errors if pointer capture was already released
        }
      }

      initialPointerPosition.current = null;
      initialNodePosition.current = null;
      setCurrentPointerPosition(null);

      dragCancel();
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerCancel);
  });

  /**
   * Handle keyboard events - Enter/Space to grab, arrows to move, Escape to cancel
   */
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (disabled) {
      return;
    }

    const { key } = event;

    // Enter or Space to toggle drag mode
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();

      if (!isDragging) {
        // Start keyboard drag
        const node = nodeRef.current;
        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();
        initialNodePosition.current = {
          x: rect.left,
          y: rect.top,
        };
        keyboardPosition.current = { x: 0, y: 0 };
        isKeyboardDragging.current = true;

        dragStart(id);

        // Notify of initial position
        dragMove({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      } else {
        // End keyboard drag
        isKeyboardDragging.current = false;
        keyboardPosition.current = null;
        dragEnd();
      }
      return;
    }

    // Arrow keys to move during drag
    if (isDragging && isKeyboardDragging.current) {
      let deltaX = 0;
      let deltaY = 0;

      switch (key) {
        case 'ArrowLeft':
          deltaX = -KEYBOARD_MOVE_DISTANCE;
          event.preventDefault();
          break;
        case 'ArrowRight':
          deltaX = KEYBOARD_MOVE_DISTANCE;
          event.preventDefault();
          break;
        case 'ArrowUp':
          deltaY = -KEYBOARD_MOVE_DISTANCE;
          event.preventDefault();
          break;
        case 'ArrowDown':
          deltaY = KEYBOARD_MOVE_DISTANCE;
          event.preventDefault();
          break;
        case 'Escape':
          // Cancel drag
          event.preventDefault();
          isKeyboardDragging.current = false;
          keyboardPosition.current = null;
          dragCancel();
          return;
        default:
          return;
      }

      if (deltaX !== 0 || deltaY !== 0) {
        // Update accumulated keyboard position
        if (keyboardPosition.current && initialNodePosition.current) {
          keyboardPosition.current = {
            x: keyboardPosition.current.x + deltaX,
            y: keyboardPosition.current.y + deltaY,
          };

          const node = nodeRef.current;
          if (node) {
            const rect = node.getBoundingClientRect();
            // Calculate new center position for collision detection
            dragMove({
              x: rect.left + rect.width / 2 + deltaX,
              y: rect.top + rect.height / 2 + deltaY,
            });
          }
        }
      }
    }
  });

  /**
   * Ref callback to track the DOM node and register immediately
   */
  const setNodeRef = useEventCallback((node: HTMLElement | null) => {
    nodeRef.current = node;

    // Register new node immediately (re-registration is idempotent via Map.set)
    // Don't unregister on null - let the cleanup effect handle unmount
    if (node && !disabled) {
      registerDraggable(id, node, data);
    }
  });

  // Build attributes object
  const attributes = React.useMemo(
    () => ({
      role: 'button' as const,
      tabIndex: disabled ? -1 : 0,
      'aria-describedby': 'dnd-instructions',
      'aria-pressed': isDragging,
      'aria-disabled': disabled,
      style: {
        touchAction: 'none' as const,
      },
    }),
    [disabled, isDragging],
  );

  // Build listeners object (undefined when disabled)
  const listeners = React.useMemo(() => {
    if (disabled) {
      return undefined;
    }

    return {
      onPointerDown: handlePointerDown,
      onKeyDown: handleKeyDown,
    };
  }, [disabled, handlePointerDown, handleKeyDown]);

  return {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  };
}

export default useDraggable;
