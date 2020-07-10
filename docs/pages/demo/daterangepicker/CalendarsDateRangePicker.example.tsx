import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField } from '@material-ui/core';
import { DateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers';

function CalendarsDateRangePicker() {
  const [selectedDate, handleDateChange] = React.useState<DateRange<Date>>([null, null]);

  return (
    <Grid container direction="column" alignItems="center">
      <Typography gutterBottom> 1 calendar </Typography>
      <DateRangePicker
        calendars={1}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />

      <Typography gutterBottom> 2 calendars</Typography>
      <DateRangePicker
        calendars={2}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />

      <Typography gutterBottom> 3 calendars</Typography>
      <DateRangePicker
        calendars={3}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </Grid>
  );
}

export default CalendarsDateRangePicker;
