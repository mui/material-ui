// @flow weak

import React from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { blue, red, green } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

const styleSheet = createStyleSheet('SvgIcons', (theme) => ({
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
}));

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

export default function SvgIcons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <HomeIcon className={classes.icon} />
      <HomeIcon className={classNames(classes.icon, classes.iconBlue)} />
      <HomeIcon className={classNames(classes.icon, classes.iconHover)} />
    </div>
  );
}

SvgIcons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
