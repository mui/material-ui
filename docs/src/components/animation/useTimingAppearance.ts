import * as React from 'react';

export default function useTimingAppearance(
  length: number,
  options?: { delay?: number; interval?: number },
) {
  const { delay = 0, interval = 200 } = options || {};
  const [appearIndexes, setAppearIndexes] = React.useState<Array<number>>([]);
  const hasStarted = React.useRef(false);
  React.useEffect(() => {
    if (!hasStarted.current) {
      const time = setTimeout(() => {
        hasStarted.current = true;
        if (!appearIndexes.length) {
          setAppearIndexes([0]);
        }
      }, delay);

      return () => {
        clearTimeout(time);
      };
    }
    return () => {};
  }, [hasStarted, appearIndexes, delay]);
  React.useEffect(() => {
    const time = setTimeout(() => {
      if (appearIndexes.length && appearIndexes.length < length) {
        setAppearIndexes((current) => [...current, current.length]);
      }
    }, interval);

    return () => {
      clearTimeout(time);
    };
  }, [appearIndexes, interval, length]);
  return [appearIndexes, setAppearIndexes] as const;
}
