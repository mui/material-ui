// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('Paper', (theme) => {
  const { palette } = theme;
  const shadows = {};

  theme.shadows.forEach((shadow, index) => {
    shadows[`dp${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    paper: {
      backgroundColor: palette.background.paper,
    },
    rounded: {
      borderRadius: '2px',
    },
    ...shadows,
  };
});

/**
 * A piece of material paper.
 *
 * ```js
 * import Paper from 'material-ui/Paper';
 *
 * const Component = () => <Paper elevation={8}>Hello World</Paper>;
 * ```
 */
export default function Paper(props, context) {
  const {
    className: classNameProp,
    rounded,
    elevation,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const classNameElevation = `dp${elevation >= 0 ? elevation : 0}`;
  const className = classNames(classes.paper, classes[classNameElevation], {
    [classes.rounded]: rounded,
  }, classNameProp);

  return (
    <div className={className} {...other} />
  );
}

Paper.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   */
  elevation: PropTypes.number,
  /**
   * Set to false to disable rounded corners.
   */
  rounded: PropTypes.bool,
};

Paper.defaultProps = {
  rounded: true,
  elevation: 2,
};

Paper.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
