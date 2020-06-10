import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BusyButton from '@material-ui/core/BusyButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BusyButtons() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={classes.root}>
      <BusyButton variant="outlined" loading={loading} loadingIndicatorPosition="center">
        Fetch data
      </BusyButton>
      <BusyButton
        variant="contained"
        color="primary"
        loading={loading}
        loadingIndicatorPosition="end"
        onClick={() => {
          setLoading(true);
        }}
        endIcon={<SendIcon />}
      >
        Send
      </BusyButton>
      <BusyButton
        variant="contained"
        color="secondary"
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
        startIcon={<SaveIcon />}
      >
        Save
      </BusyButton>
    </div>
  );
}
