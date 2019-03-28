import React, { useState } from 'react';
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
  queue: SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

function processQueue(
  queue: SnackbarMessage[],
  setState: (value: React.SetStateAction<State>) => void,
) {
  console.log('queue', queue);
  if (queue.length > 0) {
    const messageInfo = queue[0];
    console.log('messageInfo', messageInfo);
    setState({
      open: true,
      queue: queue.slice(1),
      messageInfo,
    });
  }
}

function handleClick(
  message: string,
  state: State,
  setState: (value: React.SetStateAction<State>) => void,
) {
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
      console.log('processQueue');
      processQueue(newQueue, setState);
    }
  };
}

function handleClose(
  queue: SnackbarMessage[],
  setState: (value: React.SetStateAction<State>) => void,
) {
  return (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({
      open: false,
      queue,
    });
  };
}

function handleExited(
  queue: SnackbarMessage[],
  setState: (value: React.SetStateAction<State>) => void,
) {
  return () => processQueue(queue, setState);
}

function ConsecutiveSnackbars() {
  const classes = useStyles();

  const [state, setState] = useState<State>({
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
