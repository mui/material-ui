import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Paper', (theme) => {
  const { palette } = theme;
  const shadows = {};

  theme.shadows.forEach((shadow, index) => {
    shadows[`dp${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    root: {
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
  const { className, rounded, zDepth, ...other } = props;
  const classes = context.styleManager.render(styleSheet, { group: 'mui' });

  const classNames = ClassNames(classes.root, {
    [classes.rounded]: rounded,
    [classes[`dp${zDepth >= 0 ? zDepth : 0}`]]: true,
  }, className);

  return (
    <div className={classNames} {...other} />
  );
}

Paper.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Set to false to disable rounded corners
   */
  rounded: PropTypes.bool,
  /**
   * Shadow depth, corresponds to `dp` in the spec
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
