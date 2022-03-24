import * as React from 'react';
import SnackbarsContext from './SnackbarsContext';

export default function useSnackbars() {
  const context = React.useContext(SnackbarsContext);

  if (context === undefined) {
    return new Error('useSnackbars must be within a SnackbarsProvider');
  }

  return context;
}
