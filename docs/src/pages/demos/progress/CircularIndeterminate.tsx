import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  });

export type Props = WithStyles<typeof styles>;

function CircularIndeterminate(props: Props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(CircularIndeterminate);
