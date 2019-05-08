import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
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

const GridList = React.forwardRef(function GridList(props, ref) {
  const {
    cellHeight = 180,
    children,
    classes,
    className: classNameProp,
    cols = 2,
    component: Component = 'ul',
    spacing = 4,
    style,
    ...other
  } = props;

  return (
    <Component
      className={clsx(classes.root, classNameProp)}
      ref={ref}
      style={{ margin: -spacing / 2, ...style }}
      {...other}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        warning(
          child.type !== React.Fragment,
          [
            "Material-UI: the GridList component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );

        const childCols = child.props.cols || 1;
        const childRows = child.props.rows || 1;

        return React.cloneElement(child, {
          style: Object.assign(
            {
              width: `${(100 / cols) * childCols}%`,
              height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + spacing,
              padding: spacing / 2,
            },
            child.props.style,
          ),
        });
      })}
    </Component>
  );
});

GridList.propTypes = {
  /**
   * Number of px for one cell height.
   * You can set `'auto'` if you want to let the children determine the height.
   */
  cellHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  /**
   * Grid Tiles that will be in Grid List.
   */
  children: PropTypes.node.isRequired,
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
   * Number of columns.
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Number of px for the spacing between tiles.
   */
  spacing: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiGridList' })(GridList);
