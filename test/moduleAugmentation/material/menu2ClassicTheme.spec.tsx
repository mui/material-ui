import * as React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {
  createTheme,
  ComponentNameToClassKey,
  Components,
  ComponentsPropsList,
  ComponentsOwnerStateList,
} from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiMenu: { defaultProps: { open: false } },
    MuiMenuItem: { defaultProps: { dense: true } },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme: componentTheme }) => ({
          color:
            ownerState.variant === 'contained' ? componentTheme.palette.primary.main : 'inherit',
        }),
      },
    },
  },
});

<Button>Open</Button>;
<Menu open={false}>
  <MenuItem>Item</MenuItem>
</Menu>;

// Menu2 theme types must not load through the classic component or styles exports.
const hasMenu2Components: Extract<keyof Components, `MuiMenu2${string}`> extends never
  ? false
  : true = false;
const hasMenu2Props: Extract<keyof ComponentsPropsList, `MuiMenu2${string}`> extends never
  ? false
  : true = false;
const hasMenu2OwnerState: Extract<keyof ComponentsOwnerStateList, `MuiMenu2${string}`> extends never
  ? false
  : true = false;
const hasMenu2Classes: Extract<keyof ComponentNameToClassKey, `MuiMenu2${string}`> extends never
  ? false
  : true = false;

// @ts-expect-error Menu2 theme keys require the separate augmentation import.
theme.components?.MuiMenu2;
