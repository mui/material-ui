import * as React from 'react';

/**
 * @typedef {Array<{ version: string; url: string }>} InitialPropsContextValue
 */

/**
 * @type {React.Context<InitialPropsContextValue}
 */
const InitialPropsContext = React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  InitialPropsContext.displayName = 'InitialPropsContext';
}

export default InitialPropsContext;
