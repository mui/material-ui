import * as React from 'react';
import { ModalProps } from './ModalProps';

const CloseModalContext = React.createContext<undefined | ModalProps['onClose']>(undefined);

export default CloseModalContext;
