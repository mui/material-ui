import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Button from '@material-ui/core/Button';

const styles = (theme: any) => ({
  button: {
    display: 'block',
    margin: theme.spacing(2),
  },
});

export interface iProps extends WithStyles<typeof styles> {}

function SimpleNoSsr(props: iProps) {
  const { classes } = props;

  return (
    <div>
      <Button className={classes.button} variant="contained" color="primary">
        Server & Client
      </Button>
      <NoSsr>
        <Button className={classes.button} variant="contained" color="secondary">
          Client only
        </Button>
      </NoSsr>
    </div>
  );
}

export default withStyles(styles)(SimpleNoSsr);
