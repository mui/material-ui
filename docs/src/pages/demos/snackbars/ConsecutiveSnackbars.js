import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function processQueue(queue, setState) {
  if (queue.length > 0) {
    const messageInfo = queue[0];
    setState({
      open: true,
      queue: queue.slice(1),
      messageInfo,
    });
  }
}

function handleClick(message, state, setState) {
  return () => {
    const newQueue = [
      ...state.queue,
      {
        message,
        key: new Date().getTime(),
      },
    ];

    if (state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      setState({
        open: false,
        queue: newQueue,
        messageInfo: state.messageInfo,
      });
    } else {
      processQueue(newQueue, setState);
    }
  };
}

function handleClose(queue, setState) {
  return (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({
      open: false,
      queue,
    });
  };
}

function handleExited(queue, setState) {
  return () => processQueue(queue, setState);
}

function ConsecutiveSnackbars() {
  const classes = useStyles();

  const [state, setState] = useState({
    open: false,
    queue: [],
  });

  const { open, messageInfo = {} } = state;

  return (
    <div>
      <Button onClick={handleClick('message a', state, setState)}>Show message A</Button>
      <Button onClick={handleClick('message b', state, setState)}>Show message B</Button>
      <Snackbar
        key={messageInfo.key}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose(state.queue, setState)}
        onExited={handleExited(state.queue, setState)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{messageInfo.message}</span>}
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={handleClose(state.queue, setState)}
          >
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose(state.queue, setState)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

export default ConsecutiveSnackbars;
