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
  /* Styles applied to the root element if `variant="masonry"`. */
  masonry: {
    display: 'block',
  },
  /* Styles applied to the root element if `variant="quilted"`. */
  quilted: {},
  /* Styles applied to the root element if `variant="standard"`. */
  standard: {},
  /* Styles applied to the root element if `variant="woven"`. */
  woven: {},
};

const ImageList = React.forwardRef(function ImageList(props, ref) {
  const {
    children,
    classes,
    className,
    cols = 2,
    component: Component = 'ul',
    rowHeight = 'auto',
    gap = 4,
    style: styleProp,
    variant = 'standard',
    ...other
  } = props;

  const contextValue = React.useMemo(() => ({ rowHeight, gap, variant }), [
    rowHeight,
    gap,
    variant,
  ]);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Detect Internet Explorer 8+
      if (document !== undefined && 'objectFit' in document.documentElement.style === false) {
        console.error(
          [
            'Material-UI: ImageList v5+ no longer natively supports Internet Explorer.',
            'Use v4 of this component instead, or polyfill CSS object-fit.',
          ].join('\n'),
        );
      }
    }
  }, []);

  const style =
    variant === 'masonry'
      ? { columnCount: cols, columnGap: gap, ...styleProp }
      : { gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...styleProp };

  return (
    <Component
      className={clsx(classes.root, classes[variant], className)}
      ref={ref}
      style={style}
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
   * Items that will be in the image list.
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
   * The gap between items in px.
   * @default 4
   */
  gap: PropTypes.number,
  /**
   * The height of one row in px.
   * @default 'auto'
   */
  rowHeight: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['masonry', 'quilted', 'standard', 'woven']),
    PropTypes.string,
  ]),
};

export default withStyles(styles, { name: 'MuiImageList' })(ImageList);
