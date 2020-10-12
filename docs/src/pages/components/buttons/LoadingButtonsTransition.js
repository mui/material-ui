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

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

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
      <LoadingButton onClick={handleClick} loading={loading} variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        loading={loading}
        loadingIndicator="Loading..."
        variant="outlined"
      >
        Fetch data
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
      <LoadingButton
        color="secondary"
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </LoadingButton>
    </div>
  );
}
