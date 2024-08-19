import * as React from 'react';
import { styled } from '@mui/material/styles';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import MuiPaper from '@mui/material/Paper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiDivider from '@mui/material/Divider';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { useUserLanguage, useTranslate } from '@mui/docs/i18n';

async function fetchNotifications() {
  if (process.env.NODE_ENV === 'development') {
    const items = (await import('../../../notifications.json')).default;
    return items;
  }
  const response = await fetch(
    'https://raw.githubusercontent.com/mui/material-ui/master/docs/notifications.json',
  );
  return response.json();
}

const Paper = styled(MuiPaper)({
  transformOrigin: 'top right',
  backgroundImage: 'none',
});

const List = styled(MuiList)(({ theme }) => ({
  width: theme.spacing(40),
  maxHeight: 540,
  overflow: 'auto',
  padding: theme.spacing(1, 0),
}));

const ListItem = styled(MuiListItem)({
  display: 'flex',
  flexDirection: 'column',
});

const Loading = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(3, 0),
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export default function Notifications() {
  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const [{ lastSeen, messages }, setNotifications] = React.useState({
    lastSeen: undefined,
    messages: undefined,
  });

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

    if (process.env.NODE_ENV === 'development') {
      // Skip last seen logic in dev to make editing notifications easier.
      return;
    }

    if (messageList && messageList.length > 0) {
      const newLastSeen = messageList[0].id;
      setNotifications((notifications) => {
        if (newLastSeen !== notifications.lastSeen) {
          return {
            messages: notifications.messages,
            lastSeen: newLastSeen,
          };
        }
        return notifications;
      });
      document.cookie = `lastSeenNotification=${newLastSeen};path=/;max-age=31536000`;
    }
  };

  React.useEffect(() => {
    let active = true;

    // Prevent search engines from indexing the notification.
    if (/glebot/.test(navigator.userAgent) || messages) {
      return undefined;
    }

    // Soften the pressure on the main thread
    // and create some distraction.
    const timeout = setTimeout(async () => {
      const notifications = await fetchNotifications().catch(() => {
        // Swallow the exceptions, for example rate limit
        return [];
      });

      if (active) {
        // Permanent notifications
        const filteredNotifications = [
          /* {
            id: 0,
            title: "Let's translate!",
            text: '<a style="color: inherit;" target="_blank" rel="noopener" data-ga-event-category="l10n" data-ga-event-action="notification" data-ga-event-label="zh" href="https://crowdin.com/project/material-ui-docs">帮助 MUI 将文档翻译成中文</a>. 🇨🇳',
            userLanguage: 'zh',
          }, */
          {
            id: 1,
            text: 'You can <a style="color: inherit;" target="_blank" rel="noopener" href="https://x.com/MUI_hq">follow us on X</a> or subscribe on <a style="color: inherit;" target="_blank" rel="noopener" href="/blog/">our blog</a> to receive exclusive tips and updates about MUI and the React ecosystem.',
          },
          // Only 3
          ...notifications.splice(-3),
        ];

        const seen = getCookie('lastSeenNotification');
        const lastSeenNotification = seen === undefined ? 0 : parseInt(seen, 10);
        setNotifications({
          messages: filteredNotifications,
          lastSeen: lastSeenNotification,
        });
      }
    }, 1500);

    return () => {
      clearTimeout(timeout);
      active = false;
    };
  }, [messages]);

  return (
    <React.Fragment>
      <Tooltip
        open={tooltipOpen}
        title={t('toggleNotifications')}
        enterDelay={300}
        onOpen={() => {
          setTooltipOpen(!open);
        }}
        onClose={() => {
          setTooltipOpen(false);
        }}
      >
        <IconButton
          color="primary"
          size="small"
          ref={anchorRef}
          aria-controls={open ? 'notifications-popup' : undefined}
          aria-haspopup="true"
          aria-label={`${
            messageList
              ? messageList.reduce(
                  (count, message) => (message.id > lastSeen ? count + 1 : count),
                  0,
                )
              : 0
          } ${t('unreadNotifications')}`}
          data-ga-event-category="AppBar"
          data-ga-event-action="toggleNotifications"
          onClick={handleToggle}
        >
          <Badge
            color="error"
            badgeContent={
              messageList
                ? messageList.reduce(
                    (count, message) => (message.id > lastSeen ? count + 1 : count),
                    0,
                  )
                : 0
            }
          >
            <NotificationsNoneRoundedIcon fontSize="small" />
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
              <Paper
                sx={(theme) => ({
                  mt: 0.5,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
                  ...theme.applyDarkStyles({
                    borderColor: 'primaryDark.700',
                    boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.5)`,
                  }),
                })}
              >
                <List>
                  {messageList ? (
                    messageList.map((message, index) => (
                      <React.Fragment key={message.id}>
                        <ListItem alignItems="flex-start">
                          <Typography gutterBottom>
                            <b>{message.title}</b>
                          </Typography>
                          <Typography gutterBottom variant="body2" sx={{ color: 'text.secondary' }}>
                            <span
                              id="notification-message"
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: message.text }}
                            />
                          </Typography>
                          {message.date && (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {new Date(message.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </Typography>
                          )}
                        </ListItem>
                        {index < messageList.length - 1 ? <Divider /> : null}
                      </React.Fragment>
                    ))
                  ) : (
                    <Loading>
                      <CircularProgress size={32} />
                    </Loading>
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
