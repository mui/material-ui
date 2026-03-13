'use client';

import * as React from 'react';

import ownerDocument from '../ownerDocument';
import getActiveElement from '../getActiveElement';

export type UseRovingTabIndexOptions = {
  focusableIndex?: number | undefined;
  orientation: 'horizontal' | 'vertical';
  isRtl?: boolean | undefined;
  shouldFocus?: ((element: HTMLElement | null) => boolean) | undefined;
  shouldWrap?: boolean | undefined;
};

type UseRovingTabIndexReturn = {
  getItemProps: (
    index: number,
    ref?: React.Ref<HTMLElement>,
  ) => {
    ref: (element: HTMLElement | null) => void;
    tabIndex: number;
  };
  getContainerProps: (ref?: React.Ref<HTMLElement>) => {
    onFocus: (event: React.FocusEvent<HTMLElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
    ref: (element: HTMLElement | null) => void;
  };
  focusNext: (shouldSkipFocusOverride?: (element: HTMLElement | null) => boolean) => number;
};

const SUPPORTED_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

/**
 * Provides roving tab index behavior for a container and its focusable children.
 * This is useful for implementing keyboard navigation in components like menus, tabs, and lists.
 * The hook manages the focus state of child elements and provides props to be spread on both the container and the items.
 * The container will handle keyboard events to move focus between items based on the specified orientation and wrapping behavior.
 *
 * @param options - Configuration options for the roving tab index behavior, including orientation, initial focusable index, RTL support, and custom focus logic.
 * @returns An object containing `getItemProps` and `getContainerProps` functions to be spread on the respective elements, and a `focusNext` function to programmatically move focus to the next item.
 */
export default function useRovingTabIndex(
  options: UseRovingTabIndexOptions,
): UseRovingTabIndexReturn {
  const {
    orientation,
    focusableIndex: focusableIndexProp,
    isRtl = false,
    shouldFocus = internalShouldFocus,
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
    if (
      elementsRef.current.length === 0 ||
      focusableIndex === -1 ||
      focusableIndex >= elementsRef.current.length
    ) {
      return;
    }

    if (!shouldFocus(elementsRef.current[focusableIndex])) {
      const nextIndex = focusNext(elementsRef, focusableIndex, 'next', false, shouldFocus);

      setFocusableIndex(nextIndex);
    }
  }, [focusableIndex, shouldFocus]);

  const getItemProps = React.useCallback(
    (index: number, ref?: React.Ref<HTMLElement>) => ({
      ref: handleRefs(ref, (elementNode) => {
        elementsRef.current[index] = elementNode;
      }),
      tabIndex: index === focusableIndex ? 0 : -1,
    }),
    [focusableIndex],
  );

  const getContainerProps = React.useCallback(
    (ref?: React.Ref<HTMLElement>) => {
      const onFocus = (event: React.FocusEvent<HTMLElement>) => {
        const focusedElement = event.target;
        const focusedIndex = elementsRef.current.findIndex((element) => element === focusedElement);

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
              // Set to length, so that the previous focused element will be the last one.
              currentIndex = elementsRef.current.length;
            }
            break;
          case nextItemKey:
            event.preventDefault();

            if (isFocusOnContainer) {
              // Set to -1, so that the next focused element will be the first one.
              currentIndex = -1;
            }
            break;
          case 'Home':
            event.preventDefault();
            // Set to -1, so that the next focused element will be the first one.
            currentIndex = -1;
            break;
          case 'End':
            event.preventDefault();
            direction = 'previous';
            // Set to length, so that the previous focused element will be the last one.
            currentIndex = elementsRef.current.length;
            break;
          default:
            return;
        }

        focusNext(elementsRef, currentIndex, direction, shouldWrap, shouldFocus);
      };

      return {
        onFocus,
        onKeyDown,
        ref: handleRefs(ref, (elementNode) => {
          containerRef.current = elementNode;
        }),
      };
    },
    [focusableIndex, isRtl, orientation, shouldWrap, shouldFocus],
  );

  const focusNextExport = React.useCallback(
    (shouldFocusOverride: ((element: HTMLElement | null) => boolean) | undefined) => {
      const currentFocus = getActiveElement(ownerDocument(containerRef.current));
      const isFocusOnContainer = currentFocus === containerRef.current;
      let currentIndex = focusableIndex;

      if (isFocusOnContainer) {
        currentIndex = -1;
      }

      const nextIndex = focusNext(
        elementsRef,
        currentIndex,
        'next',
        true,
        shouldFocusOverride ?? shouldFocus,
      );

      if (nextIndex !== -1) {
        setFocusableIndex(nextIndex);
      }

      return nextIndex;
    },
    [focusableIndex, shouldFocus],
  );

  return { getItemProps, getContainerProps, focusNext: focusNextExport };
}

function focusNext(
  elementsRef: React.RefObject<(HTMLElement | null)[]>,
  currentIndex: number,
  direction: 'next' | 'previous',
  wrap: boolean,
  shouldFocus: (element: HTMLElement | null) => boolean,
): number {
  const lastIndex = elementsRef.current.length - 1;
  let wrappedOnce = false;
  let nextIndex = getNextIndex(currentIndex, lastIndex, direction, wrap);
  const startIndex = nextIndex;

  while (nextIndex !== -1) {
    // Prevent infinite loop.
    if (nextIndex === startIndex) {
      if (wrappedOnce) {
        return -1;
      }
      wrappedOnce = true;
    }

    const nextElement = elementsRef.current[nextIndex];

    // Same logic as useAutocomplete.js
    if (!shouldFocus(nextElement)) {
      // Move to the next element.
      nextIndex = getNextIndex(nextIndex, lastIndex, direction, wrap);
    } else {
      nextElement?.focus();

      return nextIndex;
    }
  }

  return -1;
}

function getNextIndex(
  currentIndex: number,
  lastIndex: number,
  direction: 'next' | 'previous',
  wrap: boolean = true,
): number {
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

function internalShouldFocus(element: HTMLElement | null) {
  if (!element) {
    return false;
  }

  return (
    !element.hasAttribute('disabled') &&
    element.getAttribute('aria-disabled') !== 'true' &&
    element.hasAttribute('tabindex')
  );
}

function handleRefs(...refs: (React.Ref<HTMLElement> | undefined)[]) {
  return (node: HTMLElement | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}
