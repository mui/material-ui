import * as React from 'react';

const ModalDialogAriaContext = React.createContext<
  undefined | { labelId?: string; descriptionId?: string }
>(undefined);

export default ModalDialogAriaContext;
