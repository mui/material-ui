// @flow weak

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import SvgIcon from 'material-ui/SvgIcon';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
  },
  iconBlue: {
    fill: blue[500],
  },
  iconHover: {
    fill: red[500],
    '&:hover': {
      fill: green[200],
    },
  },
});

const HomeIcon = props =>
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>;

function SvgIcons(props) {
  const classes = props.classes;
  return (
    <div>
      <HomeIcon className={classes.icon} />
      <HomeIcon
        className={classNames(classes.icon, classes.iconBlue)}
        style={{
          width: 30,
          height: 30,
        }}
      />
      <HomeIcon
        className={classNames(classes.icon, classes.iconHover)}
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
