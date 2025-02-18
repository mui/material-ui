import * as React from 'react';
import { ModalDialogProps } from './ModalDialogProps';

const ModalDialogSizeContext = React.createContext<undefined | ModalDialogProps['size']>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ModalDialogSizeContext.displayName = 'ModalDialogSizeContext';
}

export default ModalDialogSizeContext;
