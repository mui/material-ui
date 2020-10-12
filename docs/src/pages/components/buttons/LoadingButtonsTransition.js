import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      margin: theme.spacing(1),
    },
  },
  switch: {
    display: 'block',
  },
}));

export default function LoadingButtonsTransition() {
  const classes = useStyles();

  const [pending, setPending] = React.useState(false);
  function handleClick() {
    setPending(true);
  }

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={pending}
            onChange={() => setPending(!pending)}
            name="pending"
            color="primary"
          />
        }
        className={classes.switch}
        label="Pending"
      />
      <LoadingButton onClick={handleClick} pending={pending} variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        pending={pending}
        pendingIndicator="Loading..."
        variant="outlined"
      >
        Fetch data
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        endIcon={<SendIcon />}
        pending={pending}
        pendingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
      <LoadingButton
        color="secondary"
        onClick={handleClick}
        pending={pending}
        pendingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </LoadingButton>
    </div>
  );
}
