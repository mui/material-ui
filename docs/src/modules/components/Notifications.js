/* eslint-disable react/no-danger */

import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import messages from 'docs/src/messages';

if (messages.length > 3) {
  throw new Error('We cannot display more than 3 notifications in a row');
}

function getLastSeenNotifications() {
  const seen = document.cookie.replace(
    /(?:(?:^|.*;\s*)lastSeenNotifications\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
  return seen === '' ? 0 : parseInt(seen, 10);
}

class Notifications extends React.Component {
  state = {
    open: false,
    message: {},
  };

  componentDidMount = () => {
    this.handleMessage();
  };

  handleMessage = () => {
    const lastSeen = getLastSeenNotifications();
    const unseenMessages = messages.filter(message => message.id > lastSeen);
    if (unseenMessages.length > 0) {
      this.setState({ message: unseenMessages[0], open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
    document.cookie = `lastSeenNotifications=${this.state.message.id};path=/`;
  };

  render() {
    const { message, open } = this.state;

    return (
      <Snackbar
        key={message.id}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        SnackbarContentProps={{
          'aria-describedby': 'notification-message',
        }}
        message={
          <span id="notification-message" dangerouslySetInnerHTML={{ __html: message.text }} />
        }
        action={
          <Button dense color="secondary" onClick={this.handleClose}>
            Close
          </Button>
        }
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        onExited={this.handleMessage}
      />
    );
  }
}

export default Notifications;
