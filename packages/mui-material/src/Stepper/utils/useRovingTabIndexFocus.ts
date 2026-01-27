import * as React from 'react';

type UseRovingTabIndexFocusOptions = {
  initialFocusableIndex: number;
};

const useRovingTabIndexFocus = (options: UseRovingTabIndexFocusOptions) => {
  const { initialFocusableIndex } = options;
  const [focusableIndex, setFocusableIndex] = React.useState(initialFocusableIndex);
  const elementRefs = React.useRef<
    { elementRef: React.RefObject<HTMLElement | null>; disabled: boolean }[]
  >([]);

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

    if (stepRefs[currentStep + 1].disabled) {
      return getNextFocusableStep(stepRefs, currentStep + 1, direction, passedOnce);
    }

    return currentStep + 1;
  }

  if (direction === 'previous') {
    if (currentStep === 0) {
      return passedOnce ? null : getNextFocusableStep(stepRefs, stepRefs.length, direction, true);
    }

    if (stepRefs[currentStep - 1].disabled) {
      return getNextFocusableStep(stepRefs, currentStep - 1, direction, passedOnce);
    }

    return currentStep - 1;
  }

  throw new Error('Direction must be either "next" or "previous".');
}

export default useRovingTabIndexFocus;
