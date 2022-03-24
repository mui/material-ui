import * as React from 'react';
import type { SnackbarProps } from './Snackbar';

export interface SnackbarsContextProps {
  showSnackbar(props: SnackbarProps): void;
}

const SnackbarsContext = React.createContext<SnackbarsContextProps | undefined>(undefined);

export default SnackbarsContext;
