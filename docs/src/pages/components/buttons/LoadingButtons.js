import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LoadingButton from '@material-ui/lab/LoadingButton';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));

export default function LoadingButtons() {
  const classes = useStyles();

  const [pending, setPending] = React.useState(true);
  function handleClick() {
    setPending(true);
  }

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={pending}
            onChange={(event, checked) => setPending(checked)}
          />
        }
        label="Pending"
      />
      <div className={classes.buttons}>
        <LoadingButton
          onClick={handleClick}
          pending={pending}
          variant="outlined"
        >
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
          pending={pending}
          pendingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Save
        </LoadingButton>
      </div>
    </div>
  );
}
