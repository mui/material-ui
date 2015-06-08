var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');

var SvgIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    viewBox: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      viewBox: '0 0 24 24'
    };
  },

  render: function() {

    var {
      viewBox,
      style,
      ...other
    } = this.props;

    var mergedStyles = this.mergeAndPrefix({
      display: 'inline-block',
      height: '24px',
      width: '24px',
      userSelect: 'none',
      fill: this.context.muiTheme.palette.textColor
    }, style);

    return (
      <svg
        {...other}
        viewBox={viewBox}
        style={mergedStyles}>
        {this.props.children}
      </svg>
    );
  }
});

module.exports = SvgIcon;
