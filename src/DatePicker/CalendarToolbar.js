import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';

import IconButton from '../IconButton';
import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideIn from '../internal/SlideIn';

const styleSheet = createStyleSheet('CalendarToolbar', () => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'inherit',
      height: 48,
    },
    titleDiv: {
      fontWeight: '500',
      textAlign: 'center',
      width: '100%',
    },
    titleText: {
      fontSize: 14,
      height: 'inherit',
      paddingTop: 12,
    },
  };
});

class CalendarToolbar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    displayDate: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    nextMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool,
  };

  static defaultProps = {
    nextMonth: true,
    prevMonth: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    transitionDirection: 'up',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const direction = nextProps.displayDate > this.props.displayDate ? 'left' : 'right';
      this.setState({
        transitionDirection: direction,
      });
    }
  }

  handleTouchTapPrevMonth = () => {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  };

  handleTouchTapNextMonth = () => {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  };

  render() {
    const {
      styleManager,
      isRtl,
    } = this.context.muiTheme;
    const classes = styleManager.render(styleSheet);

    const {
      DateTimeFormat,
      locale,
      displayDate,
      prevMonth,
      nextMonth,
    } = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const nextButtonIcon = isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;
    const prevButtonIcon = isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;

    return (
      <div className={classes.root}>
        <IconButton disabled={!prevMonth} onTouchTap={this.handleTouchTapPrevMonth}>
          {prevButtonIcon}
        </IconButton>
        <SlideIn direction={this.state.transitionDirection} className={classes.titleDiv}>
          <div key={dateTimeFormatted} className={classes.titleText}>
            {dateTimeFormatted}
          </div>
        </SlideIn>
        <IconButton disabled={!nextMonth} onTouchTap={this.handleTouchTapNextMonth}>
          {nextButtonIcon}
        </IconButton>
      </div>
    );
  }
}

export default CalendarToolbar;
