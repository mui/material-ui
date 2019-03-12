import { DatePicker, KeyboardDatePicker } from 'material-ui-pickers';
import React, { Fragment, useState } from 'react';

function InlineDatePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <DatePicker
          variant="inline"
          label="Basic example"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="picker">
        <DatePicker
          onlyCalendar
          variant="inline"
          label="Only calendar"
          helperText="No year selection"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="picker">
        <KeyboardDatePicker
          variant="inline"
          inputVariant="outlined"
          label="With keyboard"
          value={selectedDate}
          onChange={handleDateChange}
          format={props.getFormatString({
            moment: 'MM/DD/YYYY',
            dateFns: 'MM/dd/yyyy',
          })}
          InputAdornmentProps={{
            position: 'start',
          }}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        />
      </div>
    </Fragment>
  );
}

export default InlineDatePickerDemo;
