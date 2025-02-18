import * as React from 'react';
import { ModalProps } from './ModalProps';

const CloseModalContext = React.createContext<undefined | ModalProps['onClose']>(undefined);

if (process.env.NODE_ENV !== 'production') {
  CloseModalContext.displayName = 'CloseModalContext';
}

export default CloseModalContext;
