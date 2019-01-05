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

function Links(props) {
  const { classes } = props;
  return (
    <div>
      <Link href={dudUrl} className={classes.link}>
        Primary
      </Link>
      <Link href={dudUrl} color="secondary" className={classes.link}>
        Secondary
      </Link>
      <Link href={dudUrl} color="error" className={classes.link}>
        Error
      </Link>
      <Link href={dudUrl} color="textPrimary" className={classes.link}>
        Text Primary
      </Link>
      <Link href={dudUrl} color="textSecondary" className={classes.link}>
        Text Secondary
      </Link>
      <Link href={dudUrl} color="inherit" className={classes.link}>
        Inherit
      </Link>
    </div>
  );
}

Links.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Links);
