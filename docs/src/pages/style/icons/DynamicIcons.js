import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core/";
import * as Icons from "@material-ui/icons/";

const menu = [
  { id: 0, name: "Notifications", icon: "Notifications" },
  { id: 1, name: "Create Notification", icon: "AddAlert" }
];

function Menu() {
  return (
    <Paper>
      <MenuList>
        {menu.map(item => (
          <MenuItem key={item.id}>
            <ListItemIcon>{React.createElement(Icons[item.icon])}</ListItemIcon>
            <ListItemText inset primary={item.name} />
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}
export default Menu;
