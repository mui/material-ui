import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function SubmenuPointerExit() {
  const [selected, setSelected] = React.useState(false);
  const [focusVisible, setFocusVisible] = React.useState(false);
  const theme = React.useMemo(() => createTheme({ focusVisible }), [focusVisible]);

  return (
    <ThemeProvider theme={theme}>
      <label>
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />
        Selected trigger
      </label>
      <label>
        <input
          type="checkbox"
          checked={focusVisible}
          onChange={(event) => setFocusVisible(event.target.checked)}
        />
        Focus ring
      </label>
      <Menu2 trigger={<Button>Options</Button>} slots={{ transition: null }}>
        <Menu2Item>Plain</Menu2Item>
        <Menu2Submenu
          transitionDuration={{ enter: 0, exit: 1000 }}
          trigger={<Menu2SubmenuTrigger selected={selected}>More</Menu2SubmenuTrigger>}
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>
    </ThemeProvider>
  );
}
