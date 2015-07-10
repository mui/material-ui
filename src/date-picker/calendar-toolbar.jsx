let React = require('react');
let DateTime = require('../utils/date-time');
let IconButton = require('../icon-button');
let Toolbar = require('../toolbar/toolbar');
let ToolbarGroup = require('../toolbar/toolbar-group');
let NavigationChevronLeft = require('../svg-icons/navigation/chevron-left');
let NavigationChevronLeftDouble = require('../svg-icons/navigation-chevron-left-double');
let NavigationChevronRight = require('../svg-icons/navigation/chevron-right');
let NavigationChevronRightDouble = require('../svg-icons/navigation-chevron-right-double');
let SlideInTransitionGroup = require('../transition-groups/slide-in');


let CalendarToolbar = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onMonthChange: React.PropTypes.func,
    onYearChange: React.PropTypes.func,
    prevYear: React.PropTypes.bool,
    nextYear: React.PropTypes.bool,
    prevMonth: React.PropTypes.bool,
    nextMonth: React.PropTypes.bool,
    hideYearChangeButtons: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      prevYear: true,
      nextYear: true,
      prevMonth: true,
      nextMonth: true,
      hideYearChangeButtons: false,
    };
  },

  getInitialState() {
    return {
      transitionDirection: 'up',
    };
  },

  componentWillReceiveProps(nextProps) {
    let direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }
  },

  _styles() {
    return {
      root: {
        position: 'relative',
        padding: 0,
        backgroundColor: 'inherit',
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
      },
    };
  },

  render() {
    let month = DateTime.getFullMonth(this.props.displayDate);
    let year = this.props.displayDate.getFullYear();
    let prevYearChangeButton = this._getPrevYearChangeButton();
    let nextYearChangeButton = this._getNextYearChangeButton();
    let styles = this._styles();

    return (
      <Toolbar className="mui-date-picker-calendar-toolbar" style={styles.root} noGutter={true}>
        <SlideInTransitionGroup
          style={styles.title}
          direction={this.state.transitionDirection}>
          <div key={month + '_' + year}>{month} {year}</div>
        </SlideInTransitionGroup>

        <ToolbarGroup key={0} float="left">
          {prevYearChangeButton}

          <IconButton
            style={styles.button}
            disabled={!this.props.prevMonth}
            onTouchTap={this._prevMonthTouchTap}>
              <NavigationChevronLeft />
          </IconButton>
        </ToolbarGroup>

        <ToolbarGroup key={1} float="right">
          <IconButton
            style={styles.button}
            disabled={!this.props.nextMonth}
            onTouchTap={this._nextMonthTouchTap}>
              <NavigationChevronRight />
          </IconButton>

          {nextYearChangeButton}
        </ToolbarGroup>
      </Toolbar>
    );
  },

  _getPrevYearChangeButton() {
    let style = {
      display: this.props.hideYearChangeButtons ? 'none' : '',
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

  _getNextYearChangeButton() {
    let style = {
      display: this.props.hideYearChangeButtons ? 'none' : '',
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

  _prevYearTouchTap() {
    if (this.props.onYearChange && this.props.prevYear) this.props.onYearChange(-1);
  },

  _nextYearTouchTap() {
    if (this.props.onYearChange && this.props.nextYear) this.props.onYearChange(1);
  },

  _prevMonthTouchTap() {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  },

  _nextMonthTouchTap() {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  },

});

module.exports = CalendarToolbar;
