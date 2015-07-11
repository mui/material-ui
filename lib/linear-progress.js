'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');

var LinearProgress = React.createClass({
  displayName: 'LinearProgress',

  mixins: [StylePropable],

  propTypes: {
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  _getRelativeValue: function _getRelativeValue() {
    var value = this.props.value;
    var min = this.props.min;
    var max = this.props.max;

    var clampedValue = Math.min(Math.max(min, value), max);
    var rangeValue = max - min;
    var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    var bar1 = React.findDOMNode(this.refs.bar1);
    var bar2 = React.findDOMNode(this.refs.bar2);

    this._barUpdate(0, bar1, [[-35, 100], [100, -90]]);

    setTimeout(function () {
      _this._barUpdate(0, bar2, [[-200, 100], [107, -8]]);
    }, 850);
  },

  _barUpdate: function _barUpdate(step, barElement, stepValues) {
    step = step || 0;
    step %= 4;
    setTimeout(this._barUpdate.bind(this, step + 1, barElement, stepValues), 420);
    if (!this.isMounted()) return;
    if (this.props.mode !== 'indeterminate') return;

    if (step === 0) {
      barElement.style.left = stepValues[0][0] + '%';
      barElement.style.right = stepValues[0][1] + '%';
    } else if (step === 1) {
      barElement.style.transitionDuration = '840ms';
    } else if (step === 2) {
      barElement.style.left = stepValues[1][0] + '%';
      barElement.style.right = stepValues[1][1] + '%';
    } else if (step === 3) {
      barElement.style.transitionDuration = '0ms';
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'indeterminate',
      value: 0,
      min: 0,
      max: 100
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.palette;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        position: 'relative',
        height: 4,
        display: 'block',
        width: '100%',
        backgroundColor: this.getTheme().primary3Color,
        borderRadius: 2,
        margin: 0,
        overflow: 'hidden'
      },
      bar: {
        height: '100%'
      },
      barFragment1: {},
      barFragment2: {}
    };

    if (this.props.mode === 'indeterminate') {
      styles.barFragment1 = {
        position: 'absolute',
        backgroundColor: this.getTheme().primary1Color,
        top: 0,
        left: 0,
        bottom: 0,
        transition: Transitions.create('all', '840ms', null, 'cubic-bezier(0.650, 0.815, 0.735, 0.395)')
      };

      styles.barFragment2 = {
        position: 'absolute',
        backgroundColor: this.getTheme().primary1Color,
        top: 0,
        left: 0,
        bottom: 0,
        transition: Transitions.create('all', '840ms', null, 'cubic-bezier(0.165, 0.840, 0.440, 1.000)')
      };
    } else {
      styles.bar.backgroundColor = this.getTheme().primary1Color;
      styles.bar.transition = Transitions.create('width', '.3s', null, 'linear');
      styles.bar.width = this._getRelativeValue() + '%';
    }

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['style']);

    var styles = this.getStyles();

    return React.createElement(
      'div',
      _extends({}, other, { style: this.mergeAndPrefix(styles.root, style) }),
      React.createElement(
        'div',
        { style: this.mergeAndPrefix(styles.bar) },
        React.createElement('div', { ref: 'bar1', style: this.mergeAndPrefix(styles.barFragment1) }),
        React.createElement('div', { ref: 'bar2', style: this.mergeAndPrefix(styles.barFragment2) })
      )
    );
  }
});

module.exports = LinearProgress;