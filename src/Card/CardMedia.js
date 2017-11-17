// @flow

import React from 'react';
import classNames from 'classnames';
import warning from 'warning';
import type { ElementType } from 'react';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  rootMedia: {
    width: '100%',
  },
};

const mediaComponents = ['video', 'audio', 'picture', 'iframe', 'img'];

type ProvidedProps = {
  classes: Object,
  component: ElementType,
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
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image?: string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src?: string,
  /**
   * @ignore
   */
  style?: Object,
  /**
   * Component for rendering image.
   */
  component?: ElementType,
};

function CardMedia(props: ProvidedProps & Props) {
  const { classes, className, image, style, src, component: ComponentProp, ...other } = props;

  warning(
    Boolean(image || src),
    'Material-UI: either `image` or `src` property must be specified.',
  );

  const isMediaComponent = mediaComponents.indexOf(ComponentProp) !== -1;
  const composedStyle =
    !isMediaComponent && image ? { backgroundImage: `url(${image})`, ...style } : style;
  const composedClassName = classNames(
    {
      [classes.root]: !isMediaComponent,
      [classes.rootMedia]: isMediaComponent,
    },
    className,
  );

  return (
    <ComponentProp
      className={composedClassName}
      style={composedStyle}
      src={isMediaComponent ? image || src : undefined}
      {...other}
    />
  );
}

CardMedia.defaultProps = {
  component: 'div',
};

export default withStyles(styles, { name: 'MuiCardMedia' })(CardMedia);
