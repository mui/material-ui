import * as React from 'react';
import type { SnackbarProps } from './Snackbar';

type ShowSnackbarProps = Omit<SnackbarProps, 'open'>;

export interface SnackbarsContextProps {
  showSnackbar(props: ShowSnackbarProps): void;
}

const SnackbarsContext = React.createContext<SnackbarsContextProps | undefined>(undefined);

export default SnackbarsContext;
