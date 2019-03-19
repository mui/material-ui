import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    padding: 16,
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue',
      },
    },
  },
};

function NestedStylesHigherOrderComponent(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      This is red since it is inside the paper.
      <p>
        This is green since it is inside the paragraph{' '}
        <span>and this is blue since it is inside the span</span>
      </p>
    </Paper>
  );
}

NestedStylesHigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedStylesHigherOrderComponent);
