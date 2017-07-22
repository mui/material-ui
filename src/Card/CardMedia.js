// @flow

import React from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiCardMedia', {
  root: {
    position: 'relative',
  },
});

type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
};

function CardMedia(props: Props) {
  const { classes, className, ...other } = props;

  return <div className={classNames(classes.root, className)} {...other} />;
}

export default withStyles(styleSheet)(CardMedia);
