import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
});

export type Props = WithStyles<typeof styles>;

function LinearIndeterminate(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(LinearIndeterminate);
