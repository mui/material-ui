import * as React from 'react';
import Menu2, { createHandle, Menu2Handle, Menu2Props } from '@mui/material/Unstable_Menu2';
import Menu2Trigger, { Menu2TriggerProps } from '@mui/material/Unstable_Menu2Trigger';

export { Button, Menu } from '@mui/material';
export { createTheme } from '@mui/material/styles';
export { Menu2, Menu2Trigger, createHandle };

interface Payload {
  id: number;
  label: string;
}

const handle = createHandle<Payload>() satisfies Menu2Handle<Payload>;
handle.open('profile');
// @ts-expect-error Trigger IDs must be strings.
handle.open(1);

export const triggerProps: Menu2TriggerProps<Payload> = {
  handle,
  payload: { id: 1, label: 'Profile' },
  children: React.createElement('button', { type: 'button' }, 'Profile'),
};

export const invalidTriggerProps: Menu2TriggerProps<Payload> = {
  ...triggerProps,
  // @ts-expect-error The payload must match the handle type.
  payload: { id: 'profile', label: 'Profile' },
};

export const menuProps: Menu2Props<Payload> = {
  handle,
  children: ({ payload }) => payload?.label,
};

// Check inference from the handle through the ESM component declaration.
Menu2({
  handle,
  children: ({ payload }) => {
    payload satisfies Payload | undefined;
    // @ts-expect-error A trigger can omit its payload.
    payload satisfies Payload;
    // @ts-expect-error The payload label remains a string.
    payload?.label satisfies number | undefined;
    return payload?.label;
  },
});
