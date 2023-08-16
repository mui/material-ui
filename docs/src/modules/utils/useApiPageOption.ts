import * as React from 'react';

export type ApiDisplayOptions = 'collapsed' | 'expended';

const options: ApiDisplayOptions[] = ['collapsed', 'expended'];

const getRandomOption = () => options[Math.floor(options.length * Math.random())];

export function useApiPageOption(storageKey: string) {
  const [option, setOption] = React.useState(options[0]);

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

  React.useEffect(() => {
    try {
      const savedOption = localStorage.getItem(storageKey);
      if (savedOption !== null) {
        setOption(savedOption as ApiDisplayOptions);
        return;
      }

      const randomOption = getRandomOption();
      updateOption(randomOption);
    } catch (error) {
      // do nothing
    }
  }, [storageKey, updateOption]);

  return [option, updateOption];
}
