import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BusyButton from '@material-ui/core/BusyButton';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BusyButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BusyButton variant="outlined" pending>
        Submit
      </BusyButton>
      <BusyButton variant="outlined" pending pendingIndicator="Loading...">
        Fetch data
      </BusyButton>
      <BusyButton variant="outlined" pending pendingPosition="start" startIcon={<SaveIcon />}>
        Save
      </BusyButton>
    </div>
  );
}
