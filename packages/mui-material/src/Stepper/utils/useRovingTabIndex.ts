'use client';

import * as React from 'react';

import ownerDocument from '../../utils/ownerDocument';
import getActiveElement from '../../utils/getActiveElement';

export type UseRovingTabIndexOptions = {
  focusableIndex?: number | undefined;
  orientation: 'horizontal' | 'vertical';
  isRtl?: boolean | undefined;
  shouldSkipFocus?: ((element: HTMLElement | null) => boolean) | undefined;
  shouldWrap?: boolean | undefined;
};

type UseRovingTabIndexReturn = {
  getItemProps: (
    index: number,
    ref?: React.RefObject<HTMLElement>,
  ) => {
    ref: (element: HTMLElement | null) => void;
    tabIndex: number;
  };
  getContainerProps: () => {
    onFocus: (event: React.FocusEvent<HTMLElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
    ref: (element: HTMLElement | null) => void;
  };
  focusNext: (shouldSkipFocusOverride?: (element: HTMLElement | null) => boolean) => number;
};

const SUPPORTED_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
const SUPPORTED_ROLES = ['button', 'tab', 'menuitem', 'option'];

/**
 * Implements roving tab index focus management on a set of focusable elements.
 * Focus can be moved between elements using the ArrowRight and ArrowLeft keys.
 * Elements that are disabled are skipped when navigating with the keyboard.
 * Navigation wraps around when the end or beginning of the set is reached.
 * If the initial focusable element is disabled, the next enabled element is set as
 * focusable.
 *
 * @param {UseRovingTabIndexOptions} options Configuration options for roving tab index focus management.
 * It includes:
 * - initialFocusableIndex: The index of the element that should be focusable initially.
 *
 * @returns An object containing methods and state for managing roving tab index focus.
 * - registerElementRef: A function to register each focusable element's ref and disabled state.
 * - handleElementKeyDown: A function to handle keydown events for focus navigation.
 * - setFocusableIndex: A function to manually set the focusable index.
 * - focusableIndex: The current index of the focusable element, useful for setting tabIndex.
 *
 */
const useRovingTabIndex = (options: UseRovingTabIndexOptions): UseRovingTabIndexReturn => {
  const {
    orientation,
    focusableIndex: focusableIndexProp,
    isRtl = false,
    shouldSkipFocus = internalShouldSkipFocus,
    shouldWrap = true,
  } = options;

  const initialFocusableIndex = focusableIndexProp ?? 0;

  const [focusableIndex, setFocusableIndex] = React.useState(initialFocusableIndex);

  const elementsRef = React.useRef<(HTMLElement | null)[]>([]);
  const containerRef = React.useRef<HTMLElement | null>(null);
  const previousFocusableIndexPropRef = React.useRef<number | undefined>(initialFocusableIndex);

  if (
    focusableIndexProp !== undefined &&
    focusableIndexProp !== previousFocusableIndexPropRef.current
  ) {
    previousFocusableIndexPropRef.current = focusableIndexProp;

    if (focusableIndexProp !== focusableIndex) {
      setFocusableIndex(focusableIndexProp);
    }
  }

  React.useEffect(() => {
    if (elementsRef.current.length === 0) {
      return;
    }

    if (shouldSkipFocus(elementsRef.current[focusableIndex])) {
      const nextIndex = internalFocusNext(
        elementsRef,
        focusableIndex,
        'next',
        false,
        shouldSkipFocus,
      );

      setFocusableIndex(nextIndex);
    }
  }, [focusableIndex, shouldSkipFocus]);

  const getItemProps = React.useCallback(
    (index: number, ref?: React.Ref<HTMLElement>) => ({
      ref: handleRefs(ref, (elementNode) => {
        if (elementNode) {
          elementsRef.current[index] = elementNode;
        }
      }),
      tabIndex: index === focusableIndex ? 0 : -1,
    }),
    [focusableIndex],
  );

  const getContainerProps = React.useCallback(() => {
    const onFocus = (event: React.FocusEvent<HTMLElement>) => {
      const focusedElement = event.target;
      const focusedIndex = elementsRef.current.findIndex((ref) => ref === focusedElement);

      if (focusedIndex !== -1) {
        setFocusableIndex(focusedIndex);
      }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement | null>) => {
      if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (!SUPPORTED_KEYS.includes(event.key)) {
        return;
      }

      const currentElement = elementsRef.current[focusableIndex];

      if (!SUPPORTED_ROLES.includes(currentElement?.getAttribute('role') ?? '')) {
        return;
      }

      let previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      let nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

      if (orientation === 'horizontal' && isRtl) {
        // swap previousItemKey with nextItemKey
        previousItemKey = 'ArrowRight';
        nextItemKey = 'ArrowLeft';
      }

      const currentFocus = getActiveElement(ownerDocument(containerRef.current));
      const isFocusOnContainer = currentFocus === containerRef.current;
      let direction: 'next' | 'previous' = 'next';
      let currentIndex = focusableIndex;

      switch (event.key) {
        case previousItemKey:
          direction = 'previous';
          event.preventDefault();

          if (isFocusOnContainer) {
            currentIndex = elementsRef.current.length;
          }
          break;
        case nextItemKey:
          event.preventDefault();

          if (isFocusOnContainer) {
            currentIndex = -1;
          }
          break;
        case 'Home':
          event.preventDefault();
          currentIndex = -1;
          break;
        case 'End':
          event.preventDefault();
          direction = 'previous';
          currentIndex = elementsRef.current.length;
          break;
        default:
          return;
      }

      internalFocusNext(elementsRef, currentIndex, direction, shouldWrap, shouldSkipFocus);
    };

    return {
      onFocus,
      onKeyDown,
      ref: handleRefs(containerRef, (elementNode) => {
        if (elementNode) {
          containerRef.current = elementNode;
        }
      }),
    };
  }, [focusableIndex, isRtl, orientation, shouldWrap, shouldSkipFocus]);

  const focusNext = React.useCallback(
    (shouldSkipFocusOverride: ((element: HTMLElement | null) => boolean) | undefined) => {
      const nextIndex = internalFocusNext(
        elementsRef,
        focusableIndex,
        'next',
        true,
        shouldSkipFocusOverride ?? shouldSkipFocus,
      );

      if (nextIndex !== -1) {
        setFocusableIndex(nextIndex);
      }

      return nextIndex;
    },
    [focusableIndex, shouldSkipFocus],
  );

  return { getItemProps, getContainerProps, focusNext };
};

function internalFocusNext(
  elementsRef: React.RefObject<(HTMLElement | null)[]>,
  currentIndex: number,
  direction: 'next' | 'previous',
  wrap: boolean,
  shouldSkipFocus: (element: HTMLElement | null) => boolean,
): number {
  let wrappedOnce = false;
  let nextIndex = getNextIndex(elementsRef, currentIndex, direction, wrap);

  while (nextIndex !== -1) {
    // Prevent infinite loop.
    if (nextIndex === 0) {
      if (wrappedOnce) {
        return -1;
      }
      wrappedOnce = true;
    }

    const nextElement = elementsRef.current[nextIndex];

    // Same logic as useAutocomplete.js
    if (shouldSkipFocus(nextElement)) {
      // Move to the next element.
      nextIndex = getNextIndex(elementsRef, nextIndex, direction, wrap);
    } else {
      nextElement?.focus();

      return nextIndex;
    }
  }

  return -1;
}

function getNextIndex(
  elementsRef: React.RefObject<(HTMLElement | null)[]>,
  currentIndex: number,
  direction: 'next' | 'previous',
  wrap: boolean = true,
): number {
  const lastIndex = elementsRef.current.length - 1;

  if (direction === 'next') {
    if (currentIndex === lastIndex) {
      return wrap ? 0 : -1;
    }

    return currentIndex + 1;
  }

  if (currentIndex === 0) {
    return wrap ? lastIndex : -1;
  }
  return currentIndex - 1;
}

function internalShouldSkipFocus(element: HTMLElement | null) {
  if (!element) {
    return true;
  }

  return (
    element.hasAttribute('disabled') ||
    element.getAttribute('aria-disabled') === 'true' ||
    !element.hasAttribute('tabindex')
  );
}

function handleRefs(...refs: (React.Ref<HTMLElement> | undefined)[]) {
  return (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

export default useRovingTabIndex;
export { internalShouldSkipFocus as shouldSkipFocus };
