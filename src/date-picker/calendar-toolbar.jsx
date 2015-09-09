const React = require('react');
const DateTime = require('../utils/date-time');
const IconButton = require('../icon-button');
const Toolbar = require('../toolbar/toolbar');
const ToolbarGroup = require('../toolbar/toolbar-group');
const NavigationChevronLeft = require('../svg-icons/navigation/chevron-left');
const NavigationChevronLeftDouble = require('../svg-icons/navigation-chevron-left-double');
const NavigationChevronRight = require('../svg-icons/navigation/chevron-right');
const NavigationChevronRightDouble = require('../svg-icons/navigation-chevron-right-double');
const SlideInTransitionGroup = require('../transition-groups/slide-in');


const CalendarToolbar = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    nextMonth: React.PropTypes.bool,
    onMonthChange: React.PropTypes.func,
    prevMonth: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      nextMonth: true,
      prevMonth: true,
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
    let styles = this._styles();

    return (
      <Toolbar className="mui-date-picker-calendar-toolbar" style={styles.root} noGutter={true}>
        <SlideInTransitionGroup
          style={styles.title}
          direction={this.state.transitionDirection}>
          <div key={month + '_' + year}>{month} {year}</div>
        </SlideInTransitionGroup>

        <ToolbarGroup key={0} float="left">
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
        </ToolbarGroup>
      </Toolbar>
    );
  },

  _prevMonthTouchTap() {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  },

  _nextMonthTouchTap() {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  },

});

module.exports = CalendarToolbar;
