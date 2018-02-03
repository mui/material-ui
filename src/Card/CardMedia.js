import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
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

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

function CardMedia(props) {
  const { classes, className, component: Component, image, src, style, ...other } = props;

  warning(
    Boolean(image || src),
    'Material-UI: either `image` or `src` property must be specified.',
  );

  const isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
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
    <Component
      className={composedClassName}
      style={composedStyle}
      src={isMediaComponent ? image || src : undefined}
      {...other}
    />
  );
}

CardMedia.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Component for rendering image.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: PropTypes.string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: PropTypes.string,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

CardMedia.defaultProps = {
  component: 'div',
};

export default withStyles(styles, { name: 'MuiCardMedia' })(CardMedia);
