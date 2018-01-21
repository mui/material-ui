import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import messages from 'docs/src/messages';

class Notifications extends React.Component {
  state = {
    open: false,
    message: { text: 'foo', id: 0 },
    seen: 0,
  };

  componentDidMount = () => {
    this.handleMessage();
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
    const closed = this.getClosedNotifications();

    const unseenMessages = messages.filter(
      message => message.id > this.state.seen && !closed.includes(message.id),
    );
    const maxMessage = unseenMessages.reduce((a, m) => Math.max(a, m.id), 0);

    if (!(this.state.seen >= maxMessage)) {
      this.setState({ message: unseenMessages.shift(), open: true });
    }
  };

  handleClose = (event, reason) => {
    this.setState({ open: false, seen: this.state.message.id });

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
