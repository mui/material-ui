import * as React from 'react';

export type UseRovingTabIndexOptions = {
  focusableIndex?: number;
  orientation: 'horizontal' | 'vertical';
  isRtl?: boolean;
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
  focusableIndex: number;
  setFocusableIndex: React.Dispatch<React.SetStateAction<number>>;
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
  const initialFocusableIndex = options.focusableIndex ?? 0;

  const [focusableIndex, setFocusableIndex] = React.useState(initialFocusableIndex);

  const elementsRef = React.useRef<(ActionableElement | null)[]>([]);
  const indexRef = React.useRef(initialFocusableIndex);

  if (options.focusableIndex !== undefined && options.focusableIndex !== indexRef.current) {
    indexRef.current = options.focusableIndex;

    if (options.focusableIndex !== focusableIndex) {
      setFocusableIndex(options.focusableIndex);
    }
  }


  React.useEffect(() => {
    if (
      options.focusableIndex !== undefined &&
      isDisabled(elementsRef.current[options.focusableIndex])
    ) {
      const [, nextIndex] = getNextFocus(elementsRef, options.focusableIndex, 'next');
      if (nextIndex !== -1) {
        setFocusableIndex(nextIndex);
      }
    }
  }, [options.focusableIndex]);

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

      let previousItemKey = options.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      let nextItemKey = options.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

      if (options.orientation === 'horizontal' && options.isRtl) {
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

      const [nextFocus, nextIndex] = getNextFocus(elementsRef, currentIndex, direction);

      if (
        !nextFocus ||
        nextIndex === -1 ||
        !SUPPORTED_ROLES.includes(nextFocus.getAttribute('role') ?? '')
      ) {
        return;
      }

      nextFocus.focus?.();
    };

    return {
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
    };
  }, [focusableIndex, options.isRtl, options.orientation]);

  return { getItemProps, getContainerProps, focusableIndex, setFocusableIndex };
};

type ActionableElement = Element & { disabled?: boolean; focus?: () => void };

function getNextFocus(
  elementsRef: React.RefObject<(ActionableElement | null)[]>,
  currentIndex: number,
  direction: 'next' | 'previous',
): [ActionableElement | null, number] {
  let wrappedOnce = false;
  let [nextFocus, nextIndex] = getNext(elementsRef, currentIndex, direction);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextIndex === 0) {
      if (wrappedOnce) {
        return [null, -1];
      }
      wrappedOnce = true;
    }

    // Same logic as useAutocomplete.js
    if (!nextFocus.hasAttribute('tabindex') || isDisabled(nextFocus)) {
      // Move to the next element.
      [nextFocus, nextIndex] = getNext(elementsRef, nextIndex, direction);
    } else {
      return [nextFocus, nextIndex];
    }
  }

  return [null, -1];
}

function getNext(
  elementsRef: React.RefObject<(ActionableElement | null)[]>,
  currentIndex: number,
  direction: 'next' | 'previous',
): [ActionableElement | null, number] {
  const lastIndex = elementsRef.current.length - 1;
  let nextIndex;

  if (direction === 'next') {
    nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
  } else {
    nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
  }

  return [elementsRef.current[nextIndex], nextIndex];
}

function isDisabled(element: ActionableElement | null) {
  return element?.disabled || element?.getAttribute('aria-disabled') === 'true';
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
