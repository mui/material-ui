import * as React from 'react';

type UseRovingTabIndexOptions = {
  initialIndex: number;
  orientation: 'horizontal' | 'vertical';
  isRtl: boolean;
};

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
 * - initialIndex: The index of the element that should be focusable initially.
 *
 * @returns An object containing methods and state for managing roving tab index focus.
 * - registerElementRef: A function to register each focusable element's ref and disabled state.
 * - handleElementKeyDown: A function to handle keydown events for focus navigation.
 * - setFocusableIndex: A function to manually set the focusable index.
 * - focusableIndex: The current index of the focusable element, useful for setting tabIndex.
 *
 */
const useRovingTabIndex = (options: UseRovingTabIndexOptions) => {
  const { orientation, isRtl, initialIndex } = options;

  const [focusableIndex, setFocusableIndex] = React.useState(initialIndex);

  const elementRefs = React.useRef<React.RefObject<ActionableElement | null>[]>([]);

  React.useEffect(() => {
    if (isDisabled(elementRefs.current[initialIndex]?.current)) {
      const [_nextIndex, nextIndex] = getNextFocus(elementRefs.current, initialIndex, 'next');

      if (nextIndex !== -1) {
        setFocusableIndex(nextIndex);
      }
    }
  }, [initialIndex]);

  const registerElementRef = React.useCallback(
    (index: number, ref: React.RefObject<ActionableElement | null>, disabled: boolean) => {
      elementRefs.current[index] = ref;
    },
    [],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement | null>) => {
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
          currentIndex = elementRefs.current.length;
          break;
        default:
      }

      const [nextFocus, nextIndex] = getNextFocus(elementRefs.current, currentIndex, direction);

      if (nextIndex !== -1) {
        setFocusableIndex(nextIndex);
        nextFocus?.focus?.();
      }
    },
    [focusableIndex, orientation, isRtl],
  );

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const clickedElement = event.currentTarget;
    const clickedIndex = elementRefs.current.findIndex((ref) => ref.current === clickedElement);

    if (clickedIndex !== -1) {
      setFocusableIndex(clickedIndex);
    }
  }, []);

  return { registerElementRef, handleKeyDown, handleClick, focusableIndex };
};

const SUPPORTED_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

type ActionableElement = Element & { disabled?: boolean; focus?: () => void };

function getNextFocus(
  itemRefs: React.RefObject<ActionableElement | null>[],
  currentIndex: number,
  direction: 'next' | 'previous',
): [ActionableElement | null, number] {
  let wrappedOnce = false;
  let [nextFocus, nextIndex] = getNext(currentIndex, direction, itemRefs);

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
      [nextFocus, nextIndex] = getNext(nextIndex, direction, itemRefs);
    } else {
      return [nextFocus, nextIndex];
    }
  }

  return [null, -1];
}

function getNext(
  currentIndex: number,
  direction: 'next' | 'previous',
  itemRefs: React.RefObject<ActionableElement | null>[],
): [ActionableElement | null, number] {
  const lastIndex = itemRefs.length - 1;
  let nextIndex;

  if (direction === 'next') {
    nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
  } else {
    nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
  }

  return [itemRefs[nextIndex].current, nextIndex];
}

function isDisabled(element: ActionableElement | null) {
  return element?.disabled || element?.getAttribute('aria-disabled') === 'true';
}

export default useRovingTabIndex;
