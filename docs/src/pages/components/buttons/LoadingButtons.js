import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/core/LoadingButton';
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

export default function LoadingButtons() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
        }
        className={classes.switch}
        label="Loading"
      />
      <LoadingButton variant="outlined" loading={loading} loadingIndicatorPosition="center">
        Fetch data
      </LoadingButton>
      <LoadingButton
        variant="outlined"
        loading={loading}
        loadingIndicator="Loading..."
        loadingIndicatorPosition="center"
      >
        Submit
      </LoadingButton>
      <LoadingButton
        variant="contained"
        color="primary"
        loading={loading}
        loadingIndicatorPosition="end"
        endIcon={<SendIcon />}
      >
        Send
      </LoadingButton>
      <LoadingButton
        variant="contained"
        color="secondary"
        loading={loading}
        startIcon={<SaveIcon />}
      >
        Save
      </LoadingButton>
    </div>
  );
}
