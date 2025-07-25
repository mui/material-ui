import * as React from 'react';
import { OpenDialog, CloseDialog } from './useDialogs';

const DialogsContext = React.createContext<{
  open: OpenDialog;
  close: CloseDialog;
} | null>(null);

export default DialogsContext;
