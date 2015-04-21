var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var SvgIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    hoverStyle: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      isHovered: false,
    };
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  getStyles: function() {
    var styles = {
      root: {
        display: 'inline-block',
        height: '24px',
        width: '24px',
        userSelect: 'none',
        fill: this.getTheme().textColor
      },
      rootWhenHovered: {

      }
    };
    return styles;
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
        onMouseOver={this._onMouseOver} 
        onMouseOut={this._onMouseOut}
        style={this.m(
          this.getStyles().root, 
          this.props.style,
          this.state.isHovered && this.props.hoverStyle)}>
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
