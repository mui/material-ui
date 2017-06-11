// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiTabIndicator', theme => ({
  root: {
    position: 'relative',
    height: 2,
    marginTop: -2,
    transition: theme.transitions.create(),
    willChange: 'left, width',
  },
  colorAccent: {
    backgroundColor: theme.palette.accent.A200,
  },
}));

/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
  const { classes, className: classNameProp, color, style: styleProp } = props;

  const className = classNames(
    classes.root,
    {
      [classes.colorAccent]: color === 'accent',
    },
    classNameProp,
  );

  const style = color !== 'accent'
    ? {
        ...styleProp,
        backgroundColor: color,
      }
    : styleProp;

  return <div className={className} style={style} />;
}

TabIndicator.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   * The color of the tab indicator.
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(['accent']), PropTypes.string]).isRequired,
  /**
   * @ignore
   * The style of the root element.
   */
  style: PropTypes.shape({
    left: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
};

export default withStyles(styleSheet)(TabIndicator);
