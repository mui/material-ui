/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  link: {
    margin: theme.spacing.unit,
  },
});

// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

function LinkSizes(props) {
  const { classes } = props;
  return (
    <div>
      <Link href={dudUrl} size="small" className={classes.link}>
        Small
      </Link>
      <Link href={dudUrl} size="medium" className={classes.link}>
        Medium
      </Link>
      <Link href={dudUrl} size="large" className={classes.link}>
        Large
      </Link>
    </div>
  );
}

LinkSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinkSizes);
