import * as React from 'react';

export type ApiDisplayOptions = 'collapsed' | 'expended';

const options: ApiDisplayOptions[] = ['collapsed', 'expended'];

export default function useApiPageOption(storageKey: string) {
  const [option, setOption] = React.useState(
    () => options[Math.floor(options.length * Math.random())],
  );

  React.useEffect(() => {
    try {
      const savedOption = localStorage.getItem(storageKey);
      if (savedOption !== null) {
        setOption(savedOption as ApiDisplayOptions);
      }
    } catch (error) {
      // do nothing
    }
  }, [storageKey]);

  const updateOption = React.useCallback(
    (newOption: ApiDisplayOptions) => {
      try {
        localStorage.setItem(storageKey, newOption);
      } catch (error) {
        // Do nothing
      }
      setOption(newOption);
    },
    [storageKey],
  );
  return [option, updateOption];
}
