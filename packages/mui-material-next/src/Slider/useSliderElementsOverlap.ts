'use client';
import * as React from 'react';
import { Axis } from '@mui/base';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { debounce, isEqual } from 'lodash';

const overlapCompareFunctionByAxis = {
  horizontal: (firstElementRect: DOMRect, secondElementRect: DOMRect, margin: number) =>
    firstElementRect.right + margin > secondElementRect.left,
  'horizontal-reverse': (firstElementRect: DOMRect, secondElementRect: DOMRect, margin: number) =>
    secondElementRect.right + margin > firstElementRect.left,
  vertical: (firstElementRect: DOMRect, secondElementRect: DOMRect, margin: number) =>
    secondElementRect.bottom + margin > firstElementRect.top,
};

function getSliderElementsOverlap(elements: HTMLElement[], axis: Axis, margin: number) {
  const overlapArray = elements.map(() => false);

  for (let elementIndex = 0; elementIndex < elements.length - 1; elementIndex += 1) {
    const firstElementRect = elements[elementIndex].getBoundingClientRect();
    const secondElementRect = elements[elementIndex + 1].getBoundingClientRect();

    if (overlapCompareFunctionByAxis[axis](firstElementRect, secondElementRect, margin)) {
      overlapArray[elementIndex] = true;
      overlapArray[elementIndex + 1] = true;
    }
  }
  return overlapArray;
}

function useElementsOverlap(axis: Axis, margin: number = 0) {
  const elementsRefList = React.useRef<HTMLElement[]>([]);
  const [elementsOverlapArray, setElementsOverlapArray] = React.useState<boolean[]>([]);

  const setRef = React.useCallback((elementIndex: number, ref: HTMLElement) => {
    if (!!ref && elementsRefList.current[elementIndex] !== ref) {
      elementsRefList.current[elementIndex] = ref;
    }
  }, []);

  const getIsOverlapping = React.useCallback(
    (elementIndex: number, lastActiveIndex: number) => {
      if (elementsRefList.current.length < 2) {
        return false;
      }

      return elementsOverlapArray[elementIndex] && lastActiveIndex === elementIndex;
    },
    [elementsOverlapArray],
  );

  const onMove = React.useCallback(() => {
    if (elementsRefList.current.length > 1) {
      const updatedOverlap = getSliderElementsOverlap(elementsRefList.current, axis, margin);
      if (!isEqual(updatedOverlap, elementsOverlapArray)) {
        setElementsOverlapArray(updatedOverlap);
      }
    }
  }, [axis, elementsOverlapArray, margin]);

  return { setRef, getIsOverlapping, onMove };
}

export default function useSliderElementsOverlap(axis: Axis) {
  const {
    setRef: setThumbRef,
    getIsOverlapping: getIsThumbOverlapping,
    onMove: onThumbMove,
  } = useElementsOverlap(axis);

  // ValueLabel -12px margin is required due to how its "inverted water drop"
  // shape is built with CSS. Might want to allow this to be configurable in the future.
  const {
    setRef: setValueLabelRef,
    getIsOverlapping: getIsValueLabelOverlapping,
    onMove: onValueLabelMove,
  } = useElementsOverlap(axis, -12);

  const onThumbMoved = React.useCallback(() => {
    onThumbMove();
    onValueLabelMove();
  }, [onThumbMove, onValueLabelMove]);

  const debouncedOnThumbMoved = React.useMemo(() => debounce(onThumbMoved, 50), [onThumbMoved]);

  useEnhancedEffect(() => {
    onThumbMoved();
  }, [onThumbMoved]);

  return {
    setThumbRef,
    setValueLabelRef,
    getIsThumbOverlapping,
    getIsValueLabelOverlapping,
    onThumbMoved: debouncedOnThumbMoved,
  };
}
