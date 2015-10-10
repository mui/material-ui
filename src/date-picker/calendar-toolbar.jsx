const React = require('react');
const DateTime = require('../utils/date-time');
const IconButton = require('../icon-button');
const Toolbar = require('../toolbar/toolbar');
const ToolbarGroup = require('../toolbar/toolbar-group');
const NavigationChevronLeft = require('../svg-icons/navigation/chevron-left');
const NavigationChevronRight = require('../svg-icons/navigation/chevron-right');
const SlideInTransitionGroup = require('../transition-groups/slide-in');
const ThemeManager = require('../styles/theme-manager');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');

const CalendarToolbar = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      transitionDirection: 'up',
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

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

    const nextButtonIcon = this.state.muiTheme.isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;
    const prevButtonIcon = this.state.muiTheme.isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;

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
              {nextButtonIcon}
          </IconButton>
        </ToolbarGroup>

        <ToolbarGroup key={1} float="right">
          <IconButton
            style={styles.button}
            disabled={!this.props.nextMonth}
            onTouchTap={this._nextMonthTouchTap}>
              {prevButtonIcon}
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
