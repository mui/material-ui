let React = require('react');
let Styles = require('../styles');
let StylePropable = require('../mixins/style-propable');


let CardText = React.createClass({

  mixins:[StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    style: React.PropTypes.object,
    expandable: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      color: Styles.Colors.ck,
    };
  },

  getStyles() {
    return {
      root: {
        padding: 16,
        fontSize: '14px',
        color: this.props.color,
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.mergeAndPrefix(styles.root, this.props.style);

    return (
      <div {...this.props} style={rootStyle}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = CardText;
