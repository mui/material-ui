'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var TimeDisplay = require("./time-display");
var ClockButton = require("./clock-button");
var ClockHours = require("./clock-hours");
var ClockMinutes = require("./clock-minutes");

var Clock = React.createClass({
  displayName: 'Clock',

  mixins: [StylePropable],

  propTypes: {
    onChangeMinutes: React.PropTypes.func,
    onChangeHours: React.PropTypes.func,
    initialTime: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    isActive: React.PropTypes.bool
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialTime: new Date()
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTime: nextProps.initialTime
    });
  },

  getInitialState: function getInitialState() {
    return {
      selectedTime: this.props.initialTime,
      mode: 'hour'
    };
  },

  _setMode: function _setMode(mode) {
    var _this = this;

    setTimeout(function () {
      _this.setState({
        mode: mode
      });
    }, 100);
  },

  _setAffix: function _setAffix(affix) {
    if (affix === this._getAffix()) return;

    var hours = this.state.selectedTime.getHours();

    if (affix === "am") {
      this.handleChangeHours(hours - 12, affix);
      return;
    }

    this.handleChangeHours(hours + 12, affix);
  },

  _getAffix: function _getAffix() {
    if (this.props.format !== "ampm") return "";

    var hours = this.state.selectedTime.getHours();
    if (hours < 12) {
      return "am";
    }

    return "pm";
  },

  _getButtons: function _getButtons() {
    var buttons = [];
    var isAM = this._getIsAM();

    if (this.props.format === 'ampm') {
      buttons = [React.createElement(
        ClockButton,
        { key: 'AM', position: 'left', onTouchTap: this._setAffix.bind(this, "am"), selected: isAM },
        "AM"
      ), React.createElement(
        ClockButton,
        { key: 'PM', position: 'right', onTouchTap: this._setAffix.bind(this, "pm"), selected: !isAM },
        "PM"
      )];
    }
    return buttons;
  },

  _getIsAM: function _getIsAM() {
    return this._getAffix() === "am";
  },

  render: function render() {
    var clock = null;
    var buttons = this._getButtons();

    var styles = {
      root: {},

      container: {
        height: 280,
        padding: 10
      }
    };

    if (this.state.mode === "hour") {
      clock = React.createElement(ClockHours, { key: 'hours',
        format: this.props.format,
        onChange: this.handleChangeHours,
        initialHours: this.state.selectedTime.getHours() });
    } else {
      clock = React.createElement(ClockMinutes, { key: 'minutes',
        onChange: this.handleChangeMinutes,
        initialMinutes: this.state.selectedTime.getMinutes() });
    }

    return React.createElement(
      'div',
      { style: this.prepareStyles(styles.root) },
      React.createElement(TimeDisplay, {
        selectedTime: this.state.selectedTime,
        mode: this.state.mode,
        format: this.props.format,
        affix: this._getAffix(),
        onSelectHour: this._setMode.bind(this, 'hour'),
        onSelectMin: this._setMode.bind(this, 'minute') }),
      React.createElement(
        'div',
        { style: this.prepareStyles(styles.container) },
        clock
      ),
      buttons
    );
  },

  handleChangeHours: function handleChangeHours(hours, finished) {
    var _this2 = this;

    var time = new Date(this.state.selectedTime);
    var affix = undefined;

    if (typeof finished === 'string') {
      affix = finished;
      finished = undefined;
    }
    if (!affix) {
      affix = this._getAffix();
    }
    if (affix === 'pm' && hours < 12) {
      hours += 12;
    }

    time.setHours(hours);
    this.setState({
      selectedTime: time
    });

    var onChangeHours = this.props.onChangeHours;

    if (finished) {
      setTimeout(function () {
        _this2.setState({
          mode: 'minute'
        });
        if (typeof onChangeHours === 'function') {
          onChangeHours(time);
        }
      }, 100);
    }
  },

  handleChangeMinutes: function handleChangeMinutes(minutes) {
    var time = new Date(this.state.selectedTime);
    time.setMinutes(minutes);
    this.setState({
      selectedTime: time
    });

    var onChangeMinutes = this.props.onChangeMinutes;

    if (typeof onChangeMinutes === 'function') {
      setTimeout(function () {
        onChangeMinutes(time);
      }, 0);
    }
  },

  getSelectedTime: function getSelectedTime() {
    return this.state.selectedTime;
  }
});

module.exports = Clock;