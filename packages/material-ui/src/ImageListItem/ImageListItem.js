import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import isMuiElement from '../utils/isMuiElement';
import ImageListContext from '../ImageList/ImageListContext';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    lineHeight: 0,
  },
  /* Styles applied to an `img` element to ensure it covers the item. */
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
};

const ImageListItem = React.forwardRef(function ImageListItem(props, ref) {
  // cols rows default values are for docs only
  const {
    children,
    classes,
    className,
    cols = 1,
    component: Component = 'li',
    rows = 1,
    style,
    ...other
  } = props;

  const { rowHeight = 'auto', spacing, variant } = React.useContext(ImageListContext);

  return (
    <Component
      className={clsx(classes.root, className)}
      ref={ref}
      style={{
        height: rowHeight === 'auto' ? 'auto' : rowHeight * rows + spacing * (rows - 1),
        gridColumnEnd: variant !== 'masonry' ? `span ${cols}` : undefined,
        gridRowEnd: variant !== 'masonry' ? `span ${rows}` : undefined,
        marginBottom: variant === 'masonry' ? spacing : undefined,
        ...style,
      }}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The ImageListItem component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        if (child.type === 'img' || isMuiElement(child, ['Image'])) {
          return React.cloneElement(child, {
            className: classes.img,
          });
        }

        return child;
      })}
    </Component>
  );
});

ImageListItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case ImageListItem takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
<<<<<<< HEAD
   * Height of the item in number of grid cells.
   * @default 1
=======
   * Height of the item in number of grid rows.
>>>>>>> Update demos
   */
  rows: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiImageListItem' })(ImageListItem);
