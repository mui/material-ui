// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import SvgIcon from 'material-ui/SvgIcon';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '70%',
  },
  iconHover: {
    '&:hover': {
      fill: green[200],
    },
  },
};

const HomeIcon = props => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

function SvgIcons(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <HomeIcon />
      <HomeIcon color="accent" />
      <HomeIcon color="action" />
      <HomeIcon color="contrast" />
      <HomeIcon color="disabled" />
      <HomeIcon
        className={classes.icon}
        color="primary"
        style={{
          width: 30,
          height: 30,
        }}
      />
      <HomeIcon
        color="error"
        className={classes.iconHover}
        style={{
          width: 36,
          height: 36,
        }}
      />
    </div>
  );
}

SvgIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgIcons);
