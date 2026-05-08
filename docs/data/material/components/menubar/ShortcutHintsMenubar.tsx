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
} from '@mui/lab/MenuBar';

export default function ShortcutHintsMenubar() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>File</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarItem hint="⌘N">New</MenuBarItem>
              <MenuBarItem hint="⌘O">Open...</MenuBarItem>
              <MenuBarItem hint="⌘S">Save</MenuBarItem>
              <MenuBarItem hint="⇧⌘S">Save As...</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarItem hint="⌘P">Print...</MenuBarItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger>Edit</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarItem hint="⌘Z">Undo</MenuBarItem>
              <MenuBarItem hint="⇧⌘Z">Redo</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarItem hint="⌘X">Cut</MenuBarItem>
              <MenuBarItem hint="⌘C">Copy</MenuBarItem>
              <MenuBarItem hint="⌘V">Paste</MenuBarItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>
    </MenuBar>
  );
}
