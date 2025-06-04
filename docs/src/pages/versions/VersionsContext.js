import * as React from 'react';

/**
 * @typedef {Array<{ version: string; url: string }>} VersionsContextValue
 */

/**
 * @type {React.Context<VersionsContextValue}
 */
const VersionsContext = React.createContext(null);

export default VersionsContext;
