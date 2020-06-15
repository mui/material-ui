import React from 'react';
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
      <LoadingButton variant="outlined" pending={pending}>
        Submit
      </LoadingButton>
      <LoadingButton variant="outlined" pending={pending} pendingIndicator="Loading...">
        Fetch data
      </LoadingButton>
      <LoadingButton
        variant="contained"
        color="primary"
        pending={pending}
        pendingPosition="end"
        endIcon={<SendIcon />}
      >
        Send
      </LoadingButton>
      <LoadingButton
        variant="contained"
        color="secondary"
        pending={pending}
        pendingPosition="start"
        startIcon={<SaveIcon />}
      >
        Save
      </LoadingButton>
    </div>
  );
}
