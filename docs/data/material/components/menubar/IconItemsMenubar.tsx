import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
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

export default function IconItemsMenubar() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>File</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarItem icon={<AddIcon fontSize="small" />}>New</MenuBarItem>
              <MenuBarItem icon={<FolderOpenIcon fontSize="small" />}>Open...</MenuBarItem>
              <MenuBarItem icon={<SaveIcon fontSize="small" />}>Save</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarItem icon={<PrintIcon fontSize="small" />}>Print...</MenuBarItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger>Edit</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarItem icon={<UndoIcon fontSize="small" />}>Undo</MenuBarItem>
              <MenuBarItem icon={<RedoIcon fontSize="small" />}>Redo</MenuBarItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>
    </MenuBar>
  );
}
