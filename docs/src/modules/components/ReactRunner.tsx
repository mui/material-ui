import * as React from 'react';
import { useRunner } from 'react-runner';

interface ReactRunnerProps {
  code: string;
  scope: {
    process: {};
    import: {};
  };
  onError: (error: string | null) => {};
  forwardProps?: {};
}

// The docs https://github.com/nihgwu/react-runner
export default function ReactRunner(props: ReactRunnerProps) {
  const { code, scope: scopeProp, onError } = props;

  let scope = scopeProp;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    scope = React.useMemo(() => {
      const handler = {
        get() {
          throw new Error(
            [
              'A demo tries to access process.x in ReactRunner. This is not supported.',
              'If you do not need to show the source, you can set "hideToolbar": true to solve the issue.',
            ].join('\n'),
          );
        },
      };

      const proxyProcess = new Proxy(scopeProp.process, handler);

      return {
        ...scopeProp,
        process: proxyProcess,
      };
    }, [scopeProp]);
  }

  const { element, error } = useRunner({
    code,
    scope,
  });

  React.useEffect(() => {
    onError(error);
  }, [error, onError]);

  // TODO:
  // if (Object.keys(forwardProps).length > 0) {
  //   console.log('forwardProps', element);
  //   return React.cloneElement(element, forwardProps);
  // }

  return element;
}
