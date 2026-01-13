import * as React from 'react';

const PrioritySupport = React.createContext<{
  prioritySupport: boolean;
  setPrioritySupport: React.Dispatch<React.SetStateAction<boolean>>;
}>(undefined as any);

if (process.env.NODE_ENV !== 'production') {
  PrioritySupport.displayName = 'PrioritySupport';
}

export function PrioritySupportProvider(props: any) {
  const [prioritySupport, setPrioritySupport] = React.useState<boolean>(false);
  const value = React.useMemo(
    () => ({ prioritySupport, setPrioritySupport }),
    [prioritySupport, setPrioritySupport],
  );
  return <PrioritySupport.Provider value={value}>{props.children}</PrioritySupport.Provider>;
}

export function usePrioritySupport() {
  return React.useContext(PrioritySupport);
}
