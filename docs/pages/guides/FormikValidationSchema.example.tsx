// @ts-nocheck
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { date, object } from 'yup';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, Field, FieldProps } from 'formik';
import { DatePicker, BaseDatePickerProps } from '@material-ui/pickers';

interface DatePickerFieldProps extends FieldProps, BaseDatePickerProps {
  getShouldDisableDateError: (date: Date) => string;
}

function DatePickerField({
  field,
  form,
  maxDate = new Date('2099-12-31'),
  minDate = new Date('1900-01-01'),
  getShouldDisableDateError,
  ...other
}: DatePickerFieldProps) {
  const currentError = form.errors[field.name];

  return (
    <DatePicker
      clearable
      minDate={minDate}
      maxDate={maxDate}
      value={field.value}
      // Make sure that your 3d param is set to `true` in order to run validation
      onChange={date => form.setFieldValue(field.name, date, true)}
      renderInput={props => (
        <TextField
          name={field.name}
          {...props}
          error={Boolean(currentError)}
          helperText={currentError ?? props.helperText}
          // Make sure that your 3d param is set to `true` in order to run validation
          onBlur={() => form.setFieldTouched(name, true, true)}
        />
      )}
      {...other}
    />
  );
}

const schema = object({
  date: date()
    .required()
    .min(new Date())
    .max(new Date('2100-10-10')),
});

export default function FormikValidationSchemaExample() {
  return (
    <Formik validationSchema={schema} onSubmit={console.log} initialValues={{ date: new Date() }}>
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field name="date" disablePast component={DatePickerField} />
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
