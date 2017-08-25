// @flow

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
};

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Image to be displayed as a background image.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: string,
  /**
   * @ignore
   */
  style?: Object,
};

type AllProps = DefaultProps & Props;

function CardMedia(props: AllProps) {
  const { classes, className, image, style, ...other } = props;
  const composedStyle = { backgroundImage: `url(${image})`, ...style };

  return <div className={classNames(classes.root, className)} style={composedStyle} {...other} />;
}

export default withStyles(styles, { name: 'MuiCardMedia' })(CardMedia);
