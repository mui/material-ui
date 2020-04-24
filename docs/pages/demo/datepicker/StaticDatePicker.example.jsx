import React, { useState } from 'react';
import isWeekend from 'date-fns/isWeekend';
import { TextField } from '@material-ui/core';
import { StaticDatePicker } from '@material-ui/pickers';
import { makeJSDateObject } from '../../../utils/helpers';

function disableWeekends(date) {
  // TODO: replace with implementation for your date library
  return isWeekend(makeJSDateObject(date));
}

const StaticDatePickerExample = () => {
  const [date, handleDateChange] = useState(new Date());

  return (
    <>
      <StaticDatePicker
        autoOk
        displayStaticWrapperAs="desktop"
        openTo="year"
        value={date}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />

      <StaticDatePicker
        autoOk
        orientation="landscape"
        openTo="date"
        value={date}
        shouldDisableDate={disableWeekends}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />
    </>
  );
};

export default StaticDatePickerExample;
