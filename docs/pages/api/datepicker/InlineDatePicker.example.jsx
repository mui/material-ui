import { InlineDatePicker } from 'material-ui-pickers';
import React, { Fragment, useState } from 'react';

function InlineDatePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <InlineDatePicker label="Basic example" value={selectedDate} onChange={handleDateChange} />
      </div>

      <div className="picker">
        <InlineDatePicker
          onlyCalendar
          label="Only calendar"
          helperText="No year selection"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="picker">
        <InlineDatePicker
          keyboard
          clearable
          variant="outlined"
          label="With keyboard"
          value={selectedDate}
          onChange={handleDateChange}
          format={props.getFormatString({
            moment: 'MM/DD/YYYY',
            dateFns: 'MM/dd/yyyy',
          })}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        />
      </div>
    </Fragment>
  );
}

export default InlineDatePickerDemo;
