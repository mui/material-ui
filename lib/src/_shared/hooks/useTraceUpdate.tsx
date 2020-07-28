import * as React from 'react';
// ! Important not to use this hook in production build

export function useDebuggingTraceUpdate(props: any) {
  const prev = React.useRef(props);
  React.useEffect(() => {
    // @ts-ignore
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      // eslint-disable-next-line no-console
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}
