// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiGridList', () => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
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
class GridList extends Component {
  static propTypes = {
    /**
     * Number of px for one cell height.
     * You can set `'auto'` if you want to let the children determine the height.
     */
    cellHeight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['auto']),
    ]),
    /**
     * Grid Tiles that will be in Grid List.
     */
    children: PropTypes.node,
    /**
     * The CSS `className` of the root element.
     */
    className: PropTypes.string,
    /**
     * Number of columns.
     */
    cols: PropTypes.number,
    /**
     * Number of px for the padding/spacing between items.
     */
    padding: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    cols: 2,
    padding: 4,
    cellHeight: 180,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      cols,
      padding,
      cellHeight,
      children,
      className: classNameProp,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const wrappedChildren = React.Children.map(children, (currentChild) => {
      if (React.isValidElement(currentChild) && currentChild.type.muiName === 'ListSubheader') {
        return currentChild;
      }
      const childCols = currentChild.props.cols || 1;
      const childRows = currentChild.props.rows || 1;
      const itemStyle = {
        width: `${((100 / cols) * childCols)}%`,
        height: cellHeight === 'auto' ? 'auto' : (cellHeight * childRows) + padding,
        padding: padding / 2,
      };

      return <div className={classes.item} style={itemStyle}>{currentChild}</div>;
    });

    const className = classNames(
      classes.root,
      classNameProp,
    );

    return (
      <div className={className} style={{ margin: -padding / 2 }} {...other}>
        {wrappedChildren}
      </div>
    );
  }
}

export default GridList;
