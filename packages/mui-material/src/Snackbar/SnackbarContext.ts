import * as React from 'react';
import type { SnackbarProps } from './Snackbar';

interface SnackbarContextProps {
  showSnackbar(props: SnackbarProps): string;
}

const SnackbarContext = React.createContext<SnackbarContextProps | undefined>(undefined);

export default SnackbarContext;
