'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Styles = require('../styles');
var Avatar = require('../avatar');
var StylePropable = require('../mixins/style-propable');

var CardHeader = React.createClass({
  displayName: 'CardHeader',

  mixins: [StylePropable],

  propTypes: {
    title: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    subtitle: React.PropTypes.string,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      titleColor: Styles.Colors.darkBlack,
      subtitleColor: Styles.Colors.lightBlack
    };
  },

  getStyles: function getStyles() {
    return {
      root: {
        height: 72,
        padding: 16,
        fontWeight: Styles.Typography.fontWeightMedium,
        boxSizing: 'border-box',
        position: 'relative'
      },
      text: {
        display: 'inline-block',
        verticalAlign: 'top'
      },
      avatar: {
        marginRight: 16
      },
      title: {
        color: this.props.titleColor,
        display: 'block',
        fontSize: 15
      },
      subtitle: {
        color: this.props.subtitleColor,
        display: 'block',
        fontSize: 14
      }
    };
  },

  render: function render() {
    var styles = this.getStyles();
    var rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    var textStyle = this.mergeAndPrefix(styles.text, this.props.textStyle);
    var titleStyle = this.mergeAndPrefix(styles.title, this.props.titleStyle);
    var subtitleStyle = this.mergeAndPrefix(styles.subtitle, this.props.subtitleStyle);

    var avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      var avatarMergedStyle = this.mergeStyles(styles.avatar, avatar.props.style);
      avatar = React.cloneElement(avatar, { style: avatarMergedStyle });
    } else avatar = React.createElement(Avatar, { src: this.props.avatar, style: styles.avatar });

    return React.createElement(
      'div',
      _extends({}, this.props, { style: rootStyle }),
      avatar,
      React.createElement(
        'div',
        { style: textStyle },
        React.createElement(
          'span',
          { style: titleStyle },
          this.props.title
        ),
        React.createElement(
          'span',
          { style: subtitleStyle },
          this.props.subtitle
        )
      ),
      this.props.children
    );
  }
});

module.exports = CardHeader;