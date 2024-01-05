'use client';
import * as React from 'react';

export function useHostElementName(parameters: { hostElementName?: keyof HTMLElementTagNameMap }) {
  const { hostElementName: hostElementNameProp = '' } = parameters;

  const [hostElementName, setHostElementName] = React.useState<string>(
    hostElementNameProp.toUpperCase(),
  );

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (hostElementNameProp && hostElementName !== hostElementNameProp.toUpperCase()) {
        console.error(`expected: ${hostElementNameProp}, actual ${hostElementName}`);
      }
    }, [hostElementNameProp, hostElementName]);
  }

  const updateHostElementName = React.useCallback((instance: HTMLElement | null) => {
    setHostElementName(instance?.tagName ?? '');
  }, []);

  return { hostElementName, updateHostElementName };
}
