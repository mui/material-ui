let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');

let GridList = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    cols: React.PropTypes.number,
    padding: React.PropTypes.number,
    tileHeight: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      cols: 2,
      padding: 4,
      tileHeight: '180px',
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
        width: (100 / this.props.cols) + '%',
        boxSizing: 'border-box',
        padding: `${this.props.padding/2}px`,
        height: this.props.tileHeight + this.props.padding,
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

    let wrappedChildren = React.Children.map(children, (currentChild) =>
      <div style={styles.item}>{currentChild}</div>
    );

    return (
      <div style={mergedRootStyles} {...other}>{wrappedChildren}</div>
    );
  },
});

module.exports = GridList;
