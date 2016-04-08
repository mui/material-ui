import React, {Component, PropTypes} from 'react';
import IconButton from '../IconButton';
import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from '../internal/SlideIn';

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'inherit',
    height: 48,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: '20px',
    position: 'relative',
    textAlign: 'center',
    paddingTop: 12,
    width: '100%',
  },
  button: {
    padding: 0,
    paddingTop: 12,
    margin: 0,
    height: 'inherit',
    textAlign: 'center',
  },
};

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
    const {DateTimeFormat, locale, displayDate} = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const nextButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;
    const prevButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;

    return (
      <div style={styles.root}>
        <IconButton
          disabled={!this.props.prevMonth}
          onTouchTap={this.handleTouchTapPrevMonth}
          style={styles.button}
        >
          {nextButtonIcon}
        </IconButton>
        <SlideInTransitionGroup
          direction={this.state.transitionDirection}
          style={styles.title}
        >
          <div key={dateTimeFormatted}>{dateTimeFormatted}</div>
        </SlideInTransitionGroup>
        <IconButton
          disabled={!this.props.nextMonth}
          onTouchTap={this.handleTouchTapNextMonth}
          style={styles.button}
        >
          {prevButtonIcon}
        </IconButton>
      </div>
    );
  }
}

export default CalendarToolbar;
