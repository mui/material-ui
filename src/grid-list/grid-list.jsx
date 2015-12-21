import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let GridList = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    cellHeight: React.PropTypes.number,
    children: React.PropTypes.node,
    cols: React.PropTypes.number,
    padding: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      cols: 2,
      padding: 4,
      cellHeight: 180,
    };
  },

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: -this.props.padding / 2,
      },
      item: {
        boxSizing: 'border-box',
        padding: this.props.padding / 2,
      },
    };
  },

  render() {
    const {
      cols,
      padding,
      cellHeight,
      children,
      style,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    const mergedRootStyles = this.mergeStyles(styles.root, style);

    const wrappedChildren = React.Children.map(children, (currentChild) => {
      const childCols = currentChild.props.cols || 1;
      const childRows = currentChild.props.rows || 1;
      const itemStyle = this.mergeStyles(styles.item, {
        width: (100 / cols * childCols) + '%',
        height: cellHeight * childRows + padding,
      });

      return <div style={this.prepareStyles(itemStyle)}>{currentChild}</div>;
    });

    return (
      <div style={this.prepareStyles(mergedRootStyles)} {...other}>{wrappedChildren}</div>
    );
  },
});

GridList = muiThemeable(GridList);

export default GridList;
