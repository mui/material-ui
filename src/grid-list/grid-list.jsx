import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props) {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: -props.padding / 2,
    },
    item: {
      boxSizing: 'border-box',
      padding: props.padding / 2,
    },
  };
}

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

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

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

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
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

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const mergedRootStyles = Object.assign(styles.root, style);

    const wrappedChildren = React.Children.map(children, (currentChild) => {
      if (React.isValidElement(currentChild) && currentChild.type.displayName === 'Subheader') {
        return currentChild;
      }
      const childCols = currentChild.props.cols || 1;
      const childRows = currentChild.props.rows || 1;
      const itemStyle = Object.assign({}, styles.item, {
        width: `${(100 / cols * childCols)}%`,
        height: cellHeight * childRows + padding,
      });

      return <div style={prepareStyles(itemStyle)}>{currentChild}</div>;
    });

    return (
      <div style={prepareStyles(mergedRootStyles)} {...other}>
        {wrappedChildren}
      </div>
    );
  },
});

export default GridList;
