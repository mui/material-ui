import React from 'react';
import IconButton from '../icon-button';
import Toolbar from '../toolbar/toolbar';
import ToolbarGroup from '../toolbar/toolbar-group';
import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from '../transition-groups/slide-in';
import muiThemeable from '../muiThemeable';

const styles = {
  root: {
    position: 'relative',
    padding: 0,
    backgroundColor: 'inherit',
  },
  title: {
    position: 'absolute',
    top: 17,
    lineHeight: '14px',
    fontSize: 14,
    height: 14,
    width: '100%',
    fontWeight: '500',
    textAlign: 'center',
  },
};

let CalendarToolbar = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    displayDate: React.PropTypes.object.isRequired,
    locale: React.PropTypes.string.isRequired,
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

  render() {
    const {
      DateTimeFormat,
      locale,
      displayDate,
    } = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const nextButtonIcon = this.props._muiTheme.isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;
    const prevButtonIcon = this.props._muiTheme.isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;

    return (
      <Toolbar className="mui-date-picker-calendar-toolbar" style={styles.root} noGutter={true}>
        <SlideInTransitionGroup
          style={styles.title}
          direction={this.state.transitionDirection}>
          <div key={dateTimeFormatted}>{dateTimeFormatted}</div>
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

CalendarToolbar = muiThemeable(CalendarToolbar);

export default CalendarToolbar;
