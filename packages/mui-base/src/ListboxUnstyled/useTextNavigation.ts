import * as React from 'react';
import { ActionTypes, ListboxAction, UseListboxPropsWithDefaults } from './useListbox.types';

const TEXT_NAVIGATION_RESET_TIMEOUT = 500; // milliseconds

/**
 * Provides a handler for text navigation.
 * It's used to navigate the listbox by typing the first letters of the options.
 *
 * @param dispatch The dispatch function from the reducer.
 * @param propsWithDefaults Props with defaults applied.
 * @returns A function to be used in a keydown event handler.
 */
export default function useTextNavigation<TOption>(
  dispatch: (action: ListboxAction<TOption>) => void,
  propsWithDefaults: React.RefObject<UseListboxPropsWithDefaults<TOption>>,
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

        dispatch({
          type: ActionTypes.textNavigation,
          event,
          searchString: textCriteria.searchString,
          props: propsWithDefaults.current,
        });
      }
    },
    [dispatch, propsWithDefaults],
  );
}
