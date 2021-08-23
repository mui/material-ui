import { useCallback, useRef, useState } from 'react';

function useStateRef<T>(initialValue: T): [T, (nextState: T) => void, () => T] {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(initialValue);
  stateRef.current = state;
  const getState = useCallback(() => stateRef.current, []);
  return [state, setState, getState];
}

export default useStateRef;
