import React from 'react';
import Code from '../../_shared/Code';
import { Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <DatePicker
      clearable
      disablePast
      value={field.value}
      onError={error => {
        // handle as a side effect
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={date => form.setFieldValue(field.name, date, false)}
      renderInput={props => (
        <TextField
          name={field.name}
          {...props}
          error={Boolean(currentError)}
          helperText={currentError ?? props.helperText}
        />
      )}
      {...other}
    />
  );
};

const FormikExample = () => {
  return (
    <Formik onSubmit={console.log} initialValues={{ date: new Date() }}>
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field name="date" component={DatePickerField} />
            </Grid>

            <Grid item xs={12} sm={12} style={{ margin: '24px' }}>
              <Code children={JSON.stringify({ errors, values }, null, 2)} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default FormikExample;
