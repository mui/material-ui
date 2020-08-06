import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function GutterlessList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {[1, 2, 3].map((value) => (
        <ListItem key={value} disableGutters>
          <ListItemText primary={`Line item ${value}`} />
          <ListItemSecondaryAction>
            <CommentIcon color="action" />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
