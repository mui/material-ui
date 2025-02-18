import * as React from 'react';
import { ModalDialogProps } from './ModalDialogProps';

const ModalDialogVariantColorContext = React.createContext<
  | undefined
  | (Pick<ModalDialogProps, 'variant' | 'color'> & { labelledBy?: string; describedBy?: string })
>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ModalDialogVariantColorContext.displayName = 'ModalDialogVariantColorContext';
}

export default ModalDialogVariantColorContext;
