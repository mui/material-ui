'use client';
import * as React from 'react';

interface DialogContextValue {
  titleId?: string;
}

const DialogContext = React.createContext<DialogContextValue>({});

export default DialogContext;
