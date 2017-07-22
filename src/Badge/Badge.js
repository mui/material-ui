// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

const RADIUS = 12;

export const styleSheet = createStyleSheet('MuiBadge', theme => ({
  root: {
    position: 'relative',
    display: 'inline-block',
  },
  badge: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -RADIUS,
    right: -RADIUS,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight,
    fontSize: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: '50%',
    backgroundColor: theme.palette.color,
    color: theme.palette.textColor,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  colorAccent: {
    backgroundColor: theme.palette.accent.A200,
    color: theme.palette.getContrastText(theme.palette.accent.A200),
  },
}));

function Badge(props) {
  const { badgeContent, classes, className: classNameProp, color, children, ...other } = props;
  const className = classNames(classes.root, classNameProp);
  const badgeClassName = classNames(classes.badge, {
    [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
  });

  return (
    <div className={className} {...other}>
      {children}
      <span className={badgeClassName}>
        {badgeContent}
      </span>
    </div>
  );
}

Badge.propTypes = {
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node.isRequired,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['default', 'primary', 'accent']),
};

Badge.defaultProps = {
  color: 'default',
};

export default withStyles(styleSheet)(Badge);
