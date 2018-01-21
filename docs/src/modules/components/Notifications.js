/* eslint-disable react/no-danger */

import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

function getLastSeenNotification() {
  const seen = document.cookie.replace(
    /(?:(?:^|.*;\s*)lastSeenNotification\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
  return seen === '' ? 0 : parseInt(seen, 10);
}

class Notifications extends React.Component {
  state = {
    open: false,
    messages: [],
    message: {},
  };

  componentDidMount = () => {
    this.getMessages();
  };

  getMessages = () => {
    const url =
      'https://raw.githubusercontent.com/mui-org/material-ui/v1-beta/docs/notifications.json';
    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        this.setState({ messages: JSON.parse(request.responseText) });
        this.handleMessage();
      }
    };

    request.open('GET', url, true);
    request.send();
  };

  handleMessage = () => {
    const lastSeen = getLastSeenNotification();
    const unseenMessages = this.state.messages.filter(message => message.id > lastSeen);
    if (unseenMessages.length > 0) {
      this.setState({ message: unseenMessages[0], open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
    document.cookie = `lastSeenNotification=${this.state.message.id};path=/;max-age=31536000`;
  };

  render() {
    const { message, open } = this.state;

    return (
      <Snackbar
        key={message.id}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        SnackbarContentProps={{ 'aria-describedby': 'notification-message' }}
        message={
          <span id="notification-message" dangerouslySetInnerHTML={{ __html: message.text }} />
        }
        action={
          <Button dense color="secondary" onClick={this.handleClose}>
            Close
          </Button>
        }
        open={open}
        autoHideDuration={10000}
        onClose={this.handleClose}
        onExited={this.handleMessage}
      />
    );
  }
}

export default Notifications;
