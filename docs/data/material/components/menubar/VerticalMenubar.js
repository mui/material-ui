import * as React from 'react';
import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
} from './Menubar';

export default function VerticalMenubar() {
  return (
    <Menubar orientation="vertical">
      <MenuRoot>
        <MenuTrigger>Settings</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side="right" sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem>General</MenuItem>
              <MenuItem>Notifications</MenuItem>
              <MenuItem>Privacy</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Appearance</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side="right" sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem>Theme</MenuItem>
              <MenuItem>Font Size</MenuItem>
              <MenuSeparator />
              <MenuItem>Reset to Default</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Account</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side="right" sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Security</MenuItem>
              <MenuSeparator />
              <MenuItem>Sign Out</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
