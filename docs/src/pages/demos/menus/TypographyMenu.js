import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const styles = theme => ({
  root: {
    width: '170px',
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $itemText, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  itemText: {
    padding: '0 16px',
    flex: '1 1 auto',
  },
  icon: {},
});

function TypographyMenu(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SendIcon />
          </ListItemIcon>
          <Typography classes={{ root: classes.itemText }} variant="subtitle1">
            Sent mail
          </Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <Typography classes={{ root: classes.itemText }} variant="subtitle1">
            Drafts
          </Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <PriorityHighIcon />
          </ListItemIcon>
          <Typography classes={{ root: classes.itemText }} variant="subtitle1" noWrap>
            Important
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

TypographyMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TypographyMenu);
