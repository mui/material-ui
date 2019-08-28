import React from 'react';
import {
  makeStyles,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemAvatar,
  Badge,
  Avatar,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.type === 'light' ? theme.palette.grey[100] : '#333'}`,
  },
}));

export default function CustomizedBadges() {
  const classes = useStyles();

  const [isOnline, setIsOnline] = React.useState(true);

  const handleIsOnlineChange = (event, checked) => {
    setIsOnline(checked);
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch />}
        label="Johnny's online status"
        checked={isOnline}
        onChange={handleIsOnlineChange}
      />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Badge
              classes={{ badge: classes.badge }}
              verticalAlignment="bottom"
              overlap="circle"
              variant="dot"
              badgeContent=" "
              invisible={!isOnline}
            >
              <Avatar alt="Stock avatar" src="/static/images/avatar/1.jpg" />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary="Johnny Doe"
            secondary="Could you pop by the store on your way back and grab some tomatoes? 🍅"
          />
        </ListItem>
      </List>
    </div>
  );
}
