'use client';
import * as React from 'react';

const TEXT_NAVIGATION_RESET_TIMEOUT = 500; // milliseconds

/**
 * @ignore - internal hook.
 *
 * Provides a handler for text navigation.
 * It's used to navigate a list by typing the first letters of the options.
 *
 * @param callback A function to be called when the navigation should be performed.
 * @returns A function to be used in a keydown event handler.
 */
export function useTextNavigation(
  callback: (searchString: string, event: React.KeyboardEvent) => void,
) {
  const textCriteriaRef = React.useRef<{
    searchString: string;
    lastTime: number | null;
  }>({
    searchString: '',
    lastTime: null,
  });

  return React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key.length === 1 && event.key !== ' ') {
        const textCriteria = textCriteriaRef.current;
        const lowerKey = event.key.toLowerCase();
        const currentTime = performance.now();
        if (
          textCriteria.searchString.length > 0 &&
          textCriteria.lastTime &&
          currentTime - textCriteria.lastTime > TEXT_NAVIGATION_RESET_TIMEOUT
        ) {
          textCriteria.searchString = lowerKey;
        } else if (
          textCriteria.searchString.length !== 1 ||
          lowerKey !== textCriteria.searchString
        ) {
          // If there is just one character in the buffer and the key is the same, do not append
          textCriteria.searchString += lowerKey;
        }

        textCriteria.lastTime = currentTime;

        callback(textCriteria.searchString, event);
      }
    },
    [callback],
  );
}
