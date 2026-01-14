import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from './Menubar';

export default function BasicMenubar() {
  return (
    <Menubar>
      <MenuRoot>
        <MenuTrigger>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem>
                <ListItemText>New</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Open...</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Save</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Save as...</ListItemText>
              </MenuItem>
              <MenuSeparator />
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>
                  <ListItemText>Share</ListItemText>
                </MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner alignOffset={-4}>
                    <MenuPopup>
                      <MenuItem>
                        <ListItemText>Email link</ListItemText>
                      </MenuItem>
                      <MenuItem>
                        <ListItemText>Copy link</ListItemText>
                      </MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuItem>
                <ListItemText>Close</ListItemText>
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger disabled>Help</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup>
              <MenuItem>
                <ListItemText>Documentation</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Release notes</ListItemText>
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <ListItemText>About</ListItemText>
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
