import React from 'react';
import Code from '../../_shared/Code';
import { Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from 'material-ui-pickers';

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <DatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
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
