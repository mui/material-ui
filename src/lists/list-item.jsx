var React = require('react/addons');
var ColorManipulator = require('../utils/color-manipulator');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var Transitions = require('../styles/transitions');
var Typography = require('../styles/typography');
var EnhancedButton = require('../enhanced-button');

var ListItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    disableTouchTap: React.PropTypes.bool,
    insetChildren: React.PropTypes.bool,
    leftAvatar: React.PropTypes.element,
    leftIcon: React.PropTypes.element,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    rightIcon: React.PropTypes.element,
    secondaryText: React.PropTypes.node,
    secondaryTextLines: React.PropTypes.oneOf([1, 2]),
    showBottomDivider: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      secondaryTextLines: 1
    };
  },

  getInitialState: function() {
    return {
      hovered: false 
    };
  },

  render: function() {

    var {
      disableTouchTap,
      insetChildren,
      leftAvatar,
      leftIcon,
      onMouseOut,
      onMouseOver,
      rightIcon,
      secondaryText,
      secondaryTextLines,
      showBottomDivider,
      style,
      ...other
    } = this.props;

    var textColor = this.context.muiTheme.palette.textColor;
    var hoverColor = ColorManipulator.fade(textColor, 0.03);
    var singleAvatar = !secondaryText && leftAvatar;
    var singleNoAvatar = !secondaryText && !leftAvatar;
    var twoLine = secondaryText && secondaryTextLines === 1;
    var threeLine = secondaryText && secondaryTextLines > 1;

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
        paddingLeft: leftIcon || leftAvatar || insetChildren ? 72 : 16,
        paddingRight: rightIcon ? 56 : 16,
        paddingBottom: singleAvatar ? 20 : 16,
        paddingTop: singleNoAvatar || threeLine ? 16 : 20
      },

      icons: {
        height: 24,
        width: 24,
        display: 'block',
        position: 'absolute',
        top: twoLine ? 12 : singleAvatar ? 4 : 0,
        padding: 12
      },

      leftIcon: { 
        color: Colors.grey600,
        fill: Colors.grey600,
        left: 4
      },

      rightIcon: {
        color: Colors.grey400,
        fill: Colors.grey400,
        right: 4
      },

      leftAvatar: {
        position: 'absolute',
        top: singleAvatar ? 8 : 16,
        left: 16
      },

      secondaryText: {
        fontSize: 14,
        lineHeight: threeLine ? '18px' : '16px',
        height: threeLine ? 36 : 16,
        margin: 0,
        marginTop: 4,
        color: Typography.textLightBlack,

        //needed for 2 and 3 line ellipsis
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: threeLine ? null : 'nowrap',
        display: threeLine ? '-webkit-box' : null,
        WebkitLineClamp: threeLine ? 2 : null,
        WebkitBoxOrient: threeLine ? 'vertical' : null
      }
    };

    var secondaryTextIsAnElement = React.isValidElement(secondaryText);

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedDivStyles = this.mergeAndPrefix(styles.root, styles.innerDiv, style);
    var mergedLeftIconStyles = leftIcon ? 
      this.mergeStyles(styles.icons, styles.leftIcon, leftIcon.props.style) : null;
    var mergedRightIconStyles = rightIcon ? 
      this.mergeStyles(styles.icons, styles.rightIcon, rightIcon.props.style) : null;
    var mergedLeftAvatarStyles = leftAvatar ? 
      this.mergeStyles(styles.leftAvatar, leftAvatar.props.style) : null;
    var mergedSecondaryTextStyles = secondaryTextIsAnElement ? 
      this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

    var leftIconElement = leftIcon ? React.cloneElement(leftIcon, {
      style: mergedLeftIconStyles
    }) : null;
    var rightIconElement = rightIcon ? React.cloneElement(rightIcon, {
      style: mergedRightIconStyles
    }) : null;
    var leftAvatarElement = leftAvatar ? React.cloneElement(leftAvatar, {
      style: mergedLeftAvatarStyles
    }) : null;
    var secondaryTextElement = React.isValidElement(secondaryText) ? React.cloneElement(secondaryText, {
      style: mergedSecondaryTextStyles
    }) : secondaryText ? (
      <div style={styles.secondaryText}>{secondaryText}</div>
    ) : null;

    return disableTouchTap ? (
      <div style={mergedDivStyles}>
        {leftIconElement}
        {rightIconElement}
        {leftAvatarElement}
        {this.props.children}
        {secondaryTextElement}
      </div>
    ) : (
      <EnhancedButton
        {...other}
        linkButton={true}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedRootStyles}>
        <div style={styles.innerDiv}>
          {leftIconElement}
          {rightIconElement}
          {leftAvatarElement}
          {this.props.children}
          {secondaryTextElement}
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