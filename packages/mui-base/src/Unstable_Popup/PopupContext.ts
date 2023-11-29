import * as React from 'react';
import { PopupPlacement } from './Popup.types';

export interface PopupContextValue {
  placement: PopupPlacement;
}

export const PopupContext = React.createContext<PopupContextValue | null>(null);
