import * as React from 'react';
import { ModalDialogProps } from './ModalDialogProps';

const ModalDialogVariantColorContext = React.createContext<
  | undefined
  | (Pick<ModalDialogProps, 'variant' | 'color'> & { labelledBy?: string; describedBy?: string })
>(undefined);

export default ModalDialogVariantColorContext;
