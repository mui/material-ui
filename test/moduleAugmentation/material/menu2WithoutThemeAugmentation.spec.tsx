import * as React from 'react';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import { createTheme } from '@mui/material/styles';

<Menu2 trigger={<button type="button">Open</button>}>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

createTheme({
  components: {
    // @ts-expect-error Component imports must not enable Menu2 theme augmentation.
    MuiMenu2: { defaultProps: { modal: false } },
  },
});

createTheme({
  components: {
    // @ts-expect-error Item imports must not enable Menu2 theme augmentation.
    MuiMenu2Item: { defaultProps: { dense: true } },
  },
});
