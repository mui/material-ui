// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

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
 * const Component = () => <Paper zDepth={8}>Hello World</Paper>;
 * ```
 */
export default function Paper(props, context) {
  const {
    className: classNameProp,
    rounded,
    zDepth,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const classNameZDepth = `dp${zDepth >= 0 ? zDepth : 0}`;
  const className = classNames(classes.paper, classes[classNameZDepth], {
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
   * Set to false to disable rounded corners.
   */
  rounded: PropTypes.bool,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   */
  zDepth: PropTypes.number,
};

Paper.defaultProps = {
  rounded: true,
  zDepth: 2,
};

Paper.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
