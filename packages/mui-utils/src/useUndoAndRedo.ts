import isEqual from 'lodash/isEqual';
import { useState } from 'react';

const useUndoAndRedo = <T>(initialValue?: T) => {
  const [values, setValues] = useState<T[]>(initialValue !== undefined ? [initialValue] : []);
  const [index, setIndex] = useState(initialValue !== undefined ? 0 : -1);

  const currentValue = values[index];

  const setValue = (value: T) => {
    if (isEqual(currentValue, value)) {
      return;
    }

    setValues((prev) => [...prev.slice(0, index + 1), value]);
    setIndex((prev) => prev + 1);
  };

  const clearHistory = () => {
    setIndex(0);
    setValues(initialValue !== undefined ? [initialValue] : []);
  };

  const undo = (jumps: number = 1): T | undefined => {
    if (values.length > 0 && index > 0) {
      const destination = index - jumps;
      const newIndex = Math.max(destination, 0);
      setIndex(newIndex);
      return values[newIndex];
    }
    return undefined;
  };

  const redo = (jumps: number = 1): T | undefined => {
    if (values.length > 0 && index < values.length - 1) {
      const destination = index + jumps;
      const newIndex = Math.min(destination, values.length - 1);
      setIndex(newIndex);
      return values[newIndex];
    }
    return undefined;
  };

  return {
    value: currentValue,
    storeValue: setValue,
    clearHistory,
    currIndex: index,
    lastIndex: values.length - 1,
    undo,
    redo,
  };
};

export default useUndoAndRedo;
