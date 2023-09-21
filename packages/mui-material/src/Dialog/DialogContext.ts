import * as React from 'react';

interface DialogContextValue {
  titleId?: string;
}

const DialogContext = React.createContext<DialogContextValue>({});

if (process.env.NODE_ENV !== 'production') {
  DialogContext.displayName = 'DialogContext';
}

export default DialogContext;
