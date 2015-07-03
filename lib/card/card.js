'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Paper = require('../paper');
var StylePropable = require('../mixins/style-propable');

var Card = React.createClass({
  displayName: 'Card',

  mixins: [StylePropable],

  propTypes: {
    style: React.PropTypes.object
  },

  render: function render() {
    var lastElement = React.Children.count(this.props.children) > 1 ? this.props.children[this.props.children.length - 1] : this.props.children;

    // If the last element is text or a title we should add
    // 8px padding to the bottom of the card
    var addBottomPadding = lastElement.type.displayName === 'CardText' || lastElement.type.displayName === 'CardTitle';
    var _props = this.props;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['style']);

    var mergedStyles = this.mergeAndPrefix({
      overflow: 'hidden',
      zIndex: 1
    }, style);

    return React.createElement(
      Paper,
      _extends({}, other, { style: mergedStyles }),
      React.createElement(
        'div',
        { style: { paddingBottom: addBottomPadding ? 8 : 0 } },
        this.props.children
      )
    );
  }
});

module.exports = Card;