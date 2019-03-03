import React, { Fragment, useState } from 'react';
import { DatePicker } from 'material-ui-pickers';

function KeyboardDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <DatePicker
          keyboard
          clearable
          label="Uncontrolled input"
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling={false}
          minDate={new Date()}
          onInputChange={e => console.log('Keyboard Input:', e.target.value)}
        />
      </div>

      <div className="picker">
        <DatePicker
          keyboard
          label="Masked input"
          format={props.getFormatString({
            moment: 'MM/DD/YYYY',
            dateFns: 'MM/dd/yyyy',
          })}
          placeholder="10/10/2018"
          mask={value =>
            // handle clearing outside if value can be changed outside of the component
            value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
          }
          value={selectedDate}
          onChange={handleDateChange}
          disableOpenOnEnter
          animateYearScrolling={false}
        />
      </div>
    </Fragment>
  );
}

export default KeyboardDatePicker;
