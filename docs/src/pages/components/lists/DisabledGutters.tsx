import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DisabledGutters() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Primary Contact" />
      <CardContent>
        <List disablePadding component="nav" aria-label="contacts">
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar alt="Elizabeth Park" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Elizabeth Park" secondary="Principal Engineer" />
            <ListItemSecondaryAction>
              <IconButton>
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="(650) 555-1234" secondary="Mobile" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText inset primary="(650) 555-5678" secondary="Work" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="heyfromelizabeth@gmail.com" secondary="Work" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
