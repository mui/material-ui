// @flow weak

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiGridList', {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
  },
});

function GridList(props) {
  const {
    cols,
    gutter,
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
      style={{ margin: -gutter / 2, ...style }}
      {...other}
    >
      {Children.map(children, currentChild => {
        const childCols = currentChild.props.cols || 1;
        const childRows = currentChild.props.rows || 1;

        return React.cloneElement(currentChild, {
          style: Object.assign(
            {
              width: `${100 / cols * childCols}%`,
              height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + gutter,
              padding: gutter / 2,
            },
            currentChild.props.style,
          ),
        });
      })}
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object,
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
   * By default we map the type to a good default headline component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Number of px for the gutter/spacing between tiles.
   */
  gutter: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

GridList.defaultProps = {
  cols: 2,
  gutter: 4,
  cellHeight: 180,
  component: 'ul',
};

export default withStyles(styleSheet)(GridList);
