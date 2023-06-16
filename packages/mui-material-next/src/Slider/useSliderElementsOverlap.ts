import * as React from 'react';
import { Axis } from '@mui/base';

function getSliderElementsOverlap(elements: HTMLElement[], axis: Axis, margin: number) {
  if (elements.length === 2) {
    const [firstElement, secondElement] = elements;
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
  const elementsRefList = React.useRef<HTMLElement[]>([]);
  const [elementsOverlap, setThumbsOverlap] = React.useState(false);

  const setRef = React.useCallback((elementIndex: number, ref: HTMLElement) => {
    if (!!ref && elementsRefList.current[elementIndex] !== ref) {
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

  const onThumbMoved = () => {
    onThumbMove();
    onValueLabelMove();
  };

  return {
    setThumbRef,
    setValueLabelRef,
    getIsThumbOverlapping,
    getIsValueLabelOverlapping,
    onThumbMoved,
  };
}
