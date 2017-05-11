// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiTabIndicator', (theme) => {
  return {
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
  };
});

export default function TabIndicator(props, context) {
  const {
    className: classNameProp,
    indicatorColor,
    style: styleProp,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.rootAccent]: indicatorColor === 'accent',
  }, classNameProp);

  const style = indicatorColor !== 'accent' ? {
    ...styleProp,
    backgroundColor: indicatorColor,
  } : styleProp;

  return <div className={className} style={style} />;
}

/**
 * @ignore - internal component.
 */
TabIndicator.propTypes = {
  /**
   * @ignore
   * The CSS class name of the root element.
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

TabIndicator.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
