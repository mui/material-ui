import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers';

export default function CalendarsDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <Grid container direction="column" alignItems="center">
      <Typography gutterBottom> 1 calendar </Typography>
      <DateRangePicker
        calendars={1}
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
