import * as React from 'react';
import Snackbar, { SnackbarProps } from './Snackbar';
import SnackbarContext from './SnackbarContext';

interface SnackbarProviderProps
  extends Omit<SnackbarProps, 'children' | 'classes' | 'key' | 'message' | 'onClose' | 'open'> {
  /** The maximum number of snackbars to display at a time.
   * @default 5
   */
  limit?: number;
}

const SnackbarProvider = ({
  limit = 5,
  children,
}: SnackbarProviderProps & { children?: React.ReactElement<any, any> }) => {
  return (
    <SnackbarContext.Provider value={}>
      <Snackbar />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
