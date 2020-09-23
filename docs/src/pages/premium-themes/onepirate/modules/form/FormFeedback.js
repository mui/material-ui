import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
});

function FormFeedback(props) {
  return (
    <div
      className={clsx(
        props.classes.root,
        {
          [props.classes.error]: !!props.error,
          [props.classes.success]: !!props.success,
        },
        props.className,
      )}
    >
      <Typography color="inherit">{props.children}</Typography>
    </div>
  );
}

export default withStyles(styles)(FormFeedback);
