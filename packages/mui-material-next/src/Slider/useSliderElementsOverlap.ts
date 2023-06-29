import * as React from 'react';
import { Axis } from '@mui/base';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';

type SliderElements = [HTMLElement?, HTMLElement?];

function getSliderElementsOverlap(elements: SliderElements, axis: Axis, margin: number) {
  const [firstElement, secondElement] = elements;
  if (firstElement && secondElement) {
    const firstElementRect = firstElement.getBoundingClientRect();
    const secondElementRect = secondElement.getBoundingClientRect();
    if (axis === 'horizontal') {
      return firstElementRect.right + margin > secondElementRect.left;
    }
    if (axis === 'horizontal-reverse') {
      return secondElementRect.right + margin > firstElementRect.left;
    }
    return secondElementRect.bottom + margin > firstElementRect.top;
  }
  return false;
}

function useElementsOverlap(axis: Axis, margin: number = 0) {
  const elementsRefList = React.useRef<SliderElements>([]);
  const [elementsOverlap, setThumbsOverlap] = React.useState(false);

  const setRef = React.useCallback((elementIndex: number, ref: HTMLElement) => {
    if (elementIndex <= 1 && !!ref && elementsRefList.current[elementIndex] !== ref) {
      elementsRefList.current[elementIndex] = ref;
    }
  }, []);

  const getIsOverlapping = React.useCallback(
    (elementIndex: number, lastActiveIndex: number) => {
      if (elementsRefList.current.length !== 2) {
        return false;
      }

      if (lastActiveIndex === -1) {
        return elementsOverlap && elementIndex === 0;
      }

      return elementsOverlap && lastActiveIndex === elementIndex;
    },
    [elementsOverlap],
  );

  const onMove = React.useCallback(() => {
    if (elementsRefList.current.length === 2) {
      const updatedOverlap = getSliderElementsOverlap(elementsRefList.current, axis, margin);
      if (updatedOverlap !== elementsOverlap) {
        setThumbsOverlap(updatedOverlap);
      }
    }
  }, [axis, elementsOverlap, margin]);

  return { setRef, getIsOverlapping, onMove };
}

export default function useSliderElementsOverlap(axis: Axis) {
  const {
    setRef: setThumbRef,
    getIsOverlapping: getIsThumbOverlapping,
    onMove: onThumbMove,
  } = useElementsOverlap(axis);

  const {
    setRef: setValueLabelRef,
    getIsOverlapping: getIsValueLabelOverlapping,
    onMove: onValueLabelMove,
  } = useElementsOverlap(axis, -12);
  // ValueLabel -12px margin is required due to how its "inverted water drop"
  // shape is built with CSS. Might want to allow this to be configurable
  // in the future.

  const onThumbMoved = React.useCallback(() => {
    onThumbMove();
    onValueLabelMove();
  }, [onThumbMove, onValueLabelMove]);

  useEnhancedEffect(() => {
    onThumbMoved();
  }, [onThumbMoved]);

  return {
    setThumbRef,
    setValueLabelRef,
    getIsThumbOverlapping,
    getIsValueLabelOverlapping,
    onThumbMoved,
  };
}
