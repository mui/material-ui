// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiGridList', () => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflowY: 'auto',
    },
    item: {
      boxSizing: 'border-box',
    },
  };
});

/**
 * ```jsx
 * <GridList>
 *   <GridTile>
 *     <img src="image.jpg" />
 *     <GridTileTitlebar title="GridTile" />
 *   </GridTile>
 * </GridList>
 * ```
 */
export default function GridList(props, context) {
  const {
    cols,
    padding,
    cellHeight,
    children,
    className: classNameProp,
    component: ComponentProp,
    style,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);

  const wrappedChildren = React.Children.map(children, currentChild => {
    if (React.isValidElement(currentChild) && currentChild.type.muiName === 'ListSubheader') {
      return currentChild;
    }
    const childCols = currentChild.props.cols || 1;
    const childRows = currentChild.props.rows || 1;
    const itemStyle = {
      width: `${100 / cols * childCols}%`,
      height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + padding,
      padding: padding / 2,
    };

    return (
      <div className={classes.item} style={itemStyle}>
        {currentChild}
      </div>
    );
  });

  return (
    <ComponentProp
      className={classNames(classes.root, classNameProp)}
      style={{ margin: -padding / 2, ...style }}
      {...other}
    >
      {wrappedChildren}
    </ComponentProp>
  );
}

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
   * The CSS `className` of the root element.
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Number of px for the padding/spacing between items.
   */
  padding: PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

GridList.defaultProps = {
  cols: 2,
  padding: 4,
  cellHeight: 180,
  component: 'div',
};

GridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
