'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

/**
 * @type {React.Context<{ idPrefix: string; value: string } | null>}
 */
const Context = React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix(idGenerator = Math.random) {
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    setId(`mui-p-${Math.round(idGenerator() * 1e5)}`);
  }, [idGenerator]);
  return id;
}

export default function TabContext(props) {
  const { children, value, idGenerator } = props;
  const idPrefix = useUniquePrefix(idGenerator);

  const context = React.useMemo(() => {
    return { idPrefix, value };
  }, [idPrefix, value]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

TabContext.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The optional id generator, internally used to render buttons, falls back to Math.random
   */
  idGenerator: PropTypes.func,
  /**
   * The value of the currently selected `Tab`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
