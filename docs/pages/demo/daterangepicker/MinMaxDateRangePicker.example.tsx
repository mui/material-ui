import * as React from 'react';
import addWeeks from 'date-fns/addWeeks';
import { Dayjs } from 'dayjs';
import { Moment } from 'moment';
import { DateTime } from 'luxon';
import { TextField } from '@material-ui/core';
import { makeJSDateObject } from '../../../utils/helpers';
import { DateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers';

function getWeeksAfter(date: Moment | DateTime | Dayjs | Date, amount: number) {
  // TODO: replace with implementation for your date library
  return date ? addWeeks(makeJSDateObject(date), amount) : undefined;
}

function MinMaxDateRangePicker() {
  const [selectedRange, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <DateRangePicker
      disablePast
      value={selectedRange}
      maxDate={getWeeksAfter(selectedRange[0], 4)}
      onChange={date => handleDateChange(date)}
      renderInput={(startProps, endProps) => (
        <>
          <TextField {...startProps} />
          <DateRangeDelimiter> to </DateRangeDelimiter>
          <TextField {...endProps} />
        </>
      )}
    />
  );
}

export default MinMaxDateRangePicker;
