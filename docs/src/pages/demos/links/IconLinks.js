/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  link: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginRight: 4,
  },
});

// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

function IconLinks(props) {
  const { classes } = props;
  return (
    <div>
      <Link href={dudUrl} color="primary" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Link href={dudUrl} color="primary" className={classes.link}>
        <SettingsIcon className={classes.icon} />
        Settings
      </Link>
      <Link href={dudUrl} color="primary" className={classes.link}>
        <InfoIcon className={classes.icon} />
        About
      </Link>
    </div>
  );
}

IconLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLinks);
