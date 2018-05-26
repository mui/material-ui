import * as React from 'react';
import NotificationBar from '@material-ui/lab/NotificationBar';

class ClosableNotificationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: true,
      warning: true,
      info: true,
      success: true,
    };
  }

  onClose(flag) {
    this.setState({
      [flag]: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.error && (
          <NotificationBar onClose={() => this.onClose('error')} showCloseButton type="error">
            This is an error message!
          </NotificationBar>
        )}
        {this.state.warning && (
          <NotificationBar onClose={() => this.onClose('warning')} showCloseButton type="warning">
            This is a warning message!
          </NotificationBar>
        )}
        {this.state.info && (
          <NotificationBar onClose={() => this.onClose('info')} showCloseButton type="info">
            This is an information message!
          </NotificationBar>
        )}
        {this.state.success && (
          <NotificationBar onClose={() => this.onClose('success')} showCloseButton type="success">
            This is a success message!
          </NotificationBar>
        )}
      </div>
    );
  }
}

export default ClosableNotificationBar;
