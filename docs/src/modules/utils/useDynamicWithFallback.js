import * as React from 'react';
import dynamic from 'next/dynamic';

export async function load(fileName, exportName) {
  const mod = await import(`../components/${fileName}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mod[exportName];
}

export const dynamicWithFallbackProps = (getter, options = {}) => {
  const PropsContext = React.createContext({});
  const patchedOptions = options.loading
    ? {
        ...options,
        loading: function Loading(...props) {
          const innerProps = React.useContext(PropsContext);
          return React.createElement(options.loading, {
            ...props,
            props: innerProps,
          });
        },
      }
    : options;
  const Inner = dynamic(getter, patchedOptions);
  return function Component(props) {
    return (
      <PropsContext.Provider value={props}>
        <Inner {...props} />
      </PropsContext.Provider>
    );
  };
};
