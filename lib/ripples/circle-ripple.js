'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var Colors = require('../styles/colors');

var CircleRipple = React.createClass({
  displayName: 'CircleRipple',

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: Colors.darkBlack
    };
  },

  render: function render() {
    var _props = this.props;
    var color = _props.color;
    var started = _props.started;
    var ending = _props.ending;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['color', 'started', 'ending', 'style']);

    var styles = this.mergeAndPrefix({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity: this.props.ending ? 0 : this.props.opacity ? this.props.opacity : 0.16,
      borderRadius: '50%',
      transform: this.props.started ? 'scale(1)' : 'scale(0)',
      backgroundColor: this.props.color,
      transition: Transitions.easeOut('2s', 'opacity') + ',' + Transitions.easeOut('1s', 'transform')
    }, this.props.style);

    return React.createElement('div', _extends({}, other, { style: styles }));
  }

});

module.exports = CircleRipple;