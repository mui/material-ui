import React from 'react';
import {
  Theme,
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

const useStyles = makeStyles((theme: Theme) => ({
  badge: {
    backgroundColor: '#44b700',
    border: `2px solid ${theme.palette.background.level2}`,
    minWidth: 12,
    height: 12,
  },
  horizontalAlignmentRight: {
    right: 0,
  },
  verticalAlignmentBottom: {
    bottom: 0,
  },
}));

export default function CustomizedBadges() {
  const classes = useStyles();

  const [isOnline, setIsOnline] = React.useState(true);

  const handleIsOnlineChange = (event: any, checked: boolean) => {
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
              classes={{
                badge: classes.badge,
                horizontalAlignmentRight: classes.horizontalAlignmentRight,
                verticalAlignmentBottom: classes.verticalAlignmentBottom,
              }}
              verticalAlignment="bottom"
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
