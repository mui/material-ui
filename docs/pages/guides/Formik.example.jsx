import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import { Formik, Form, Field } from 'formik';
import Code from '../../_shared/Code';
import { Grid } from '@material-ui/core';

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <DatePicker
      keyboard
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
      mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
      {...other}
    />
  );
};

const FormikExample = () => {
  return (
    <Formik initialValues={{ date: new Date() }}>
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <div className="picker">
                <Field name="date" component={DatePickerField} />
              </div>
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
