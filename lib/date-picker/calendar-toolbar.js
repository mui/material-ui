'use strict';

var React = require('react');
var DateTime = require('../utils/date-time');
var IconButton = require('../icon-button');
var Toolbar = require('../toolbar/toolbar');
var ToolbarGroup = require('../toolbar/toolbar-group');
var NavigationChevronLeft = require('../svg-icons/navigation/chevron-left');
var NavigationChevronLeftDouble = require('../svg-icons/navigation-chevron-left-double');
var NavigationChevronRight = require('../svg-icons/navigation/chevron-right');
var NavigationChevronRightDouble = require('../svg-icons/navigation-chevron-right-double');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var CalendarToolbar = React.createClass({
  displayName: 'CalendarToolbar',

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onMonthChange: React.PropTypes.func,
    onYearChange: React.PropTypes.func,
    prevYear: React.PropTypes.bool,
    nextYear: React.PropTypes.bool,
    prevMonth: React.PropTypes.bool,
    nextMonth: React.PropTypes.bool,
    hideYearChangeButtons: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prevYear: true,
      nextYear: true,
      prevMonth: true,
      nextMonth: true,
      hideYearChangeButtons: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var direction = undefined;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  _styles: function _styles() {
    return {
      root: {
        position: 'relative',
        padding: 0,
        backgroundColor: 'inherit'
      },

      title: {
        position: 'absolute',
        top: '17px',
        lineHeight: '14px',
        fontSize: '14px',
        height: '14px',
        width: '100%',
        fontWeight: '500',
        textAlign: 'center'
      }
    };
  },

  render: function render() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();
    var prevYearChangeButton = this._getPrevYearChangeButton();
    var nextYearChangeButton = this._getNextYearChangeButton();
    var styles = this._styles();

    return React.createElement(
      Toolbar,
      { className: 'mui-date-picker-calendar-toolbar', style: styles.root, noGutter: true },
      React.createElement(
        SlideInTransitionGroup,
        {
          style: styles.title,
          direction: this.state.transitionDirection },
        React.createElement(
          'div',
          { key: month + '_' + year },
          month,
          ' ',
          year
        )
      ),
      React.createElement(
        ToolbarGroup,
        { key: 0, float: 'left' },
        prevYearChangeButton,
        React.createElement(
          IconButton,
          {
            style: styles.button,
            disabled: !this.props.prevMonth,
            onTouchTap: this._prevMonthTouchTap },
          React.createElement(NavigationChevronLeft, null)
        )
      ),
      React.createElement(
        ToolbarGroup,
        { key: 1, float: 'right' },
        React.createElement(
          IconButton,
          {
            style: styles.button,
            disabled: !this.props.nextMonth,
            onTouchTap: this._nextMonthTouchTap },
          React.createElement(NavigationChevronRight, null)
        ),
        nextYearChangeButton
      )
    );
  },

  _getPrevYearChangeButton: function _getPrevYearChangeButton() {
    var style = {
      display: this.props.hideYearChangeButtons ? 'none' : ''
    };

    return React.createElement(
      IconButton,
      {
        style: style,
        disabled: !this.props.prevYear,
        onTouchTap: this._prevYearTouchTap },
      React.createElement(NavigationChevronLeftDouble, null)
    );
  },

  _getNextYearChangeButton: function _getNextYearChangeButton() {
    var style = {
      display: this.props.hideYearChangeButtons ? 'none' : ''
    };

    return React.createElement(
      IconButton,
      {
        style: style,
        disabled: !this.props.nextYear,
        onTouchTap: this._nextYearTouchTap },
      React.createElement(NavigationChevronRightDouble, null)
    );
  },

  _prevYearTouchTap: function _prevYearTouchTap() {
    if (this.props.onYearChange && this.props.prevYear) this.props.onYearChange(-1);
  },

  _nextYearTouchTap: function _nextYearTouchTap() {
    if (this.props.onYearChange && this.props.nextYear) this.props.onYearChange(1);
  },

  _prevMonthTouchTap: function _prevMonthTouchTap() {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  },

  _nextMonthTouchTap: function _nextMonthTouchTap() {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  }

});

module.exports = CalendarToolbar;