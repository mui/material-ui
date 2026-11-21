'use client';
import * as React from 'react';
import SnackbarPortalContext from './SnackbarPortalContext';

export const SNACKBAR_CONTAINER_ATTRIBUTE = 'data-mui-snackbar-container';

const snackbarContainerStyle: React.CSSProperties = { display: 'contents' };

export default function SnackbarContainer() {
  const hasPortaledSnackbar = React.useContext(SnackbarPortalContext);
  if (!hasPortaledSnackbar) {
    return null;
  }

  return <div data-mui-snackbar-container="" style={snackbarContainerStyle} />;
}
