import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function ItemStates() {
  const [focusVisible, setFocusVisible] = React.useState(false);
  const theme = React.useMemo(() => createTheme({ focusVisible }), [focusVisible]);

  return (
    <ThemeProvider theme={theme}>
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
        <Menu2LinkItem href="#target">Link</Menu2LinkItem>
        <Menu2CheckboxItem>Checkbox</Menu2CheckboxItem>
        <Menu2RadioGroup>
          <Menu2RadioItem value="one">Radio</Menu2RadioItem>
        </Menu2RadioGroup>
        <Menu2Submenu
          slots={{ transition: null }}
          trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}
        >
          <Menu2Submenu
            trigger={<Menu2SubmenuTrigger openOnHover={false}>More tools</Menu2SubmenuTrigger>}
          >
            <Menu2Item>Leaf</Menu2Item>
          </Menu2Submenu>
        </Menu2Submenu>
        <Menu2Item selected>Selected</Menu2Item>
      </Menu2>
    </ThemeProvider>
  );
}
