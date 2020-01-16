import React, { Fragment, useState } from 'react';
import { MobileDatePicker, DesktopDatePicker, DatePicker } from '@material-ui/pickers';

function DatePickersVariants(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <MobileDatePicker
        clearable
        label="For mobile"
        value={selectedDate}
        placeholder="10/10/2018"
        onChange={date => handleDateChange(date)}
        format={props.__willBeReplacedGetFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
      />

      <DesktopDatePicker
        autoOk
        label="For desktop"
        minDate={new Date('2017-01-01')}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DatePicker
        disableFuture
        showTodayButton
        label="Responsive"
        openTo="year"
        views={['year', 'month', 'date']}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default DatePickersVariants;
