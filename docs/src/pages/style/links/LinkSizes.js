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
      <Link variant="h1" href={dudUrl} className={classes.link}>
        h1. Heading
      </Link>
      <Link variant="h2" href={dudUrl} className={classes.link}>
        h2. Heading
      </Link>
      <Link variant="h3" href={dudUrl} className={classes.link}>
        h3. Heading
      </Link>
      <Link variant="h4" href={dudUrl} className={classes.link}>
        h4. Heading
      </Link>
      <Link variant="h5" href={dudUrl} className={classes.link}>
        h5. Heading
      </Link>
      <Link variant="h6" href={dudUrl} className={classes.link}>
        h6. Heading
      </Link>
      <Link variant="subtitle1" href={dudUrl} className={classes.link}>
        subtitle1
      </Link>
      <Link variant="subtitle2" href={dudUrl} className={classes.link}>
        subtitle2
      </Link>
      <Link variant="body1" href={dudUrl} className={classes.link}>
        body1
      </Link>
      <Link variant="body2" href={dudUrl} className={classes.link}>
        body2
      </Link>
      <Link variant="caption" href={dudUrl} className={classes.link}>
        caption
      </Link>
      <Link variant="overline" href={dudUrl} className={classes.link}>
        overline text
      </Link>
    </div>
  );
}

LinkSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinkSizes);
