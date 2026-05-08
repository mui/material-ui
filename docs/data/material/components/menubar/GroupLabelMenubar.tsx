import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import TuneIcon from '@mui/icons-material/Tune';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
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
  MenuBarGroup,
  MenuBarGroupLabel,
} from '@mui/lab/MenuBar';

export default function GroupLabelMenubar() {
  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>App</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarGroup>
                <MenuBarGroupLabel>General</MenuBarGroupLabel>
                <MenuBarItem icon={<InfoIcon fontSize="small" />}>About</MenuBarItem>
                <MenuBarItem icon={<SettingsIcon fontSize="small" />}>
                  Settings...
                </MenuBarItem>
              </MenuBarGroup>
              <MenuBarSeparator />
              <MenuBarSubmenuRoot>
                <MenuBarSubmenuTrigger icon={<BuildIcon fontSize="small" />}>
                  Services
                </MenuBarSubmenuTrigger>
                <MenuBarPortal>
                  <MenuBarPositioner alignOffset={-4}>
                    <MenuBarPopup>
                      <MenuBarGroup>
                        <MenuBarGroupLabel>Development</MenuBarGroupLabel>
                        <MenuBarItem icon={<MonitorHeartIcon fontSize="small" />}>
                          Activity Monitor
                        </MenuBarItem>
                        <MenuBarItem icon={<TimelineIcon fontSize="small" />}>
                          System Trace
                        </MenuBarItem>
                        <MenuBarItem icon={<InsertDriveFileIcon fontSize="small" />}>
                          File Activity
                        </MenuBarItem>
                      </MenuBarGroup>
                      <MenuBarSeparator />
                      <MenuBarGroup>
                        <MenuBarGroupLabel>Shortcuts</MenuBarGroupLabel>
                        <MenuBarItem icon={<ToggleOnIcon fontSize="small" />}>
                          Toggle Gate
                        </MenuBarItem>
                        <MenuBarItem icon={<TuneIcon fontSize="small" />}>
                          Services Settings...
                        </MenuBarItem>
                      </MenuBarGroup>
                    </MenuBarPopup>
                  </MenuBarPositioner>
                </MenuBarPortal>
              </MenuBarSubmenuRoot>
              <MenuBarSeparator />
              <MenuBarGroup>
                <MenuBarGroupLabel>Window</MenuBarGroupLabel>
                <MenuBarItem icon={<VisibilityOffIcon fontSize="small" />}>
                  Hide App
                </MenuBarItem>
                <MenuBarItem icon={<VisibilityOffIcon fontSize="small" />}>
                  Hide Others
                </MenuBarItem>
                <MenuBarItem icon={<VisibilityIcon fontSize="small" />}>
                  Show All
                </MenuBarItem>
              </MenuBarGroup>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger>Edit</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4}>
            <MenuBarPopup>
              <MenuBarGroup>
                <MenuBarGroupLabel>History</MenuBarGroupLabel>
                <MenuBarItem icon={<UndoIcon fontSize="small" />}>Undo</MenuBarItem>
                <MenuBarItem icon={<RedoIcon fontSize="small" />}>Redo</MenuBarItem>
              </MenuBarGroup>
              <MenuBarSeparator />
              <MenuBarGroup>
                <MenuBarGroupLabel>Clipboard</MenuBarGroupLabel>
                <MenuBarItem icon={<ContentCutIcon fontSize="small" />}>Cut</MenuBarItem>
                <MenuBarItem icon={<ContentCopyIcon fontSize="small" />}>Copy</MenuBarItem>
                <MenuBarItem icon={<ContentPasteIcon fontSize="small" />}>
                  Paste
                </MenuBarItem>
              </MenuBarGroup>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>
    </MenuBar>
  );
}
