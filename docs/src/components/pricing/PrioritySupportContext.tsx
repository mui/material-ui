import * as React from 'react';

const PrioritySupport = React.createContext<{
  isPrioritySupport: boolean;
  setIsPrioritySupport: React.Dispatch<React.SetStateAction<boolean>>;
}>(undefined as any);

if (process.env.NODE_ENV !== 'production') {
  PrioritySupport.displayName = 'PrioritySupport';
}

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
