import * as React from 'react';
import type { SnackbarProps } from '@mui/material/Snackbar';

export type SnackbarContentType =
  | React.ReactElement<any, any>
  | ((key: string) => React.ReactElement<any, any>);

export type SnackbarActionType = React.ReactNode | ((key: string) => React.ReactNode);

export interface ShowSnackbarProps extends Omit<SnackbarProps, 'open' | 'children' | 'action'> {
  /**
   * Replace the `SnackbarContent` component.
   */
  content?: SnackbarContentType;
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: SnackbarActionType;
}

export interface SnackbarsContextProps {
  show(props?: ShowSnackbarProps): void;
  close(key: string): () => void;
}

const SnackbarsContext = React.createContext<SnackbarsContextProps | undefined>(undefined);

export default SnackbarsContext;
