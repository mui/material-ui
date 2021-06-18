import { createContext } from 'react';

interface DialogContextValue {
  titleId?: string;
}

const DialogContext = createContext<DialogContextValue>({});

export default DialogContext;
