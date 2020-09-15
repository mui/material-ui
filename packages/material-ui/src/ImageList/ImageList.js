import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
};

const ImageList = React.forwardRef(function ImageList(props, ref) {
  const {
    rowHeight = 180,
    children,
    classes,
    className,
    cols = 2,
    component: Component = 'ul',
    gap = 4,
    style,
    ...other
  } = props;

  return (
    <Component
      className={clsx(classes.root, className)}
      ref={ref}
      style={{ margin: -gap / 2, ...style }}
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
                "Material-UI: The ImageList component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        const childCols = child.props.cols || 1;
        const childRows = child.props.rows || 1;

        return React.cloneElement(child, {
          style: {
            width: `${(100 / cols) * childCols}%`,
            height: rowHeight === 'auto' ? 'auto' : rowHeight * childRows + gap,
            padding: gap / 2,
            ...child.props.style,
          },
        });
      })}
    </Component>
  );
});

ImageList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  rowHeight: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * @ignore
   */
  gap: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiImageList' })(ImageList);
