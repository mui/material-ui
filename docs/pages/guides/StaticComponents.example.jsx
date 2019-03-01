import React, { useState } from 'react';
import { Paper } from '@material-ui/core/';

import DateFnsUtils from '@date-io/date-fns';
import { BasePicker, MuiPickersUtilsProvider, TimePickerView, Calendar } from 'material-ui-pickers';

function StaticPickers() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BasePicker value={selectedDate} onChange={handleDateChange}>
        {({
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
              <Paper style={{ overflow: 'hidden' }}>
                <Calendar date={date} onChange={handleChange} />
              </Paper>
            </div>

            <TimePickerView
              type="hours"
              date={date}
              ampm={false}
              onMinutesChange={() => {}}
              onSecondsChange={() => {}}
              onHourChange={handleChange}
            />
          </div>
        )}
      </BasePicker>
    </MuiPickersUtilsProvider>
  );
}

export default StaticPickers;
