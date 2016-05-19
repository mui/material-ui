import React, {Component, PropTypes} from 'react';
import IconButton from '../IconButton';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarGroup from '../Toolbar/ToolbarGroup';
import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from '../internal/SlideIn';

function getStyles(props, context) {
  const {
    datePicker,
  } = context.muiTheme;

  return {
    root: {
      position: 'relative',
      padding: 0,
      backgroundColor: 'inherit',
      borderBottom: '1px solid',
      borderBottomColor: datePicker.borderColor,
      marginBottom: '15px'
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
}

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
      const direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
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
      DateTimeFormat,
      locale,
      displayDate,
    } = this.props;
    
    const styles = getStyles(this.props, this.context);

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const nextButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;
    const prevButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;
    
    return (
      <Toolbar style={styles.root} noGutter={true}>
        <div style={styles.title} key={dateTimeFormatted}>{dateTimeFormatted}</div>
        <ToolbarGroup key={0} float="left">
          <IconButton
            style={styles.button}
            disabled={!this.props.prevMonth}
            onTouchTap={this.handleTouchTapPrevMonth}
          >
            {nextButtonIcon}
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <IconButton
            style={styles.button}
            disabled={!this.props.nextMonth}
            onTouchTap={this.handleTouchTapNextMonth}
          >
            {prevButtonIcon}
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default CalendarToolbar;
