'use client';
import * as React from 'react';

type UseHostElementNameParameters = {
  /**
   * The HTML element expected to be rendered, e.g. 'div', 'button' etc
   * @default ''
   */
  hostElementName?: keyof HTMLElementTagNameMap;
  /**
   * The name of the component using useControllableReducer.
   * For debugging purposes.
   */
  componentName?: string;
};

/**
 * @ignore - do not document.
 *
 * Use this function determine the host element correctly on the server (in a SSR context, e.g. Next.js)
 */
export function useHostElementName(
  parameters: UseHostElementNameParameters,
): [string, (instance: HTMLElement | null) => void] {
  const { hostElementName: hostElementNameProp = '', componentName } = parameters;

  const [hostElementName, setHostElementName] = React.useState<string>(
    hostElementNameProp.toUpperCase(),
  );

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (hostElementNameProp && hostElementName !== hostElementNameProp.toUpperCase()) {
        console.error(
          `useHostElementName: the \`hostElementName\` prop of ${
            componentName ? `the ${componentName} component` : 'a component'
          } expected the '${hostElementNameProp}' element, but a '${hostElementName.toLowerCase()}' was rendered instead`,
          'This may cause hydration issues in an SSR context, e.g. in a Next.js app',
        );
      }
    }, [hostElementNameProp, hostElementName, componentName]);
  }

  const updateHostElementName = React.useCallback((instance: HTMLElement | null) => {
    setHostElementName(instance?.tagName ?? '');
  }, []);

  return [hostElementName, updateHostElementName];
}
