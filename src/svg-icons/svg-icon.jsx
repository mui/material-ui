var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');
var Theme = require('../styles/theme').get();

var SvgIcon = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    hoverStyle: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      isHovered: false,
    };
  },

  /** Styles */
  _main: function() {
    var style = this.mergeAndPrefix({
      display: 'inline-block',
      height: '24px',
      width: '24px',
      userSelect: 'none',
      fill: Theme.textColor
    });

    if (this.state.isHovered && this.props.hoverStyle) {
      style = this.mergeAndPrefix(style, this.props.hoverStyle);
    }

    return style;
  },

  render: function() {

    var {
      viewBox,
      style,
      hoverStyle,
      onMouseOver,
      onMouseOut,
      ...other
    } = this.props;

    return (
      <svg
        {...other}
        viewBox="0 0 24 24"
        style={this._main()}
        onMouseOver={this._onMouseOver} 
        onMouseOut={this._onMouseOut}>
          {this.props.children}
      </svg>
    );
  },

  _onMouseOut: function(e) {
    this.setState({isHovered: false});    
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _onMouseOver: function(e) {
    this.setState({isHovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

});

module.exports = SvgIcon;
