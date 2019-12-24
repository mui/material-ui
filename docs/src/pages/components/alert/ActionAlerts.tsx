import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function ActionAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert
        action={
          <IconButton aria-label="close" color="inherit" size="small">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        This is a success alert—check it out!
      </Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This is a success alert—check it out!
      </Alert>
    </div>
  );
}
