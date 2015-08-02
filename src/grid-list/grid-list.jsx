let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');

let GridList = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    cols: React.PropTypes.number,
    padding: React.PropTypes.number,
    cellHeight: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      cols: 2,
      padding: 4,
      cellHeight: '180px',
    };
  },

  getStyles()
  {
    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: `-${this.props.padding/2}px`,
      },
      item: {
        boxSizing: 'border-box',
        padding: `${this.props.padding/2}px`,
      },
    };
  },


  render() {
    let {
      cols,
      padding,
      children,
      style,
      ...other,
      } = this.props;

    let styles = this.getStyles();

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    let wrappedChildren = React.Children.map(children, (currentChild) => {
      let childCols = currentChild.props.cols || 1;
      let childRows = currentChild.props.rows || 1;
      let itemStyle = this.mergeAndPrefix(styles.item, {
        width: (100 / this.props.cols * childCols) + '%',
        height: this.props.cellHeight * childRows + this.props.padding,
      });

      return <div style={itemStyle}>{currentChild}</div>;
    });

    return (
      <div style={mergedRootStyles} {...other}>{wrappedChildren}</div>
    );
  },
});

module.exports = GridList;
