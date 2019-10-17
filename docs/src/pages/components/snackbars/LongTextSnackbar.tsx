import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
    },
    snackbar: {
      margin: theme.spacing(1),
    },
  }),
);

export default function LongTextSnackbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SnackbarContent
        className={classes.snackbar}
        message="I love snacks."
        role="alertdialog"
        action={action}
      />
      <SnackbarContent
        className={classes.snackbar}
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
      />
      <SnackbarContent
        className={classes.snackbar}
        message="I love candy. I love cookies. I love cupcakes."
        role="alertdialog"
        action={action}
      />
      <SnackbarContent
        className={classes.snackbar}
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
        role="alertdialog"
        action={action}
      />
    </div>
  );
}
