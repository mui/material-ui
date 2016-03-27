import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import DateTime from '../utils/dateTime';
import DayButton from './DayButton';
import ClearFix from '../internal/ClearFix';
import warning  from 'warning';

const CalendarMonth = React.createClass({

  propTypes: {
    autoOk: React.PropTypes.bool,
    displayDate: React.PropTypes.object.isRequired,
    firstDayOfWeek: React.PropTypes.number,
    getDayElement: React.PropTypes.func,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
  },

  _getWeekElements() {
    const weekArray = DateTime.getWeekArray(this.props.displayDate, this.props.firstDayOfWeek);

    return weekArray.map((week, i) => {
      return (
        <ClearFix key={i}>
          {this._getDayElements(week, i)}
        </ClearFix>
      );
    }, this);
  },

  _getDayElements(week, i) {
    return week.map((day, j) => {
      if (this.props.getDayElement) {
        const component = this.props.getDayElement(day, this.props.selectedDate);

        if (!ReactTestUtils.isElementOfType(component, DayButton)) {
          warning(ReactTestUtils.isElementOfType(component, DayButton), `getDayElement must
return an element of type DayButton`);
        }

        return React.cloneElement(component, {
          onTouchTap: this._handleDayTouchTap,
          key: `db${(i + j)}`,
        });
      }

      const isSameDate = DateTime.isEqualDate(this.props.selectedDate, day);

      return (
        <DayButton
          key={`db${(i + j)}`}
          date={day}
          onTouchTap={this.handleTouchTap}
          selected={isSameDate}
        />
      );
    }, this);
  },

  handleTouchTap(event, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(event, date);
  },

  render() {
    const styles = {
      lineHeight: '32px',
      textAlign: 'center',
      padding: '16px 14px 0 14px',
    };

    return (
      <div style={styles}>
        {this._getWeekElements()}
      </div>
    );
  },

});

export default CalendarMonth;
