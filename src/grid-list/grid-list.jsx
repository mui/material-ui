import React from 'react';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

const GridList = React.createClass({

  propTypes: {
    /**
     * Number of px for one cell height.
     */
    cellHeight: React.PropTypes.number,

    /**
     * Grid Tiles that will be in Grid List.
     */
    children: React.PropTypes.node,

    /**
     * Number of columns.
     */
    cols: React.PropTypes.number,

    /**
     * Number of px for the padding/spacing between items.
     */
    padding: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      cols: 2,
      padding: 4,
      cellHeight: 180,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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

export default GridList;
