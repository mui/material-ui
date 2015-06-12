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
    rightIcon: React.PropTypes.element,
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
      rightIcon,
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

      icons: {
        display: 'block',
        position: 'absolute',
        top: 0,
        padding: '12px 16px',
        opacity: 0.6
      },

      leftIcon: { 
        left: 0
      },

      rightIcon: {
        right: 0
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedLeftIconStyles = leftIcon ? 
      this.mergeStyles(styles.icons, styles.leftIcon, leftIcon.props.style) : null;
    var mergedRightIconStyles = rightIcon ? 
      this.mergeStyles(styles.icons, styles.rightIcon, rightIcon.props.style) : null;

    var leftIconElement = leftIcon ? React.cloneElement(leftIcon, {
      style: mergedLeftIconStyles
    }) : null;

    var rightIconElement = rightIcon ? React.cloneElement(rightIcon, {
      style: mergedRightIconStyles
    }) : null;

    return (
      <EnhancedButton
        {...other}
        linkButton={true}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedRootStyles}>
        <div style={styles.innerDiv}>
          {this.props.children}
          {leftIconElement}
          {rightIconElement}
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