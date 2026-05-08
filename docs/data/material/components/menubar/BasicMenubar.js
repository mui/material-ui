import * as React from 'react';
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarPortal,
  MenuBarPositioner,
  MenuBarPopup,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarSubmenuRoot,
  MenuBarSubmenuTrigger,
} from '@mui/lab/MenuBar';

export default function BasicMenubar() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>File</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarItem>New</MenuBarItem>
              <MenuBarItem>Open...</MenuBarItem>
              <MenuBarItem>Save</MenuBarItem>
              <MenuBarItem>Save as...</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarSubmenuRoot>
                <MenuBarSubmenuTrigger>Share</MenuBarSubmenuTrigger>
                <MenuBarPortal>
                  <MenuBarPositioner alignOffset={-4}>
                    <MenuBarPopup>
                      <MenuBarItem>Email link</MenuBarItem>
                      <MenuBarItem>Copy link</MenuBarItem>
                    </MenuBarPopup>
                  </MenuBarPositioner>
                </MenuBarPortal>
              </MenuBarSubmenuRoot>
              <MenuBarSeparator />
              <MenuBarItem>Close</MenuBarItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger>Help</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4}>
            <MenuBarPopup>
              <MenuBarItem>Documentation</MenuBarItem>
              <MenuBarItem>Release notes</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarItem>About</MenuBarItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>
    </MenuBar>
  );
}
