'use client';

import * as React from 'react';

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
  };
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
    shouldSkipFocus = defaultShouldSkipFocus,
    orientation,
    focusableIndex: focusableIndexProp,
    isRtl = false,
    shouldWrap = true,
  } = options;

  const initialFocusableIndex = focusableIndexProp ?? 0;

  const [focusableIndex, setFocusableIndex] = React.useState(initialFocusableIndex);

  const elementsRef = React.useRef<(HTMLElement | null)[]>([]);
  const indexRef = React.useRef(initialFocusableIndex);

  if (focusableIndexProp !== undefined && focusableIndexProp !== indexRef.current) {
    indexRef.current = focusableIndexProp;

    if (focusableIndexProp !== focusableIndex) {
      setFocusableIndex(focusableIndexProp);
    }
  }

  React.useEffect(() => {
    if (
      focusableIndexProp !== undefined &&
      shouldSkipFocus(elementsRef.current[focusableIndexProp])
    ) {
      const [, nextIndex] = getNextFocus(
        elementsRef,
        focusableIndexProp,
        'next',
        shouldWrap,
        shouldSkipFocus,
      );
      if (nextIndex !== -1) {
        setFocusableIndex(nextIndex);
      }
    }
  }, [focusableIndexProp, shouldSkipFocus, shouldWrap]);

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
    const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
      const focusedElement = event.target;
      const focusedIndex = elementsRef.current.findIndex((ref) => ref === focusedElement);

      if (focusedIndex !== -1) {
        setFocusableIndex(focusedIndex);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement | null>) => {
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

      let direction: 'next' | 'previous' = 'next';
      let currentIndex = focusableIndex;

      switch (event.key) {
        case previousItemKey:
          direction = 'previous';
          event.preventDefault();
          break;
        case nextItemKey:
          event.preventDefault();
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

      const [nextFocus, nextIndex] = getNextFocus(
        elementsRef,
        currentIndex,
        direction,
        shouldWrap,
        shouldSkipFocus,
      );

      if (nextIndex === -1) {
        return;
      }

      nextFocus?.focus?.();
    };

    return {
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
    };
  }, [focusableIndex, isRtl, orientation, shouldWrap, shouldSkipFocus]);

  return { getItemProps, getContainerProps };
};

function getNextFocus(
  elementsRef: React.RefObject<(HTMLElement | null)[]>,
  currentIndex: number,
  direction: 'next' | 'previous',
  wrap: boolean,
  shouldSkipFocus: (element: HTMLElement | null) => boolean,
): [HTMLElement | null, number] {
  let wrappedOnce = false;
  let nextIndex = getNextIndex(elementsRef, currentIndex, direction, wrap);

  while (nextIndex !== -1) {
    // Prevent infinite loop.
    if (nextIndex === 0) {
      if (wrappedOnce) {
        return [null, -1];
      }
      wrappedOnce = true;
    }

    const nextElement = elementsRef.current[nextIndex];

    // Same logic as useAutocomplete.js
    if (shouldSkipFocus(nextElement)) {
      // Move to the next element.
      nextIndex = getNextIndex(elementsRef, nextIndex, direction, wrap);
    } else {
      return [nextElement, nextIndex];
    }
  }

  return [null, -1];
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

function defaultShouldSkipFocus(element: HTMLElement | null) {
  return (
    element?.hasAttribute('disabled') ||
    element?.getAttribute('aria-disabled') === 'true' ||
    !element?.hasAttribute('tabindex')
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
