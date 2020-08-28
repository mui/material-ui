import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import debounce from '../utils/debounce';
import withStyles from '../styles/withStyles';
import isMuiElement from '../utils/isMuiElement';
import { ownerWindow } from '../utils';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cols = 1,
    component: Component = 'li',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rows = 1,
    ...other
  } = props;

  return (
    <Component
      className={clsx(classes.root, className)}
      // style={{ 'grid-row-end': `span ${cols}` }} 
      ref={ref} {...other}
    >
      {/* <div className={classes.item}> */}
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          if (child.type === 'img' || isMuiElement(child, ['Image'])) {
            return React.cloneElement(child, {
              className: classes.img,
            });
          }

          return child;
        })}
      {/* </div> */}
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
   * Width of the item in number of grid cells.
   * @default 1
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Height of the item in number of grid cells.
   * @default 1
   */
  rows: PropTypes.number,
};

export default withStyles(styles, { name: 'MuiImageListItem' })(ImageListItem);
