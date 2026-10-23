import * as React from 'react';
import Menu2, { Menu2Props } from '@mui/material/Unstable_Menu2';
import Menu2Popup, { Menu2PopupProps } from '@mui/material/Unstable_Menu2Popup';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Trigger, { Menu2TriggerProps } from '@mui/material/Unstable_Menu2Trigger';

export { Button, Menu } from '@mui/material';
export { createTheme } from '@mui/material/styles';
export { Menu2, Menu2Trigger, Menu2Popup, Menu2SubmenuPopup };

export const triggerProps: Menu2TriggerProps = {
  disabled: false,
  children: React.createElement('button', { type: 'button' }, 'Profile'),
  onClick: (event) => {
    event.currentTarget satisfies HTMLElement;
    // @ts-expect-error The trigger event targets an HTML element.
    event.currentTarget satisfies SVGElement;
  },
};

export const invalidTriggerProps: Menu2TriggerProps = {
  ...triggerProps,
  // @ts-expect-error Trigger payloads are not part of the Menu2 API.
  payload: { id: 1, label: 'Profile' },
};

export const menuProps: Menu2Props = {
  open: true,
  children: React.createElement(Menu2Popup, null, 'Profile'),
};

export const popupProps: Menu2PopupProps = {
  anchor: React.createRef<HTMLButtonElement>(),
  finalFocus: React.createRef<HTMLButtonElement>(),
  children: 'Profile',
};

// Check callback types through the ESM component declaration.
Menu2({
  ...menuProps,
  onOpenChange: (open, eventDetails) => {
    open satisfies boolean;
    // @ts-expect-error The open state is a boolean.
    open satisfies string;
    eventDetails.cancel();
  },
  onOpenChangeComplete: (open) => {
    open satisfies boolean;
  },
});
