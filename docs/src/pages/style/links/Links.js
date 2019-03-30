/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  link: {
    margin: theme.spacing(1),
  },
});

// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

function Links(props) {
  const { classes } = props;

  return (
    <Typography>
      <Link href={dudUrl} className={classes.link}>
        Link
      </Link>
      <Link href={dudUrl} color="inherit" className={classes.link}>
        {'color="inherit"'}
      </Link>
      <Link href={dudUrl} variant="body2" className={classes.link}>
        {'variant="body2"'}
      </Link>
    </Typography>
  );
}

Links.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Links);
