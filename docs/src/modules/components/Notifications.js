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

  handleMessage = () => {
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
        message,
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
    document.cookie = `lastMessage=${this.state.message.id};path=/;max-age=31536000`;
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={this.state.open}
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
        onExited={this.handleMessage}
      />
    );
  }
}

export default Notifications;
