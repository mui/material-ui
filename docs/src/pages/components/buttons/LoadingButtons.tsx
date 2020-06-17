import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));

export default function LoadingButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoadingButton variant="outlined" pending>
        Submit
      </LoadingButton>
      <LoadingButton variant="outlined" pending pendingIndicator="Loading...">
        Fetch data
      </LoadingButton>
      <LoadingButton
        variant="outlined"
        pending
        pendingPosition="start"
        startIcon={<SaveIcon />}
      >
        Save
      </LoadingButton>
    </div>
  );
}
