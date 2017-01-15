// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('TabIndicator', (theme) => {
  return {
    root: {
      position: 'absolute',
      bottom: 0,
      height: 2,
      marginTop: -2,
      transition: theme.transitions.create(),
      willChange: 'left, width',
    },
    rootAccent: {
      backgroundColor: theme.palette.accent[500],
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

TabIndicator.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  indicatorColor: PropTypes.oneOfType([
    PropTypes.oneOf(['accent']),
    PropTypes.string,
  ]).isRequired,
  /**
   * The style of the root element.
   */
  style: PropTypes.shape({
    left: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
};

TabIndicator.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
