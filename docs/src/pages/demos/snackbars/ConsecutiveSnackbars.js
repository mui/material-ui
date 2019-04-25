import React from 'react';
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

const DefaultState = {
  open: false,
  queue: [],
  messageInfo: undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case 'addItem': {
      const nextState = {
        ...state,
        queue: [...state.queue, { key: new Date().getTime(), message: action.payload }],
      };

      if (state.open) {
        nextState.open = false;
      } else {
        nextState.messageInfo = nextState.queue.shift();
        nextState.open = true;
      }

      return nextState;
    }
    case 'processQueue': {
      if (state.queue.length === 0) return state;

      const nextState = { ...state, open: true };
      nextState.messageInfo = nextState.queue.shift();
      return nextState;
    }
    case 'close': {
      return { ...state, open: false };
    }
    default: {
      return state;
    }
  }
}

function ConsecutiveSnackbars() {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, DefaultState);

  function handleClick(message) {
    dispatch({ type: 'addItem', payload: message });
  }

  function processQueue() {
    dispatch({ type: 'processQueue' });
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: 'close' });
  }

  function handleExited() {
    processQueue();
  }

  return (
    <div>
      <Button onClick={e => handleClick('Message A')}>Show message A</Button>
      <Button onClick={e => handleClick('Message B')}>Show message B</Button>
      <Snackbar
        key={state.messageInfo === undefined ? undefined : state.messageInfo.key}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{state.messageInfo && state.messageInfo.message}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

export default ConsecutiveSnackbars;
