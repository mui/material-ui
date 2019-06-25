import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const options = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function SimpleListMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="When device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
