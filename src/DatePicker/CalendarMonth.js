import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class CalendarMonth extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object.isRequired,
    minDate: PropTypes.object.isRequired,
    onClickMonth: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    utils: PropTypes.object.isRequired,
    wordings: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getMonths() {
    const {
      DateTimeFormat,
      locale,
      selectedDate,
      utils,
    } = this.props;

    const months = [];

    for (let month = 0; month <= 11; month++) {
      const monthFormated = new DateTimeFormat(locale, {
        month: 'short',
      }).format(utils.setMonth(selectedDate, month));

      const monthButton = (
        <Button
          key={`mb${month}`}
          onClick={this.handleClickMonth}
          selected={selectedDate.getMonth() === month}
          value={month}
          current={month === (new Date()).getMonth()}
          style={{flex: '1 0 33.33%', padding: '10'}}
          increaseSelectedFont={false}
        >
          {monthFormated}
        </Button>
      );

      months.push(monthButton);
    }

    return months;
  }

  handleClickMonth = (event, month) => {
    if (this.props.onClickMonth) {
      this.props.onClickMonth(event, month);
    }
  };

  render() {
    const {
      prepareStyles,
      datePicker: {
        calendarMonthBackgroundColor,
      },
    } = this.context.muiTheme;

    const styles = {
      root: {
        backgroundColor: calendarMonthBackgroundColor,
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100%',
        flexWrap: 'wrap',
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        {this.getMonths()}
      </div>
    );
  }
}

export default CalendarMonth;
