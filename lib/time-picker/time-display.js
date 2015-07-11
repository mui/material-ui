'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TimeDisplay = React.createClass({
  displayName: 'TimeDisplay',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    selectedTime: React.PropTypes.object.isRequired,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    affix: React.PropTypes.oneOf(['', 'pm', 'am'])
  },

  getInitialState: function getInitialState() {
    return {
      transitionDirection: 'up'
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'hour',
      affix: ''
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var direction = undefined;

    if (nextProps.selectedTime !== this.props.selectedTime) {
      direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';

      this.setState({
        transitionDirection: direction
      });
    }
  },

  sanitizeTime: function sanitizeTime() {
    var hour = this.props.selectedTime.getHours();
    var min = this.props.selectedTime.getMinutes().toString();

    if (this.props.format === 'ampm') {
      hour %= 12;
      hour = hour || 12;
    }

    hour = hour.toString();
    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;

    return [hour, min];
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.timePicker;
  },

  render: function render() {
    var _props = this.props;
    var selectedTime = _props.selectedTime;
    var mode = _props.mode;

    var other = _objectWithoutProperties(_props, ['selectedTime', 'mode']);

    var styles = {
      root: {
        textAlign: 'center',
        position: 'relative',
        width: 280,
        height: '100%'
      },

      time: {
        margin: '6px 0',
        lineHeight: '58px',
        height: 58,
        fontSize: '58px'
      },

      box: {
        padding: '16px 0',
        backgroundColor: this.getTheme().color,
        color: this.getTheme().textColor
      },

      hour: {},

      minute: {}
    };

    var _sanitizeTime = this.sanitizeTime();

    var _sanitizeTime2 = _slicedToArray(_sanitizeTime, 2);

    var hour = _sanitizeTime2[0];
    var min = _sanitizeTime2[1];

    styles[mode].color = this.getTheme().accentColor;

    return React.createElement(
      'div',
      _extends({}, other, { style: this.mergeAndPrefix(styles.root) }),
      React.createElement(
        'div',
        { style: this.mergeAndPrefix(styles.box) },
        React.createElement(
          'div',
          { style: this.mergeAndPrefix(styles.time) },
          React.createElement(
            'span',
            { style: this.mergeAndPrefix(styles.hour), onTouchTap: this.props.onSelectHour },
            hour
          ),
          React.createElement(
            'span',
            null,
            ':'
          ),
          React.createElement(
            'span',
            { style: this.mergeAndPrefix(styles.minute), onTouchTap: this.props.onSelectMin },
            min
          )
        ),
        React.createElement(
          'span',
          { key: 'affix' },
          this.props.affix.toUpperCase()
        )
      )
    );
  }

});

module.exports = TimeDisplay;