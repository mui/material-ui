var React = require('react/addons');
var StylePropable = require('../mixins/style-propable.js');
var Theme = require('../styles/theme.js').get();

var SvgIcon = React.createClass({

  mixins: [StylePropable],

  render: function() {

    var {
      viewBox,
      style,
      ...other
    } = this.props;

    //merge styles that are passed in
    var styles = this.mergeAndPrefix({
      display: 'inline-block',
      height: '24px',
      width: '24px',
      userSelect: 'none',
      fill: Theme.textColor
    });

    return (
      <svg
        {...other}
        viewBox="0 0 24 24"
        style={styles}>
        {this.props.children}
      </svg>
    );
  }

});

module.exports = SvgIcon;