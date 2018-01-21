import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import messages from 'docs/src/messages';

class Notifications extends React.Component {
  state = {
    open: false,
    message: {},
  };

  componentDidMount = () => {
    this.handleMessage();
  };

  getSeenNotifications = () => {
    const seen = document.cookie.replace(
      /(?:(?:^|.*;\s*)seenNotifications\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    return seen === '' ? 0 : parseInt(seen, 10);
  };

  getClosedNotifications = () => {
    const closed = document.cookie.replace(
      /(?:(?:^|.*;\s*)closedNotifications\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    const closedArray = closed ? closed.split(',') : [];
    return closedArray.map(a => parseInt(a, 10));
  };

  handleMessage = () => {
    const seen = this.getSeenNotifications();
    const closed = this.getClosedNotifications();

    const unseenMessages = messages.filter(
      message => message.id > seen && !closed.includes(message.id),
    );
    const maxMessage = unseenMessages.reduce((a, m) => Math.max(a, m.id), 0);

    if (!(seen >= maxMessage)) {
      this.setState({ message: unseenMessages.shift(), open: true });
    }
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
    document.cookie = `seenNotifications=${this.state.message.id};path=/`;

    // Close button clicked
    if (reason === undefined) {
      const closed = this.getClosedNotifications();

      if (closed.indexOf(this.state.message.id) === -1) {
        closed.push(this.state.message.id);
      }
      document.cookie = `closedNotifications=${closed.join()};path=/;max-age=31536000`;
    }
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        SnackbarContentProps={{
          'aria-describedby': 'message',
        }}
        message={
          // eslint-disable-next-line react/no-danger
          <span id="message" dangerouslySetInnerHTML={{ __html: this.state.message.text }} />
        }
        key={this.state.message.id}
        action={
          <Button dense color="secondary" onClick={this.handleClose}>
            Close
          </Button>
        }
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        onExited={this.handleMessage}
      />
    );
  }
}

export default Notifications;
