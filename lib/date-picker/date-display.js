'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DateTime = require('../utils/date-time');
var Transitions = require('../styles/transitions');
var AutoPrefix = require('../styles/auto-prefix');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var DateDisplay = React.createClass({
  displayName: 'DateDisplay',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired,
    weekCount: React.PropTypes.number,
    yearSelectionAvailable: React.PropTypes.bool,
    monthDaySelected: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      weekCount: 4,
      yearSelectionAvailable: true,
      monthDaySelected: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      transitionDirection: 'up',
      selectedYear: !this.props.monthDaySelected
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var direction = undefined;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }

    if (nextProps.monthDaySelected !== undefined) {
      this.setState({ selectedYear: !nextProps.monthDaySelected });
    }
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.datePicker;
  },

  render: function render() {
    var _props = this.props;
    var selectedDate = _props.selectedDate;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['selectedDate', 'style']);

    var dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();

    var isLandscape = this.props.mode === 'landscape';
    var dateYPosition = 0;
    var dayYPosition = 30;
    var yearYPosition = 95;

    if (isLandscape) {
      dateYPosition = this.props.weekCount === 5 ? 14 : this.props.weekCount === 6 ? 34 : 8;
      yearYPosition = this.props.weekCount === 4 ? 114 : 150;
      if (this.props.weekCount > 4) dayYPosition = 50;
    }

    var styles = {
      root: {
        textAlign: 'center',
        position: 'relative'
      },

      dateContainer: {
        backgroundColor: this.getTheme().color,
        height: isLandscape ? this.props.weekCount * 40 + 36 : 150,
        padding: '16px 0',
        transition: Transitions.easeOut(),
        boxSizing: 'border-box'
      },

      date: {
        position: 'relative',
        color: this.getTheme().textColor,
        transition: Transitions.easeOut(),
        transform: 'translate3d(0,' + dateYPosition + 'px,0)'
      },

      dowContainer: {
        height: 32,
        backgroundColor: this.getTheme().selectColor,
        borderRadius: isLandscape ? '2px 0 0 0' : '2px 2px 0 0',
        paddingTop: 9,
        boxSizing: 'border-box'
      },

      dow: {
        fontSize: 13,
        lineHeight: '13px',
        height: '100%',
        color: this.getTheme().selectTextColor
      },

      day: {
        root: {
          position: 'absolute',
          lineHeight: isLandscape ? '76px' : '58px',
          fontSize: isLandscape ? 76 : 58,
          height: isLandscape ? 76 : 58,
          width: '100%',
          opacity: this.state.selectedYear ? 0.7 : 1.0,
          transition: Transitions.easeOut(),
          transform: 'translate3d(0,' + dayYPosition + 'px,0)'
        },

        title: {
          width: 100,
          marginLeft: 'auto',
          marginRight: 'auto',
          cursor: !this.state.selectedYear ? 'default' : 'pointer'
        }
      },

      month: {
        root: {
          position: 'absolute',
          top: isLandscape ? 0 : 1,
          fontSize: isLandscape ? 26 : 22,
          lineHeight: isLandscape ? '26px' : '22px',
          height: isLandscape ? 26 : 22,
          width: '100%',
          textTransform: 'uppercase',
          opacity: this.state.selectedYear ? 0.7 : 1.0
        },

        title: {
          width: 100,
          marginLeft: 'auto',
          marginRight: 'auto',
          cursor: !this.state.selectedYear ? 'default' : 'pointer'
        }
      },

      year: {
        root: {
          position: 'absolute',
          margin: 0,
          fontSize: isLandscape ? 26 : 22,
          lineHeight: isLandscape ? '26px' : '22px',
          height: isLandscape ? 26 : 22,
          width: '100%',
          textTransform: 'uppercase',
          opacity: this.state.selectedYear ? 1.0 : 0.7,
          transition: Transitions.easeOut(),
          transform: 'translate3d(0,' + yearYPosition + 'px,0)'
        },

        title: {
          width: 100,
          marginLeft: 'auto',
          marginRight: 'auto',
          cursor: !this.props.yearSelectionAvailable || this.state.selectedYear ? 'default' : 'pointer'
        }
      }
    };

    return React.createElement(
      'div',
      _extends({}, other, { style: this.mergeAndPrefix(styles.root, this.props.style) }),
      React.createElement(
        'div',
        { style: styles.dowContainer },
        React.createElement(
          SlideInTransitionGroup,
          {
            style: styles.dow,
            direction: this.state.transitionDirection },
          React.createElement(
            'div',
            { key: dayOfWeek },
            dayOfWeek
          )
        )
      ),
      React.createElement(
        'div',
        { style: AutoPrefix.all(styles.dateContainer) },
        React.createElement(
          'div',
          { style: AutoPrefix.all(styles.date) },
          React.createElement(
            SlideInTransitionGroup,
            {
              style: styles.month.root,
              direction: this.state.transitionDirection },
            React.createElement(
              'div',
              { key: month, style: styles.month.title, onTouchTap: this._handleMonthDayClick },
              month
            )
          ),
          React.createElement(
            SlideInTransitionGroup,
            {
              style: styles.day.root,
              direction: this.state.transitionDirection },
            React.createElement(
              'div',
              { key: day, style: styles.day.title, onTouchTap: this._handleMonthDayClick },
              day
            )
          ),
          React.createElement(
            SlideInTransitionGroup,
            {
              style: styles.year.root,
              direction: this.state.transitionDirection },
            React.createElement(
              'div',
              { key: year, style: styles.year.title, onTouchTap: this._handleYearClick },
              year
            )
          )
        )
      )
    );
  },

  _handleMonthDayClick: function _handleMonthDayClick() {
    if (this.props.handleMonthDayClick && this.state.selectedYear) {
      this.props.handleMonthDayClick();
    }

    if (this.props.yearSelectionAvailable) this.setState({ selectedYear: false });
  },

  _handleYearClick: function _handleYearClick() {
    if (this.props.handleYearClick && !this.state.selectedYear && this.props.yearSelectionAvailable) {
      this.props.handleYearClick();
    }

    if (this.props.yearSelectionAvailable) this.setState({ selectedYear: true });
  }

});

module.exports = DateDisplay;