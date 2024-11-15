import * as React from 'react';

const PrioritySupport = React.createContext<{
  isPrioritySupport: boolean;
  setIsPrioritySupport: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isPrioritySupport: false,
  setIsPrioritySupport: () => {},
});

/*
if (process.env.NODE_ENV !== 'production') {
  LicenseModel.displayName = 'LicenseModel';
}
*/

export function PrioritySupportProvider(props: any) {
  const [isPrioritySupport, setIsPrioritySupport] = React.useState<boolean>(false);
  const value = React.useMemo(
    () => ({ isPrioritySupport, setIsPrioritySupport }),
    [isPrioritySupport, setIsPrioritySupport],
  );
  return <PrioritySupport.Provider value={value}>{props.children}</PrioritySupport.Provider>;
}

export function usePrioritySupport() {
  return React.useContext(PrioritySupport);
}
