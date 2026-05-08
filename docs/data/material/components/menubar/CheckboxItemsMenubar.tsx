import * as React from 'react';
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarPortal,
  MenuBarPositioner,
  MenuBarPopup,
  MenuBarItem,
  MenuBarCheckboxItem,
  MenuBarSeparator,
} from '@mui/lab/MenuBar';

export default function CheckboxItemsMenubar() {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [showStatusBar, setShowStatusBar] = React.useState(false);
  const [googleTasks, setGoogleTasks] = React.useState(true);
  const [mail, setMail] = React.useState(false);
  const [messages, setMessages] = React.useState(false);

  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>View</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarCheckboxItem
                checked={showSidebar}
                onCheckedChange={setShowSidebar}
              >
                Show Sidebar
              </MenuBarCheckboxItem>
              <MenuBarCheckboxItem
                checked={showToolbar}
                onCheckedChange={setShowToolbar}
              >
                Show Toolbar
              </MenuBarCheckboxItem>
              <MenuBarCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Show Status Bar
              </MenuBarCheckboxItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>

      <MenuBarMenu>
        <MenuBarTrigger>Window</MenuBarTrigger>
        <MenuBarPortal>
          <MenuBarPositioner sideOffset={4} alignOffset={-2}>
            <MenuBarPopup>
              <MenuBarItem hint="⌘M">Minimize</MenuBarItem>
              <MenuBarItem>Zoom</MenuBarItem>
              <MenuBarItem hint="⌃⌥F">Fill</MenuBarItem>
              <MenuBarItem hint="⌃⌥C">Center</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarItem>Bring All to Front</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarCheckboxItem
                checked={googleTasks}
                onCheckedChange={setGoogleTasks}
              >
                Google Tasks - Tasks
              </MenuBarCheckboxItem>
              <MenuBarCheckboxItem checked={mail} onCheckedChange={setMail}>
                Mail
              </MenuBarCheckboxItem>
              <MenuBarCheckboxItem checked={messages} onCheckedChange={setMessages}>
                Messages
              </MenuBarCheckboxItem>
            </MenuBarPopup>
          </MenuBarPositioner>
        </MenuBarPortal>
      </MenuBarMenu>
    </MenuBar>
  );
}
