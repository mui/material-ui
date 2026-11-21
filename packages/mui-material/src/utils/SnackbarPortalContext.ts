'use client';
import * as React from 'react';

const SnackbarPortalContext = React.createContext(false);

if (process.env.NODE_ENV !== 'production') {
  SnackbarPortalContext.displayName = 'SnackbarPortalContext';
}

export default SnackbarPortalContext;
