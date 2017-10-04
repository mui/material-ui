// @flow weak

import React from 'react';
import type { ElementType, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
};

export type CellHeight = number | 'auto';

type ProvidedProps = {
  classes: Object,
  cols: number,
  spacing: number,
  cellHeight: CellHeight,
  component: ElementType,
};

export type Props = {
  /**
   * Number of px for one cell height.
   * You can set `'auto'` if you want to let the children determine the height.
   */
  cellHeight?: CellHeight,
  /**
   * Grid Tiles that will be in Grid List.
   */
  children: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Number of columns.
   */
  cols?: number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default we map the type to a good default headline component.
   */
  component?: ElementType,
  /**
   * Number of px for the spacing between tiles.
   */
  spacing?: number,
  /**
   * @ignore
   */
  style?: Object,
};

function GridList(props: ProvidedProps & Props) {
  const {
    cols,
    spacing,
    cellHeight,
    children,
    classes,
    className: classNameProp,
    component: ComponentProp,
    style,
    ...other
  } = props;

  return (
    <ComponentProp
      className={classNames(classes.root, classNameProp)}
      style={{ margin: -spacing / 2, ...style }}
      {...other}
    >
      {React.Children.map(children, currentChild => {
        const childCols = currentChild.props.cols || 1;
        const childRows = currentChild.props.rows || 1;

        return React.cloneElement(currentChild, {
          style: Object.assign(
            {
              width: `${100 / cols * childCols}%`,
              height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + spacing,
              padding: spacing / 2,
            },
            currentChild.props.style,
          ),
        });
      })}
    </ComponentProp>
  );
}

GridList.defaultProps = {
  cols: 2,
  spacing: 4,
  cellHeight: 180,
  component: 'ul',
};

export default withStyles(styles, { name: 'MuiGridList' })(GridList);
