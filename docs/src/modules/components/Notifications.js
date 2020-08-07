/* eslint-disable react/no-danger, react-hooks/exhaustive-deps */
import fetch from 'cross-fetch';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import sleep from 'modules/waterfall/sleep';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES } from 'docs/src/modules/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    transformOrigin: 'top right',
  },
  list: {
    width: theme.spacing(40),
    maxHeight: theme.spacing(40),
    overflow: 'auto',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

export default function Notifications() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const t = useSelector((state) => state.options.t);
  const dispatch = useDispatch();
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const messages = useSelector((state) => state.notifications.messages);
  const lastSeen = useSelector((state) => state.notifications.lastSeen);

  const messageList = messages
    ? messages
        .filter((message) => {
          if (
            message.userLanguage &&
            message.userLanguage !== userLanguage &&
            message.userLanguage !== navigator.language.substring(0, 2)
          ) {
            return false;
          }
          return true;
        })
        .reverse()
    : null;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setTooltipOpen(false);

    if (messageList && messageList.length > 0) {
      dispatch({
        type: ACTION_TYPES.NOTIFICATIONS_CHANGE,
        payload: {
          lastSeen: messageList[0].id,
        },
      });
      document.cookie = `lastSeenNotification=${messageList[0].id};path=/;max-age=31536000`;
    }
  };

  React.useEffect(() => {
    let active = true;

    // Prevent search engines from indexing the notification.
    if (/glebot/.test(navigator.userAgent) || messages) {
      return undefined;
    }

    (async () => {
      await sleep(1500); // Soften the pressure on the main thread.
      let newMessages;
      try {
        const result = await fetch(
          'https://raw.githubusercontent.com/mui-org/material-ui/master/docs/notifications.json',
        );
        newMessages = await result.json();
      } catch (err) {
        // Swallow the exceptions, e.g. rate limit
      }

      if (active) {
        const seen = getCookie('lastSeenNotification');
        const lastSeenNotification = seen === '' ? 0 : parseInt(seen, 10);

        dispatch({
          type: ACTION_TYPES.NOTIFICATIONS_CHANGE,
          payload: {
            messages: newMessages || [],
            lastSeen: lastSeenNotification,
          },
        });
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
        onOpen={() => {
          setTooltipOpen(!open);
        }}
        onClose={() => {
          setTooltipOpen(false);
        }}
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
          <Badge
            color="secondary"
            badgeContent={
              messageList
                ? messageList.reduce(
                    (count, message) => (message.id > lastSeen ? count + 1 : count),
                    0,
                  )
                : 0
            }
          >
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
          <ClickAwayListener
            onClickAway={() => {
              setOpen(false);
            }}
          >
            <Grow in={open} {...TransitionProps}>
              <Paper className={classes.paper}>
                <List className={classes.list}>
                  {messageList ? (
                    messageList.map((message, index) => (
                      <React.Fragment key={message.id}>
                        <ListItem alignItems="flex-start" className={classes.listItem}>
                          <Typography gutterBottom>{message.title}</Typography>
                          <Typography gutterBottom variant="body2">
                            <span
                              id="notification-message"
                              dangerouslySetInnerHTML={{ __html: message.text }}
                            />
                          </Typography>
                          {message.date && (
                            <Typography variant="caption" color="textSecondary">
                              {new Date(message.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </Typography>
                          )}
                        </ListItem>
                        {index < messageList.length - 1 ? (
                          <Divider className={classes.divider} />
                        ) : null}
                      </React.Fragment>
                    ))
                  ) : (
                    <div className={classes.loading}>
                      <CircularProgress size={32} />
                    </div>
                  )}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
}
