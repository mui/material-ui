import * as React from 'react';
import { useControlled } from '@mui/material/utils';
import Context from './TabsContext';

function useUniquePrefix() {
  const [id, setId] = React.useState<string | null>(null);
  React.useEffect(() => {
    setId(`mui-p-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

interface TabsContextProps {
  children?: React.ReactNode;
  value?: number;
  defaultValue?: number;
}

export default function TabsUnstyled(props: TabsContextProps) {
  const { children, value: valueProp, defaultValue } = props;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TabsUnstyled',
    state: 'value',
  });
  const idPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    return { idPrefix, value, onSelected: setValue };
  }, [idPrefix, value, setValue]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}
