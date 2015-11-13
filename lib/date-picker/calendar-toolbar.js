'use strict';

var React = require('react');
var IconButton = require('../icon-button');
var Toolbar = require('../toolbar/toolbar');
var ToolbarGroup = require('../toolbar/toolbar-group');
var NavigationChevronLeft = require('../svg-icons/navigation/chevron-left');
var NavigationChevronRight = require('../svg-icons/navigation/chevron-right');
var SlideInTransitionGroup = require('../transition-groups/slide-in');
var ThemeManager = require('../styles/theme-manager');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');

var styles = {
  root: {
    position: 'relative',
    padding: 0,
    backgroundColor: 'inherit'
  },
  title: {
    position: 'absolute',
    top: 17,
    lineHeight: '14px',
    fontSize: 14,
    height: 14,
    width: '100%',
    fontWeight: '500',
    textAlign: 'center'
  }
};

var CalendarToolbar = React.createClass({
  displayName: 'CalendarToolbar',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    locale: React.PropTypes.string.isRequired,
    displayDate: React.PropTypes.object.isRequired,
    nextMonth: React.PropTypes.bool,
    onMonthChange: React.PropTypes.func,
    prevMonth: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      nextMonth: true,
      prevMonth: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      transitionDirection: 'up'
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    var direction = undefined;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  render: function render() {
    var _props = this.props;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;
    var displayDate = _props.displayDate;

    var dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric'
    }).format(displayDate);

    var nextButtonIcon = this.state.muiTheme.isRtl ? React.createElement(NavigationChevronRight, null) : React.createElement(NavigationChevronLeft, null);
    var prevButtonIcon = this.state.muiTheme.isRtl ? React.createElement(NavigationChevronLeft, null) : React.createElement(NavigationChevronRight, null);

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
          { key: dateTimeFormatted },
          dateTimeFormatted
        )
      ),
      React.createElement(
        ToolbarGroup,
        { key: 0, float: 'left' },
        React.createElement(
          IconButton,
          {
            style: styles.button,
            disabled: !this.props.prevMonth,
            onTouchTap: this._prevMonthTouchTap },
          nextButtonIcon
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
          prevButtonIcon
        )
      )
    );
  },

  _prevMonthTouchTap: function _prevMonthTouchTap() {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  },

  _nextMonthTouchTap: function _nextMonthTouchTap() {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  }

});

module.exports = CalendarToolbar;