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
    leftIcon: React.PropTypes.element,
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
      leftIcon,
      onMouseOut,
      onMouseOver,
      style,
      ...other
    } = this.props;

    var textColor = this.context.muiTheme.palette.textColor;
    var hoverColor = ColorManipulator.fade(textColor, 0.03);

    var styles = {
      root: {
        backgroundColor: this.state.hovered ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        overflow: 'hidden',
        position: 'relative',
        transition: Transitions.easeOut()
      },

      //This inner div is need so that ripples will span the entire container
      innerDiv: {
        padding: 16,
        paddingLeft: leftIcon ? 72 : 16
      },

      leftIcon: {
        display: 'block',
        width: 24,
        height: 24,
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '12px 16px',
        opacity: 0.6
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedLeftIconStyles = leftIcon ? this.mergeStyles(styles.leftIcon, leftIcon.props.style) : null;

    var leftIconElement = leftIcon ? React.cloneElement(leftIcon, {
      style: mergedLeftIconStyles
    }) : null;

    return (
      <EnhancedButton
        {...other}
        linkButton={true}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedRootStyles}>
        <div style={styles.innerDiv}>
          {leftIconElement}
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