var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/variables/spacing');

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

  /** Styles */
  _main: function() {
    var style = this.mergeAndPrefix({
      position: 'relative',
      fontSize: Spacing.iconSize + 'px',
      display: 'inline-block',
      userSelect: 'none'
    });

    if (this.state.isHovered && this.props.hoverStyle) {
      style = this.mergeAndPrefix(style, this.props.hoverStyle);
    }
    if (!style.color && !this.props.className) {
      style.color = this.context.theme.textColor;
    }
    
    return this.mergeAndPrefix(style);
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
        style={this._main()} 
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
