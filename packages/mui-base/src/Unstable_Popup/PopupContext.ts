import * as React from 'react';
import { PopupPlacement } from './Popup.types';

export interface PopupContextValue {
  placement: PopupPlacement;
}

export const PopupContext = React.createContext<PopupContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  PopupContext.displayName = 'PopupContext';
}
