// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiListSubheader', (theme) => ({
  root: {
    boxSizing: 'border-box',
    lineHeight: '48px',
    paddingLeft: 16,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
  },
  primary: {
    color: theme.palette.primary[500],
  },
  inset: {
    paddingLeft: theme.spacing.unit * 9,
  },
}));

function ListSubheader(props) {
  const {
    classes,
    className: classNameProp,
    primary,
    inset,
    children,
    ...other
  } = props;
  const className = classNames(classes.root, {
    [classes.primary]: primary,
    [classes.inset]: inset,
  }, classNameProp);

  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
}

ListSubheader.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the List Subheader will be indented.
   */
  inset: PropTypes.bool,
  /**
   * If `true`, the List Subheader will have the theme primary color.
   */
  primary: PropTypes.bool,
};

ListSubheader.defaultProps = {
  inset: false,
  primary: false,
};

export default withStyles(styleSheet)(ListSubheader);
