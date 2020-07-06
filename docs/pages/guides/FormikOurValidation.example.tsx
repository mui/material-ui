// @ts-nocheck
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field, FieldProps } from 'formik';
import { format, isWeekend, isWednesday } from 'date-fns';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';

interface DatePickerFieldProps extends FieldProps, DatePickerProps {
  getShouldDisableDateError: (date: Date) => string;
}

function DatePickerField({
  form,
  field: { value, name },
  maxDate = new Date('2099-12-31'),
  minDate = new Date('1900-01-01'),
  getShouldDisableDateError,
  ...other
}: DatePickerFieldProps) {
  const currentError = form.errors[name];
  const toShowError = Boolean(currentError && form.touched[name]);

  return (
    <DatePicker
      clearable
      minDate={minDate}
      maxDate={maxDate}
      value={value}
      onError={(reason, value) => {
        switch (reason) {
          case 'invalidDate':
            form.setFieldError(name, 'Invalid date format');
            break;

          case 'disablePast':
            form.setFieldError(name, 'Values in the past are not allowed');
            break;

          case 'maxDate':
            form.setFieldError(name, `Date should not be after ${format(maxDate, 'P')}`);
            break;

          case 'minDate':
            form.setFieldError(name, `Date should not be before ${format(minDate, 'P')}`);
            break;

          case 'shouldDisableDate':
            // shouldDisableDate returned true, render custom message according to the `shouldDisableDate` logic
            form.setFieldError(name, getShouldDisableDateError(value));
            break;

          default:
            form.setErrors({
              ...form.errors,
              [name]: undefined,
            });
        }
      }}
      // Make sure that your 3d param is set to `false` on order to not clear errors
      onChange={date => form.setFieldValue(name, date, false)}
      renderInput={props => (
        <TextField
          {...props}
          name={name}
          error={toShowError}
          helperText={toShowError ? currentError ?? props.helperText : undefined}
          // Make sure that your 3d param is set to `false` on order to not clear errors
          onBlur={() => form.setFieldTouched(name, true, false)}
        />
      )}
      {...other}
    />
  );
}

function validateDatePickerValue(date: Date) {
  if (isWeekend(date)) {
    return 'Weekends are not allowed';
  }

  if (isWednesday(date)) {
    return 'Wednesdays are not allowed';
  }

  return null;
}

export default function FormikExample() {
  return (
    <Formik onSubmit={console.log} initialValues={{ date: new Date() }}>
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field
                name="date"
                disablePast
                component={DatePickerField}
                shouldDisableDate={(date: Date) => validateDatePickerValue(date) !== null}
                getShouldDisableDateError={validateDatePickerValue}
              />
            </Grid>

            <Grid item xs={12} sm={12} style={{ margin: '24px' }}>
              <pre>
                <code>{JSON.stringify({ errors, values }, null, 2)}</code>
              </pre>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
