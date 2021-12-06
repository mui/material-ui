import * as React from 'react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

/**
 * Similar to `React.useState`, but it syncs back the current state to a query
 * parameter in the url, therefore it only supports strings. Wrap the result with
 * parse/stringify logic if more complex values are needed.
 *
 * REMARK: this doesn't listen for router changes (yet) to update back the state.
 */
export default function useQueryParameterState(
  name: string,
  initialValue = '',
): [string, (newValue: string) => void] {
  const initialValueRef = React.useRef(initialValue);

  const router = useRouter();

  const queryParamValue = router.query[name];
  // eslint-disable-next-line no-console
  console.log(router.query, typeof window === 'undefined' ? null : window.location.search);
  const urlValue = Array.isArray(queryParamValue) ? queryParamValue[0] : queryParamValue;

  const [state, setState] = React.useState(urlValue || initialValue);

  const setUrlValue = React.useMemo(
    () =>
      debounce((newValue = '') => {
        const query = new URLSearchParams(window.location.search);
        if (newValue && newValue !== initialValueRef.current) {
          query.set(name, newValue);
        } else {
          query.delete(name);
        }
        const newSearch = query.toString();
        if (window.location.search !== newSearch) {
          router.replace(
            {
              pathname: router.pathname,
              // TODO: this resets the scroll position, even though we have scroll: false
              // hash: window.location.hash,
              search: newSearch,
            },
            undefined,
            {
              scroll: false,
              shallow: true,
            },
          );
        }
      }, 220),
    [name, router],
  );

  const setUserState = React.useCallback(
    (newValue: string) => {
      setUrlValue(newValue);
      setState(newValue);
    },
    [setUrlValue],
  );

  return [state, setUserState];
}
