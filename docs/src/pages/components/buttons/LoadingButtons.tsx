import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& button': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function LoadingButtons() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={classes.root}>
      <Button variant="outlined" loading>
        Loading…
      </Button>
      <Button
        variant="contained"
        color="primary"
        loading
        startIcon={<CircularProgress color="inherit" size={16} />}
      >
        Duplicate
      </Button>
      <Button
        variant="contained"
        color="secondary"
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
        startIcon={loading ? <CircularProgress color="inherit" size={16} /> : null}
      >
        Save
      </Button>
    </div>
  );
}
