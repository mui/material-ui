import * as React from 'react';
import { ModalDialogProps } from './ModalDialogProps';

const ModalDialogVariantColorContext = React.createContext<
  undefined | Pick<ModalDialogProps, 'variant' | 'color'>
>(undefined);

export default ModalDialogVariantColorContext;
