import { useState } from 'react';

const useUndoAndRedo = <T>(initialValue?: T) => {
  const [history, setHistory] = useState<{ stack: T[]; index: number }>({
    stack: initialValue !== undefined ? [initialValue] : [],
    index: 0,
  });

  const currentValue = history.stack[history.index];

  const setValue = (value: T) => {
    if (currentValue === value) {
      return;
    }

    setHistory((prev) => ({
      stack: [...prev.stack, value],
      index: prev.stack.length,
    }));
  };

  const clearHistory = () => {
    setHistory({
      stack: initialValue !== undefined ? [initialValue] : [],
      index: 0,
    });
  };

  const undo = (jumps: number = 1): T | undefined => {
    if (history.stack.length > 0 && history.index > 0) {
      const destination = history.index - jumps;
      const newIndex = Math.max(destination, 0);
      setHistory((prev) => ({
        ...prev,
        index: newIndex,
      }));
      return history.stack[newIndex];
    }
    return undefined;
  };

  const redo = (jumps: number = 1): T | undefined => {
    if (history.stack.length > 0 && history.index < history.stack.length - 1) {
      const destination = history.index + jumps;
      const newIndex = Math.min(destination, history.stack.length - 1);
      setHistory((prev) => ({
        ...prev,
        index: newIndex,
      }));
      return history.stack[newIndex];
    }
    return undefined;
  };

  return {
    value: currentValue,
    storeValue: setValue,
    clearHistory,
    currIndex: history.index,
    lastIndex: history.stack.length - 1,
    undo,
    redo,
  };
};

export default useUndoAndRedo;
