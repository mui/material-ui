// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

const radius = 12;

export const styleSheet = createStyleSheet('MuiBadge', (theme) => {
  return {
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
      top: -radius,
      right: -radius,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeight,
      fontSize: radius,
      width: radius * 2,
      height: radius * 2,
      borderRadius: '50%',
      backgroundColor: theme.palette.color,
      color: theme.palette.textColor,
    },
    primary: {
      backgroundColor: theme.palette.primary[500],
      color: theme.palette.getContrastText(theme.palette.primary[500]),
    },
    accent: {
      backgroundColor: theme.palette.accent.A200,
      color: theme.palette.getContrastText(theme.palette.accent.A200),
    },
  };
});

/**
 *
 * ```jsx
 * <Badge badgeContent={4}>
 *   <Icon>folder</Icon>
 * </Badge>
 * ```
 */
export default function Badge(props, context) {
  const {
    badgeClassName: badgeClassNameProp,
    badgeContent,
    className: classNameProp,
    children,
    primary,
    accent,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames({
    [classes.root]: true,
  }, classNameProp);
  const badgeClassName = classNames({
    [classes.badge]: true,
    [classes.primary]: primary,
    [classes.accent]: accent,
  }, badgeClassNameProp);

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
   * If `true`, the badge will use the accent badge colors.
   */
  accent: PropTypes.bool,
  /**
   * The CSS class name of the badge element.
   */
  badgeClassName: PropTypes.string,
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node.isRequired,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the badge will use the primary badge colors.
   */
  primary: PropTypes.bool,
};

Badge.defaultProps = {
  primary: false,
  accent: false,
};

Badge.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
