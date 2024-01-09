'use client';
import * as React from 'react';
/**
 *
 * API:
 *
 * - [useHostElementName API](https://mui.com/base-ui/api/use-host-element-name/)
 */
export function useHostElementName(parameters: { hostElementName?: keyof HTMLElementTagNameMap }) {
  const { hostElementName: hostElementNameProp = '' } = parameters;

  const [hostElementName, setHostElementName] = React.useState<string>(
    hostElementNameProp.toUpperCase(),
  );

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (hostElementNameProp && hostElementName !== hostElementNameProp.toUpperCase()) {
        console.error(
          `useHostElementName: the \`hostElementName\` prop of COMPONENT expected the '${hostElementNameProp}' element, but a '${hostElementName}' element was rendered instead`,
          'This may cause hydration issues in an SSR context, e.g. in a Next.js app',
        );
      }
    }, [hostElementNameProp, hostElementName]);
  }

  const updateHostElementName = React.useCallback((instance: HTMLElement | null) => {
    setHostElementName(instance?.tagName ?? '');
  }, []);

  return { hostElementName, updateHostElementName };
}
