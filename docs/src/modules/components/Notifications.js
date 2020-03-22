/* eslint-disable react/no-danger, react-hooks/exhaustive-deps */
import fetch from 'cross-fetch';
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import sleep from 'modules/waterfall/sleep';
import { getCookie } from 'docs/src/modules/utils/helpers';
import notifications from '../../../notifications.json';

const useStyles = makeStyles((theme) => ({
  paper: {
    transformOrigin: 'top right',
  },
  list: {
    maxWidth: theme.spacing(40),
    maxHeight: theme.spacing(40),
    overflow: 'auto',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function getLastSeenNotification() {
  const seen = getCookie('lastSeenNotification');
  return seen === '' ? 0 : parseInt(seen, 10);
}

let messages = null;

if (process.env.NODE_ENV !== 'production') {
  messages = notifications;
}

async function getMessages() {
  try {
    if (!messages) {
      await sleep(1500); // Soften the pressure on the main thread.
      const result = await fetch(
        'https://raw.githubusercontent.com/mui-org/material-ui/master/docs/notifications.json',
      );
      messages = await result.json();
    }
  } catch (err) {
    // Swallow the exceptions.
  }

  messages = messages || [];
}

export default function Notifications() {
  const classes = useStyles();
  const [messageList, setMessageList] = React.useState([]);
  const [unseenNotificationsCount, setUnseenNotificationsCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const t = useSelector((state) => state.options.t);
  const userLanguage = useSelector((state) => state.options.userLanguage);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setTooltipOpen(false);
    setUnseenNotificationsCount(0);
    document.cookie = `lastSeenNotification=${messageList[0].id};path=/;max-age=31536000`;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(!open);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleMessage = () => {
    const lastSeen = getLastSeenNotification();

    const userMessages = messages.filter((message) => {
      if (
        message.userLanguage &&
        message.userLanguage !== userLanguage &&
        message.userLanguage !== navigator.language.substring(0, 2)
      ) {
        return false;
      }
      return true;
    });

    const unseenCount = userMessages.reduce(
      (count, message) => (message.id > lastSeen ? count + 1 : count),
      0,
    );

    if (unseenCount > 0) {
      setUnseenNotificationsCount(unseenCount);
    }

    setMessageList(userMessages.reverse());
  };

  React.useEffect(() => {
    let active = true;

    // Prevent search engines from indexing the notification.
    if (/glebot/.test(navigator.userAgent)) {
      return undefined;
    }

    (async () => {
      await getMessages();
      if (active) {
        handleMessage();
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <React.Fragment>
      <Tooltip
        open={tooltipOpen}
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
        title={t('toggleNotifications')}
        enterDelay={300}
      >
        <IconButton
          color="inherit"
          ref={anchorRef}
          aria-controls={open ? 'notifications-popup' : undefined}
          aria-haspopup="true"
          aria-label={t('toggleNotifications')}
          onClick={handleToggle}
          data-ga-event-category="AppBar"
          data-ga-event-action="toggleNotifications"
        >
          <Badge color="secondary" badgeContent={unseenNotificationsCount}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popper
        id="notifications-popup"
        anchorEl={anchorRef.current}
        open={open}
        placement="bottom-end"
        transition
        disablePortal
        role={undefined}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow in={open} {...TransitionProps}>
              <Paper className={classes.paper}>
                <List className={classes.list}>
                  {messageList.map((message, index) => (
                    <React.Fragment key={message.id}>
                      <ListItem alignItems="flex-start" className={classes.listItem}>
                        {message.date && (
                          <ListItemText
                            secondary={new Date(message.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          />
                        )}
                        <ListItemText
                          primary={message.title}
                          secondary={
                            <span
                              id="notification-message"
                              dangerouslySetInnerHTML={{ __html: message.text }}
                            />
                          }
                          secondaryTypographyProps={{ color: 'textPrimary' }}
                        />
                      </ListItem>
                      {index < messageList.length - 1 ? <Divider variant="middle" /> : null}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
}
