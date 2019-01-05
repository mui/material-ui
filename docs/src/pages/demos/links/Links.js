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
      <Link href={dudUrl} color="primary" className={classes.link}>
        Primary
      </Link>
      <Link href={dudUrl} color="secondary" className={classes.link}>
        Secondary
      </Link>
      <Link href={dudUrl} color="secondary" disabled className={classes.link}>
        Disabled
      </Link>
      <Link href={dudUrl} className={classes.link}>
        Link
      </Link>
    </div>
  );
}

Links.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Links);
