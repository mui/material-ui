var React = require('react/addons');
var ColorManipulator = require('../utils/color-manipulator');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var EnhancedButton = require('../enhanced-button');

var ListItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    secondaryText: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    return {
      hovered: false 
    };
  },

  render: function() {

    var {
      onMouseOut,
      onMouseOver,
      style,
      ...other
    } = this.props;

    var textColor = this.context.muiTheme.palette.textColor;
    var hoverColor = ColorManipulator.fade(textColor, 0.05);

    var mergedStyles = this.mergeAndPrefix({
      backgroundColor: this.state.hovered ? hoverColor : null,
      color: textColor,
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      overflow: 'hidden',
      position: 'relative',
      transition: Transitions.easeOut()
    }, style);

    //This inner div is need so that ripples will span the entire container
    var innerDivStyle = {
      padding: 16
    };

    return (
      <EnhancedButton
        {...other}
        linkButton={true}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedStyles}>
        <div style={innerDivStyle}>
          {this.props.children}
        </div>
      </EnhancedButton>
    );
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  }

});

module.exports = ListItem;