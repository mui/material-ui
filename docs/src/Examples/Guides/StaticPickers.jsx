import React, { PureComponent } from 'react';
import BasePicker from 'material-ui-pickers/_shared/BasePicker';
import Calendar from 'material-ui-pickers/DatePicker/Calendar';


/* eslint-disable no-unused-vars */
class StaticPickers extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <BasePicker value={selectedDate} onChange={this.handleDateChange}>
        {
          ({
            date,
            handleAccept,
            handleChange,
            handleClear,
            handleDismiss,
            handleSetTodayDate,
            handleTextFieldChange,
            pick12hOr24hFormat,
          }) => (
            <div>
              <div className="picker">
                <Calendar date={date} onChange={handleChange} />
              </div>
              {/* <div className="picker">
                <HourView date={date} ampm={false} onChange={handleChange} type="hours" />
              </div> */}
            </div>
          )
        }
      </BasePicker>
    );
  }
}


export default StaticPickers;

