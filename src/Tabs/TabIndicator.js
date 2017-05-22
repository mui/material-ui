// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiTabIndicator', (theme) => ({
  root: {
    position: 'relative',
    height: 2,
    marginTop: -2,
    transition: theme.transitions.create(),
    willChange: 'left, width',
  },
  rootAccent: {
    backgroundColor: theme.palette.accent.A200,
  },
}));

/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
  const {
    classes,
    className: classNameProp,
    indicatorColor,
    style: styleProp,
  } = props;

  const className = classNames(classes.root, {
    [classes.rootAccent]: indicatorColor === 'accent',
  }, classNameProp);

  const style = indicatorColor !== 'accent' ? {
    ...styleProp,
    backgroundColor: indicatorColor,
  } : styleProp;

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
  indicatorColor: PropTypes.oneOfType([
    PropTypes.oneOf(['accent']),
    PropTypes.string,
  ]).isRequired,
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
