import React from 'react';
import Code from '../../_shared/Code';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

const DateField = props => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = date => {
    Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
  };

  return (
    <DatePicker
      {...inputProps}
      {...others}
      inputFormat="dd/MM/yyyy"
      value={value ? new Date(value) : null}
      disabled={submitting}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      error={error && touched}
      onChange={onChange}
    />
  );
};

const ReduxFormExample = props => {
  const formValues = {
    isFormValid: props.valid,
    values: {
      date: props.date,
    },
  };

  const submit = values => {
    alert(JSON.stringify(values));
  };

  return (
    // only calls the submit if form is valid
    <form onSubmit={props.handleSubmit(submit)}>
      <Grid container>
        <Grid item container justify="center" xs={12}>
          <Field name="date" component={DateField} />
        </Grid>
        <Grid item xs={12} sm={12} style={{ margin: '24px' }}>
          <Code children={JSON.stringify(formValues, null, 2)} />
        </Grid>
      </Grid>
    </form>
  );
};

const selector = formValueSelector('example');

const mapStateToProps = state => ({
  date: selector(state, 'date'),
  initialValues: {
    date: new Date().toISOString(),
  },
});

const createReduxForm = reduxForm({ form: 'example' });
const Form = connect(mapStateToProps)(createReduxForm(ReduxFormExample));

const rootReducer = combineReducers({
  form: formReducer,
  // Others reducers
});

const store = createStore(rootReducer);

const App = () => (
  <ReduxProvider store={store}>
    <Form />
  </ReduxProvider>
);

export default App;
