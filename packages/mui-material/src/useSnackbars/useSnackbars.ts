import * as React from 'react';
import SnackbarsContext, { SnackbarsContextProps } from '../Snackbar/SnackbarsContext';

export default function useSnackbars(): SnackbarsContextProps {
  const context = React.useContext(SnackbarsContext);

  if (context === undefined) {
    throw new Error('MUI: useSnackbars must be within a SnackbarsProvider');
  }

  return context;
}
