import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface SnackbarMessage {
  message?: string;
  key?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

interface State {
  open: boolean;
  messageInfo?: SnackbarMessage;
}

class ConsecutiveSnackbars extends React.Component<void, State> {
  queue: SnackbarMessage[] = [];

  constructor() {
    super();

    this.state = {
      open: false,
      messageInfo: {},
    };
  }

  handleClick = (message: string) => () => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const classes = useStyles();
    const { messageInfo = {} } = this.state;

    return (
      <div>
        <Button onClick={this.handleClick('message a')}>Show message A</Button>
        <Button onClick={this.handleClick('message b')}>Show message B</Button>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default ConsecutiveSnackbars;
