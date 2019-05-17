import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'space-evenly',
  },
  group: {
    display: 'inline-flex',
    borderRadius: 4,
  },
});

const options = [
  'Create a merge commit',
  'Squash and merge',
  'Rebase and merge',
];

function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleClick() {
    alert(`You clicked ${options[selectedIndex]}`)
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setOpen(false);
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs="12" md="4" align="center">
        <div className={classes.group}>
          <Button grouped variant="outlined" color="primary">
            One
          </Button>
          <Button grouped variant="outlined" color="primary">
            Two
          </Button>
          <Button grouped variant="outlined" color="primary">
            Three
          </Button>
        </div>
      </Grid>
      <Grid item xs="12" md="4" align="center">
        <div className={classes.group}>
          <Button grouped variant="contained">
            One
          </Button>
          <Button grouped variant="contained">
            Two
          </Button>
          <Button grouped variant="contained">
            Three
          </Button>
        </div>
      </Grid>
      <Grid item xs="12" md="4" align="center">
        <div className={classes.group} ref={anchorRef}>
          <Button grouped color="primary" variant="contained" onClick={handleClick}>
            {options[selectedIndex]}
          </Button>
          <Button 
            grouped
            color="primary"
            variant="contained"
            size="small" 
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={event => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Grid>
    </Grid>
  );
}

export default MenuListComposition;
