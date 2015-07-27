'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Styles = require('../styles');
var StylePropable = require('../mixins/style-propable');

var CardMedia = React.createClass({
  displayName: 'CardMedia',

  mixins: [StylePropable],

  propTypes: {
    overlay: React.PropTypes.node,
    style: React.PropTypes.object,
    overlayStyle: React.PropTypes.object,
    overlayContainerStyle: React.PropTypes.object,
    overlayContentStyle: React.PropTypes.object,
    mediaStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool
  },

  getStyles: function getStyles() {
    return {
      root: {
        position: 'relative'
      },
      overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      },
      overlay: {
        height: '100%',
        position: 'relative'
      },
      overlayContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        background: Styles.Colors.lightBlack
      },
      media: {}
    };
  },

  render: function render() {
    var styles = this.getStyles();
    var rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    var mediaStyle = this.mergeAndPrefix(styles.media, this.props.mediaStyle);
    var overlayContainerStyle = this.mergeAndPrefix(styles.overlayContainer, this.props.overlayContainerStyle);
    var overlayContentStyle = this.mergeAndPrefix(styles.overlayContent, this.props.overlayContentStyle);
    var overlayStyle = this.mergeAndPrefix(styles.overlay, this.props.overlayStyle);

    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        style: {
          verticalAlign: 'top',
          maxWidth: '100%',
          minWidth: '100%'
        }
      });
    });

    var overlayChildren = React.Children.map(this.props.overlay, function (child) {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite
        });
      } else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite
        });
      } else {
        return child;
      }
    });

    return React.createElement(
      'div',
      _extends({}, this.props, { style: rootStyle }),
      React.createElement(
        'div',
        { style: mediaStyle },
        children
      ),
      this.props.overlay ? React.createElement(
        'div',
        { style: overlayContainerStyle },
        React.createElement(
          'div',
          { style: overlayStyle },
          React.createElement(
            'div',
            { style: overlayContentStyle },
            overlayChildren
          )
        )
      ) : ''
    );
  }
});

module.exports = CardMedia;