import * as React from 'react';
import PropTypes from 'prop-types';

/**
 * @type {React.Context<{ idPrefix: string; value: string } | null>}
 */
const Context = React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix(idPrefix) {
  const ref = React.useRef()
  if (!ref.current || (typeof idPrefix === 'string' && ref.current !== idPrefix)) {
    ref.current = idPrefix || `mui-p-${Math.round(Math.random() * 1e5)}`
  }
  return ref.current;
}

export default function TabContext(props) {
  const { children, value, idPrefix: idPrefixProp } = props;
  const idPrefix = useUniquePrefix(idPrefixProp);

  const context = React.useMemo(() => {
    return { idPrefix, value };
  }, [idPrefix, value]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

TabContext.propTypes /* remove-proptypes */ = {
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
   */
  value: PropTypes.string.isRequired,
  /**
   * The optional id prefix, internally used to render buttons
   */
  idPrefix: PropTypes.string,
};

/**
 * @returns {unknown}
 */
export function useTabContext() {
  return React.useContext(Context);
}

export function getPanelId(context, value) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}

export function getTabId(context, value) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}
