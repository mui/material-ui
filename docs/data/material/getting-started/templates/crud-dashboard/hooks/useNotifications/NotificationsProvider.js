import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import CloseIcon from '@mui/icons-material/Close';
import useSlotProps from '@mui/utils/useSlotProps';
import NotificationsContext from './NotificationsContext';

const RootPropsContext = React.createContext(null);

function Notification({ notificationKey, open, message, options, badge }) {
  const notificationsContext = React.useContext(NotificationsContext);
  if (!notificationsContext) {
    throw new Error('Notifications context was used without a provider.');
  }
  const { close } = notificationsContext;

  const { severity, actionText, onAction, autoHideDuration } = options;

  const handleClose = React.useCallback(
    (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      close(notificationKey);
    },
    [notificationKey, close],
  );

  const action = (
    <React.Fragment>
      {onAction ? (
        <Button color="inherit" size="small" onClick={onAction}>
          {actionText ?? 'Action'}
        </Button>
      ) : null}
      <IconButton
        size="small"
        aria-label="Close"
        title="Close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const props = React.useContext(RootPropsContext);
  const snackbarSlotProps = useSlotProps({
    elementType: Snackbar,
    ownerState: props,
    externalSlotProps: {},
    additionalProps: {
      open,
      autoHideDuration,
      onClose: handleClose,
      action,
    },
  });

  return (
    <Snackbar key={notificationKey} {...snackbarSlotProps}>
      <Badge badgeContent={badge} color="primary" sx={{ width: '100%' }}>
        {severity ? (
          <Alert severity={severity} sx={{ width: '100%' }} action={action}>
            {message}
          </Alert>
        ) : (
          <SnackbarContent message={message} action={action} />
        )}
      </Badge>
    </Snackbar>
  );
}

Notification.propTypes = {
  badge: PropTypes.string,
  message: PropTypes.node,
  notificationKey: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    actionText: PropTypes.node,
    autoHideDuration: PropTypes.number,
    key: PropTypes.string,
    onAction: PropTypes.func,
    severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  }).isRequired,
};

function Notifications({ state }) {
  const currentNotification = state.queue[0] ?? null;

  return currentNotification ? (
    <Notification
      {...currentNotification}
      badge={state.queue.length > 1 ? String(state.queue.length) : null}
    />
  ) : null;
}

Notifications.propTypes = {
  state: PropTypes.shape({
    queue: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.node,
        notificationKey: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        options: PropTypes.shape({
          actionText: PropTypes.node,
          autoHideDuration: PropTypes.number,
          key: PropTypes.string,
          onAction: PropTypes.func,
          severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

let nextId = 0;
const generateId = () => {
  const id = nextId;
  nextId += 1;
  return id;
};

/**
 * Provider for Notifications. The subtree of this component can use the `useNotifications` hook to
 * access the notifications API. The notifications are shown in the same order they are requested.
 */
function NotificationsProvider(props) {
  const { children } = props;
  const [state, setState] = React.useState({ queue: [] });

  const show = React.useCallback((message, options = {}) => {
    const notificationKey =
      options.key ?? `::toolpad-internal::notification::${generateId()}`;
    setState((prev) => {
      if (prev.queue.some((n) => n.notificationKey === notificationKey)) {
        // deduplicate by key
        return prev;
      }
      return {
        ...prev,
        queue: [...prev.queue, { message, options, notificationKey, open: true }],
      };
    });
    return notificationKey;
  }, []);

  const close = React.useCallback((key) => {
    setState((prev) => ({
      ...prev,
      queue: prev.queue.filter((n) => n.notificationKey !== key),
    }));
  }, []);

  const contextValue = React.useMemo(() => ({ show, close }), [show, close]);

  return (
    <RootPropsContext.Provider value={props}>
      <NotificationsContext.Provider value={contextValue}>
        {children}
        <Notifications state={state} />
      </NotificationsContext.Provider>
    </RootPropsContext.Provider>
  );
}

NotificationsProvider.propTypes = {
  children: PropTypes.node,
};

export default NotificationsProvider;
