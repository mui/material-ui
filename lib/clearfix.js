'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var BeforeAfterWrapper = require('./before-after-wrapper');

var ClearFix = React.createClass({
  displayName: 'ClearFix',

  render: function render() {
    var _props = this.props;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['style']);

    var before = function before() {
      return {
        content: '\' \'',
        display: 'table'
      };
    };

    var after = before();
    after.clear = 'both';

    return React.createElement(
      BeforeAfterWrapper,
      _extends({}, other, {
        beforeStyle: before(),
        afterStyle: after,
        style: this.props.style }),
      this.props.children
    );
  }
});

module.exports = ClearFix;