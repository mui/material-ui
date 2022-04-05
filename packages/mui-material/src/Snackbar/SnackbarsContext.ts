import * as React from 'react';
import type { SnackbarProps } from './Snackbar';

export type SnackbarContentType =
  | React.ReactElement<any, any>
  | ((key: string) => React.ReactElement<any, any>);

export interface ShowSnackbarProps extends Omit<SnackbarProps, 'open' | 'children'> {
  /**
   * Replace the `SnackbarContent` component.
   */
  content?: SnackbarContentType;
}

export interface SnackbarsContextProps {
  showSnackbar(props: ShowSnackbarProps): void;
  closeSnackbar(key: string): () => void;
}

const SnackbarsContext = React.createContext<SnackbarsContextProps | undefined>(undefined);

export default SnackbarsContext;
