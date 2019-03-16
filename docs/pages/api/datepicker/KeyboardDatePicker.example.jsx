import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker } from 'material-ui-pickers';

function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <KeyboardDatePicker
          clearable
          label="Uncontrolled input"
          format={props.getFormatString({
            moment: 'MM/DD/YYYY',
            dateFns: 'MM/dd/yyyy',
          })}
          value={selectedDate}
          onChange={date => handleDateChange(date)}
          animateYearScrolling={false}
          minDate={new Date()}
        />
      </div>

      <div className="picker">
        <KeyboardDatePicker
          label="Masked input"
          format={props.getFormatString({
            moment: 'YYYY/MM/DD',
            dateFns: 'yyyy/MM/dd',
          })}
          placeholder="10/10/2018"
          mask={value =>
            // handle clearing outside if value can be changed outside of the component
            value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
          }
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling={false}
        />
      </div>
    </Fragment>
  );
}

export default KeyboardDatePickerExample;
