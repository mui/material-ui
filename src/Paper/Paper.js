// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiPaper', (theme) => {
  const shadows = {};

  theme.shadows.forEach((shadow, index) => {
    shadows[`dp${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    paper: {
      backgroundColor: theme.palette.background.paper,
    },
    rounded: {
      borderRadius: 2,
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
    square,
    elevation,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  warning(elevation >= 0 && elevation < 25,
    `Material-UI: this elevation \`${elevation}\` is not implemented.`);

  const classNameElevation = `dp${elevation >= 0 ? elevation : 0}`;
  const className = classNames(classes.paper, classes[classNameElevation], {
    [classes.rounded]: !square,
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
   * It's accepting values between 0 and 24 inclusive.
   */
  elevation: PropTypes.number,
  /**
   * If `true`, rounded corners are disabled.
   */
  square: PropTypes.bool,
};

Paper.defaultProps = {
  elevation: 2,
  square: false,
};

Paper.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
