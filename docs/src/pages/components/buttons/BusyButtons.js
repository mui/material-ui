import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BusyButton from '@material-ui/core/BusyButton';
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

export default function BusyButtons() {
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
        label="Loading"
      />
      <BusyButton variant="outlined" pending={pending} pendingIndicatorPosition="center">
        Submit
      </BusyButton>
      <BusyButton
        variant="outlined"
        pending={pending}
        pendingIndicator="Loading..."
        pendingIndicatorPosition="center"
      >
        Submit
      </BusyButton>
      <BusyButton
        variant="contained"
        color="primary"
        pending={pending}
        pendingIndicatorPosition="end"
        endIcon={<SendIcon />}
      >
        Send
      </BusyButton>
      <BusyButton variant="contained" color="secondary" pending={pending} startIcon={<SaveIcon />}>
        Save
      </BusyButton>
    </div>
  );
}
