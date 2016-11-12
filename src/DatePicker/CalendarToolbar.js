import React, {Component, PropTypes} from 'react';
import IconButton from '../IconButton';
import SlideInTransitionGroup from '../internal/SlideIn';
 import { createStyleSheet } from 'jss-theme-reactor';

export const styleSheet = createStyleSheet('CalToobar', (theme) => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'inherit',
        height: 48,
      },
      titleDiv: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        width: '100%',
      },
      titleText: {
        height: 'inherit',
        paddingTop: 12,
      },
    }
  }
);

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
    styleManager: PropTypes.object.isRequired,
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
    if (this.props.onMonthChange) {
      this.props.onMonthChange(-1);
    }
  };

  handleTouchTapNextMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(1);
    }
  };

  render() {
    const {DateTimeFormat, locale, displayDate} = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const styleManager = this.context.styleManager;
    const { render } = styleManager;
    const cls = render(styleSheet);
    return (
      <div className={cls.root}>
        <IconButton
          disabled={!this.props.prevMonth}
          onClick={this.handleTouchTapPrevMonth}
        >
          <i className="fa fa-chevron-circle-left" />
        </IconButton>
        <SlideInTransitionGroup
          direction={this.state.transitionDirection}
          className={cls.titleDiv}
        >
          <div key={dateTimeFormatted} className={cls.titleText}>
            {dateTimeFormatted}
          </div>
        </SlideInTransitionGroup>
        <IconButton
          disabled={!this.props.nextMonth}
          onClick={this.handleTouchTapNextMonth}
        >
          <i className="fa fa-chevron-circle-right" />
        </IconButton>
      </div>
    );
  }
}

export default CalendarToolbar;
