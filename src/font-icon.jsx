var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');

var FontIcon = React.createClass({

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
      position: 'relative',
      fontSize: Spacing.iconSize + 'px',
      display: 'inline-block',
      userSelect: 'none'  
    };
    if (!styles.color && !this.props.className) {
      styles.color = this.getTheme().textColor;
    }
    return styles;
  },

  render: function() {
    var {
      style,
      hoverStyle,
      onMouseOver,
      onMouseOut,
      ...other
    } = this.props;

    return (
      <span {...other} 
        style={this.m(
          this.getStyles(),
          this.props.style,
          this.state.isHovered && this.props.hoverStyle)} 
        onMouseOver={this._onMouseOver} 
        onMouseOut={this._onMouseOut}/>
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

module.exports = FontIcon;
