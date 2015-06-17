var React = require('react');
var DateTime = require('../utils/date-time');
var IconButton = require('../icon-button');
var Toolbar = require('../toolbar/toolbar');
var ToolbarGroup = require('../toolbar/toolbar-group');
var DropDownMenu = require('../drop-down-menu');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left');
var NavigationChevronLeftDouble = require('../svg-icons/navigation-chevron-left-double');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var NavigationChevronRightDouble = require('../svg-icons/navigation-chevron-right-double');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var CalendarToolbar = React.createClass({

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

  getDefaultProps: function() {
    return {
      prevYear: true,
      nextYear: true,
      prevMonth: true,
      nextMonth: true,
      hideYearChangeButtons: false
    };
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  _styles: function() {
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
        textAlign: 'center',
        zIndex: -1
      }
    };
  },

  render: function() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();
    var prevYearChangeButton = this._getPrevYearChangeButton();
    var nextYearChangeButton = this._getNextYearChangeButton();
    var styles = this._styles();

    return (
      <Toolbar className="mui-date-picker-calendar-toolbar" style={styles.root} noGutter={true}>
        <ToolbarGroup key={0} float="left">
          {prevYearChangeButton}

          <IconButton
            disabled={!this.props.prevMonth}
            onTouchTap={this._prevMonthTouchTap}>
              <NavigationChevronLeft />
          </IconButton>
        </ToolbarGroup>

        <ToolbarGroup key={1} float="right">
          <IconButton
            disabled={!this.props.nextMonth}
            onTouchTap={this._nextMonthTouchTap}>
              <NavigationChevronRight />
          </IconButton>

          {nextYearChangeButton}
        </ToolbarGroup>

        <SlideInTransitionGroup
          style={styles.title}
          direction={this.state.transitionDirection}>
          <div key={month + '_' + year}>{month} {year}</div>
        </SlideInTransitionGroup>
      </Toolbar>
    );
  },

  _getPrevYearChangeButton: function() {
    var style = {
      display: this.props.hideYearChangeButtons ? 'none' : ''
    };

    return (
      <IconButton
        style={style}
        disabled={!this.props.prevYear}
        onTouchTap={this._prevYearTouchTap}>
          <NavigationChevronLeftDouble />
      </IconButton>
    );
  },

  _getNextYearChangeButton: function() {
    var style = {
      display: this.props.hideYearChangeButtons ? 'none' : ''
    };

    return (
      <IconButton
        style={style}
        disabled={!this.props.nextYear}
        onTouchTap={this._nextYearTouchTap}>
          <NavigationChevronRightDouble />
      </IconButton>
    );
  },

  _prevYearTouchTap: function() {
    if (this.props.onYearChange && this.props.prevYear) this.props.onYearChange(-1);
  },

  _nextYearTouchTap: function() {
    if (this.props.onYearChange && this.props.nextYear) this.props.onYearChange(1);
  },

  _prevMonthTouchTap: function() {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  },

  _nextMonthTouchTap: function() {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  }

});

module.exports = CalendarToolbar;
