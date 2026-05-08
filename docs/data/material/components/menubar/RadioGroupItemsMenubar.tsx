import * as React from 'react';
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarPortal,
  MenuBarPositioner,
  MenuBarPopup,
  MenuBarRadioGroup,
  MenuBarRadioItem,
  MenuBarSeparator,
  MenuBarSubmenuRoot,
  MenuBarSubmenuTrigger,
} from '@mui/lab/MenuBar';

export default function RadioGroupItemsMenubar() {
  const [theme, setTheme] = React.useState('system');
  const [density, setDensity] = React.useState('compact');

  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>Appearance</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarSubmenuRoot>
                <MenuBarSubmenuTrigger>Theme</MenuBarSubmenuTrigger>
                <MenuBarPortal>
                  <MenuBarPositioner alignOffset={-4}>
                    <MenuBarPopup>
                      <MenuBarRadioGroup value={theme} onValueChange={setTheme}>
                        <MenuBarRadioItem value="light">Light</MenuBarRadioItem>
                        <MenuBarRadioItem value="dark">Dark</MenuBarRadioItem>
                        <MenuBarRadioItem value="system">System</MenuBarRadioItem>
                      </MenuBarRadioGroup>
                    </MenuBarPopup>
                  </MenuBarPositioner>
                </MenuBarPortal>
              </MenuBarSubmenuRoot>
              <MenuBarSeparator />
              <MenuBarRadioGroup value={density} onValueChange={setDensity}>
                <MenuBarRadioItem value="compact">Compact</MenuBarRadioItem>
                <MenuBarRadioItem value="comfortable">Comfortable</MenuBarRadioItem>
              </MenuBarRadioGroup>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>
    </MenuBar>
  );
}
