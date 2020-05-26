import * as React from 'react';
import { useRouter } from 'next/router';

export default function ErrorDecoder() {
  const {
    query: { code, ...query },
  } = useRouter();
  const args = Array.isArray(query['args[]']) ? query['args[]'] : [query['args[]']];

  const [data, dispatch] = React.useReducer(
    (previousState, action) => {
      switch (action.type) {
        case 'rejected':
          return { errorCodes: null, state: 'rejected' };
        case 'resolved':
          return { errorCodes: action.payload, state: 'resolved' };
        default:
          throw new Error(`We made a mistake passing an unknown action.`);
      }
    },
    { errorCodes: null, state: 'loading' },
  );

  React.useEffect(() => {
    let cancelled = false;

    fetch('/static/error-codes.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (cancelled === false) {
          dispatch({ type: 'resolved', payload: json });
        }
      })
      .catch(() => {
        dispatch({ type: 'rejected' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (data.state === 'loading') {
    return <p>loading spinner TODO</p>;
  }

  if (data.state === 'rejected') {
    return <p>failed to fetch TODO</p>;
  }

  const errorMessage = data.errorCodes[code];
  if (errorMessage === undefined) {
    return <p>unknown message TODO</p>;
  }

  let replacementIndex = -1;
  const readableMessage = errorMessage.replace(/%s/g, () => {
    replacementIndex += 1;
    // TODO do we need to escape?
    return args[replacementIndex];
  });

  // TODO format
  return <p>{readableMessage}</p>;
}
