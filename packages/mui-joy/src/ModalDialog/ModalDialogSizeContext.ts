import * as React from 'react';
import { ModalDialogProps } from './ModalDialogProps';

const ModalDialogSizeContext = React.createContext<undefined | ModalDialogProps['size']>(undefined);

export default ModalDialogSizeContext;
