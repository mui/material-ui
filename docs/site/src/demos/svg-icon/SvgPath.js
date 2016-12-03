// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { blue, red, green } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

const styleSheet = createStyleSheet('SvgPath', () => ({
  icon: {
    marginRight: 24,
  },
  iconBlue: {
    marginRight: 24,
    fill: blue[500],
  },
  iconHover: {
    marginRight: 24,
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

export default function SvgPath(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <HomeIcon className={classes.icon} />
      <HomeIcon className={classes.iconBlue} />
      <HomeIcon className={classes.iconHover} />
    </div>
  );
}

SvgPath.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
