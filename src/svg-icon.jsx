var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');

var SvgIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    viewBox: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      hovered: false
    };
  },

  getDefaultProps: function() {
    return {
      viewBox: '0 0 24 24'
    };
  },

  render: function() {

    var {
      color,
      hoverColor,
      viewBox,
      style,
      ...other
    } = this.props;

    var offColor = color ? color: this.context.muiTheme.palette.textColor;
    var onColor = hoverColor ? hoverColor : offColor;

    var mergedStyles = this.mergeAndPrefix({
      display: 'inline-block',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: Transitions.easeOut(),
      fill: this.state.hovered ? onColor : offColor
    }, style);

    return (
      <svg
        {...other}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedStyles}
        viewBox={viewBox}>
        {this.props.children}
      </svg>
    );
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  }
});

module.exports = SvgIcon;
