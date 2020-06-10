import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BusyButton from '@material-ui/core/BusyButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
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
      <BusyButton variant="outlined" loading>
        Loading…
      </BusyButton>
      <BusyButton
        variant="contained"
        color="primary"
        loading
        startIcon={<FileCopyIcon />}
      >
        Duplicate
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