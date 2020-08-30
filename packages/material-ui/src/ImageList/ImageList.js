import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ImageListContext from './ImageListContext';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'grid',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
};

const ImageList = React.forwardRef(function ImageList(props, ref) {
  const {
    rowHeight = 'auto',
    children,
    classes,
    className,
    cols = 2,
    component: Component = 'ul',
    spacing = 4,
    style,
    ...other
  } = props;

  const contextValue = React.useMemo(() => ({ rowHeight, spacing }), [rowHeight, spacing]);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Detect Internet Explorer 8+
      if (window !== undefined && window.document.documentMode) {
        console.error(
          [
            'Material-UI: ImageList v5+ no longer supports Internet Explorer.',
            'Use v4 of this component instead.',
          ].join('\n'),
        );
      }
    }
  }, []);

  return (
    <Component
      className={clsx(classes.root, className)}
      ref={ref}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: spacing, ...style }}
      {...other}
    >
      <ImageListContext.Provider value={contextValue}>{children}</ImageListContext.Provider>
    </Component>
  );
});

ImageList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Image list items that will be in the image list.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Number of columns.
   * @default 2
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
    /**
   * The height of one row in px.
   * Set `to 'auto'` to let the children determine the height.
   * @default 180
   */
  rowHeight: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * Number of px for the spacing between items.
   * @default 4
   */
  spacing: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiImageList' })(ImageList);
