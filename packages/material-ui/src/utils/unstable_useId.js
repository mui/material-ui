import * as React from 'react';

/**
 * @ignore - internal component.
 */
export const IdContext = React.createContext({
  generateId: () => `mui-${Math.round(Math.random() * 1e5)}`,
});

if (process.env.NODE_ENV !== 'production') {
  IdContext.displayName = 'IdContext';
}

/**
 * Private module reserved for @material-ui/x packages.
 */
export default function useId(idOverride) {
  const idContext = React.useContext(IdContext);
  const [defaultId] = React.useState(idOverride || idContext.generateId());
  const id = idOverride || defaultId;
  return id;
}
