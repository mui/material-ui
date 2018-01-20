import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import messages from 'docs/src/messages';

class Notifications extends React.Component {
  state = {
    snackbarOpen: false,
    snackbarMessage: {},
  };

  componentDidMount = () => {
    this.handleSnackbarMessage();
  };

  handleSnackbarMessage = () => {
    let lastMessage = document.cookie.replace(
      /(?:(?:^|.*;\s*)lastMessage\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );

    if (lastMessage === '') {
      lastMessage = 0;
    }

    const message = messages.find(m => {
      return m.id > lastMessage;
    });

    if (message) {
      this.setState({
        snackbarMessage: message,
        snackbarOpen: true,
      });
    }
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
    document.cookie = `lastMessage=${this.state.snackbarMessage.id};path=/;max-age=31536000`;
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={this.state.snackbarOpen}
        SnackbarContentProps={{
          'aria-describedby': 'message',
        }}
        message={<span id="message">{this.state.snackbarMessage.text}</span>}
        key={this.state.snackbarMessage.id}
        action={
          <Button dense color="secondary" onClick={this.handleSnackbarClose}>
            Close
          </Button>
        }
        onExited={this.handleSnackbarMessage}
      />
    );
  }
}

export default Notifications;
