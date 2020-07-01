import React, { useState, useContext } from 'react';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import { Grid, Typography } from '@material-ui/core';
import { TextField, TextFieldProps } from '@material-ui/core';
import { createRegressionDay as createRegressionDayRenderer } from './RegressionDay';
import { MuiPickersContext, DateRangePicker, DateRangeDelimiter } from '@material-ui/pickers';
import {
  MobileDatePicker,
  DesktopDatePicker,
  MobileTimePicker,
  DesktopTimePicker,
} from '@material-ui/pickers';

const makeRenderInputProp = (overrideProps: Omit<Partial<TextFieldProps>, 'variant'>) => ({
  renderInput: (props: TextFieldProps) => <TextField {...props} {...overrideProps} />,
});

function Regression() {
  const utils = useContext(MuiPickersContext);
  const [range, changeRange] = useState<any>([new Date('2019-01-01T00:00:00.000'), null]);
  const [date, changeDate] = useState<any>(new Date('2019-01-01T00:00:00.000'));

  const sharedProps = {
    value: date,
    onChange: (date: any) => changeDate(date),
    style: { margin: '0 10px' },
    leftArrowIcon: <LeftArrowIcon data-arrow="left" />,
    rightArrowIcon: <RightArrowIcon data-arrow="right" />,
    renderDay: createRegressionDayRenderer(utils!),
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
        <MobileDatePicker {...makeRenderInputProp({ id: 'basic-datepicker' })} {...sharedProps} />
        <MobileDatePicker
          {...makeRenderInputProp({ id: 'clearable-datepicker' })}
          clearable
          {...sharedProps}
        />
        <DesktopDatePicker
          autoOk
          {...makeRenderInputProp({ id: 'keyboard-mask-datepicker' })}
          {...sharedProps}
          inputFormat="MM/dd/yyyy"
        />
        <DesktopDatePicker
          autoOk
          {...makeRenderInputProp({ id: 'keyboard-invalid-mask-datepicker' })}
          {...sharedProps}
          mask="__"
        />
        <MobileDatePicker disabled {...makeRenderInputProp({ id: 'disabled' })} {...sharedProps} />
        <MobileDatePicker readOnly {...makeRenderInputProp({ id: 'readonly' })} {...sharedProps} />
      </Grid>

      <Typography align="center" variant="h4" component="span" gutterBottom>
        TimePicker
      </Typography>

      <Grid container justify="center" wrap="wrap">
        <MobileTimePicker
          {...makeRenderInputProp({ id: 'mobile-timepicker' })}
          value={date}
          onChange={changeDate}
        />
        <DesktopTimePicker
          {...makeRenderInputProp({ id: 'desktop-timepicker' })}
          value={date}
          onChange={changeDate}
        />
      </Grid>

      <Typography align="center" variant="h4" component="span" gutterBottom>
        DateRangePicker
      </Typography>

      <DateRangePicker
        value={range}
        onChange={changeRange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField
              {...startProps}
              inputProps={{ ...startProps.inputProps, 'data-mui-test': 'desktop-range-picker' }}
            />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField
              {...endProps}
              inputProps={{ ...endProps.inputProps, 'data-mui-test': 'desktop-range-picker-end' }}
            />
          </React.Fragment>
        )}
      />
    </div>
  );
}

export default Regression;
