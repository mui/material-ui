import * as React from 'react';
import * as PropTypes from 'prop-types';

const Context = React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix() {
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    setId(`mui-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

export default function TabContext(props) {
  const { children, value } = props;
  const panelPrefix = useUniquePrefix();
  const tabPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    return { tabPrefix, panelPrefix, value };
  }, [panelPrefix, tabPrefix, value]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

TabContext.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: PropTypes.any.isRequired,
};

export function useTabContext() {
  return React.useContext(Context);
}
