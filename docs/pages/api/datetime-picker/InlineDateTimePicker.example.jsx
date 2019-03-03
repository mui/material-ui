import { InlineDateTimePicker } from 'material-ui-pickers';
import React, { Fragment, useState } from 'react';

function InlineDateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <Fragment>
      <div className="picker">
        <InlineDateTimePicker
          label="Basic example"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="picker">
        <InlineDateTimePicker
          keyboard
          ampm={false}
          label="With keyboard"
          value={selectedDate}
          onChange={handleDateChange}
          onError={console.log}
          disablePast
          format={props.getFormatString({
            moment: 'YYYY/MM/DD hh:mm A',
            dateFns: 'yyyy/MM/dd HH:mm',
          })}
          mask={[
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '/',
            /\d/,
            /\d/,
            '/',
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            ':',
            /\d/,
            /\d/,
          ]}
        />
      </div>
    </Fragment>
  );
}

export default InlineDateTimePickerDemo;
