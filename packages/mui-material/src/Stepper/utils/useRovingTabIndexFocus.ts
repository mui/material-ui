import * as React from 'react';

type UseRovingTabIndexFocusOptions = {
  initialFocusableIndex: number;
  elementCount: number;
};

/**
 * Implements roving tab index focus management on a set of focusable elements.
 * Focus can be moved between elements using the ArrowRight and ArrowLeft keys.
 * Elements that are disabled are skipped when navigating with the keyboard.
 * Navigation wraps around when the end or beginning of the set is reached.
 * If the initial focusable element is disabled, the next enabled element is set as
 * focusable.
 *
 * @param {UseRovingTabIndexFocusOptions} options Configuration options for roving tab index focus management.
 * It includes:
 * - initialFocusableIndex: The index of the element that should be focusable initially.
 * - elementCount: The total number of focusable elements.
 * @returns An object containing methods and state for managing roving tab index focus.
 * - registerElementRef: A function to register each focusable element's ref and disabled state.
 * - handleElementKeyDown: A function to handle keydown events for focus navigation.
 * - setFocusableIndex: A function to manually set the focusable index.
 * - focusableIndex: The current index of the focusable element, useful for setting tabIndex.
 *
 */
const useRovingTabIndexFocus = (options: UseRovingTabIndexFocusOptions) => {
  const initialFocusableIndex = getInitialIndex(options);
  const [focusableIndex, setFocusableIndex] = React.useState(initialFocusableIndex);
  const elementRefs = React.useRef<
    { elementRef: React.RefObject<HTMLElement | null>; disabled: boolean }[]
  >([]);

  React.useEffect(() => {
    if (elementRefs.current[initialFocusableIndex]?.disabled) {
      const nextFocusableStep = getNextFocusableStep(
        elementRefs.current,
        initialFocusableIndex,
        'next',
      );

      if (nextFocusableStep !== null) {
        setFocusableIndex(nextFocusableStep);
      }
    }
  }, [initialFocusableIndex]);

  const registerElementRef = React.useCallback(
    (elementIndex: number, elementRef: React.RefObject<HTMLElement | null>, disabled: boolean) => {
      elementRefs.current[elementIndex] = { elementRef, disabled };
    },
    [],
  );

  const handleElementKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement | null>) => {
      if (['ArrowRight', 'ArrowLeft'].indexOf(event.key) === -1) {
        return;
      }

      const direction = event.key === 'ArrowRight' ? 'next' : 'previous';
      const nextFocusableStep = getNextFocusableStep(
        elementRefs.current,
        focusableIndex,
        direction,
      );

      if (nextFocusableStep !== null) {
        setFocusableIndex(nextFocusableStep);
        elementRefs.current[nextFocusableStep]?.elementRef.current?.focus();
      }
    },
    [focusableIndex],
  );

  return { registerElementRef, handleElementKeyDown, setFocusableIndex, focusableIndex };
};

function getInitialIndex(options: UseRovingTabIndexFocusOptions) {
  const { initialFocusableIndex, elementCount } = options;

  if (initialFocusableIndex >= 0 && initialFocusableIndex < elementCount) {
    return initialFocusableIndex;
  }

  return 0;
}

function getNextFocusableStep(
  stepRefs: Array<{ elementRef: React.RefObject<HTMLElement | null>; disabled: boolean }>,
  currentStep: number,
  direction: 'next' | 'previous',
  passedOnce: boolean = false,
): number | null {
  if (direction === 'next') {
    if (currentStep === stepRefs.length - 1) {
      return passedOnce ? null : getNextFocusableStep(stepRefs, -1, direction, true);
    }

    if (stepRefs[currentStep + 1]?.disabled) {
      return getNextFocusableStep(stepRefs, currentStep + 1, direction, passedOnce);
    }

    return currentStep + 1;
  }

  if (direction === 'previous') {
    if (currentStep === 0) {
      return passedOnce ? null : getNextFocusableStep(stepRefs, stepRefs.length, direction, true);
    }

    if (stepRefs[currentStep - 1]?.disabled) {
      return getNextFocusableStep(stepRefs, currentStep - 1, direction, passedOnce);
    }

    return currentStep - 1;
  }

  throw new Error('Direction must be either "next" or "previous".');
}

export default useRovingTabIndexFocus;
