import * as React from 'react';
import NotificationBar from '@material-ui/lab/NotificationBar';

class ClosableNotificationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: true,
      showWarning: true,
      showInfo: true,
      showSuccess: true,
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
        {this.state.showError && (
          <NotificationBar
            onClose={() => this.onClose('showError')}
            showCloseButton
            type="error">
            This is an error message!
          </NotificationBar>
        )}
        {this.state.showWarning && (
          <NotificationBar
            onClose={() => this.onClose('showWarning')}
            showCloseButton
            type="warning">
            This is a warning message!
          </NotificationBar>
        )}
        {this.state.showInfo && (
          <NotificationBar
            onClose={() => this.onClose('showInfo')}
            showCloseButton
            type="info">
            This is an information message!
          </NotificationBar>
        )}
        {this.state.showSuccess && (
          <NotificationBar
            onClose={() => this.onClose('showSuccess')}
            showCloseButton
            type="success">
            This is a success message!
          </NotificationBar>
        )}
      </div>
    );
  }
}

export default ClosableNotificationBar;
