import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  media: {
    width: '100%',
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

const CardMedia = React.forwardRef(function CardMedia(props, ref) {
  const { classes, className, component: Component = 'div', image, src, style, ...other } = props;

  warning(
    Boolean(image || src),
    'Material-UI: either `image` or `src` property must be specified.',
  );

  const isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  const composedStyle =
    !isMediaComponent && image ? { backgroundImage: `url("${image}")`, ...style } : style;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.media]: isMediaComponent,
        },
        className,
      )}
      ref={ref}
      style={composedStyle}
      src={isMediaComponent ? image || src : undefined}
      {...other}
    />
  );
});

CardMedia.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes.elementType,
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

export default withStyles(styles, { name: 'MuiCardMedia' })(CardMedia);
