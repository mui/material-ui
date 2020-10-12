import * as React from 'react';
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
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton loading loadingIndicator="Loading..." variant="outlined">
        Fetch data
      </LoadingButton>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Save
      </LoadingButton>
    </div>
  );
}
