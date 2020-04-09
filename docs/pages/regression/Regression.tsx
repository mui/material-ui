import React, { useState, useContext } from 'react';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import { Grid, Typography } from '@material-ui/core';
import { MuiPickersContext, DateRangePicker } from '@material-ui/pickers';
import { createRegressionDay as createRegressionDayRenderer } from './RegressionDay';
import {
  DateRange,
  MobileDatePicker,
  DesktopDatePicker,
  MobileTimePicker,
  DesktopTimePicker,
} from '@material-ui/pickers';

function Regression() {
  const utils = useContext(MuiPickersContext);
  const [range, changeRange] = useState<DateRange>([new Date('2019-01-01T00:00:00.000'), null]);
  const [date, changeDate] = useState<Date | null>(new Date('2019-01-01T00:00:00.000'));

  const sharedProps = {
    value: date,
    onChange: (date: any) => changeDate(date),
    style: { margin: '0 10px' },
    leftArrowIcon: <LeftArrowIcon data-arrow="left" />,
    rightArrowIcon: <RightArrowIcon data-arrow="right" />,
    renderDay: createRegressionDayRenderer(utils!),
    KeyboardButtonProps: {
      className: 'keyboard-btn',
    },
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Typography align="center" variant="h5" gutterBottom>
        This page is using for the automate regression of @material-ui/pickers.
      </Typography>

      <Typography align="center" variant="h4" component="span" gutterBottom>
        DatePicker
      </Typography>

      <Grid container justify="center" wrap="wrap">
        <MobileDatePicker id="basic-datepicker" {...sharedProps} />
        <MobileDatePicker id="clearable-datepicker" clearable {...sharedProps} />
        <DesktopDatePicker
          autoOk
          id="keyboard-mask-datepicker"
          {...sharedProps}
          inputFormat="MM/dd/yyyy"
        />
        <DesktopDatePicker
          autoOk
          id="keyboard-invalid-mask-datepicker"
          {...sharedProps}
          mask="__"
        />
        <MobileDatePicker disabled id="disabled" {...sharedProps} />
        <MobileDatePicker readOnly id="readonly" {...sharedProps} />
      </Grid>

      <Typography align="center" variant="h4" component="span" gutterBottom>
        TimePicker
      </Typography>

      <Grid container justify="center" wrap="wrap">
        <MobileTimePicker id="mobile-timepicker" value={date} onChange={changeDate} />
        <DesktopTimePicker id="desktop-timepicker" value={date} onChange={changeDate} />
      </Grid>

      <Typography align="center" variant="h4" component="span" gutterBottom>
        DateRangePicker
      </Typography>

      <DateRangePicker id="desktop-range-picker" value={range} onChange={changeRange} />
    </div>
  );
}

export default Regression;
