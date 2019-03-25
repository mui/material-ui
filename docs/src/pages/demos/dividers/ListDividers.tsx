import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Theme, WithStyles, WithTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '360px',
      backgroundColor: theme.palette.background.paper,
    },
  });

type Props = WithStyles<typeof styles> & WithTheme;

function ListDividers(props: Props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root}>
      <ListItem button>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
}

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ListDividers);
