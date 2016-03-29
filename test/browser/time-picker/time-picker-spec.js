import React from 'react';
import TextField from 'TextField';
import TimePicker from 'TimePicker';
import {addHours, formatTime} from 'TimePicker/timeUtils';
import TestUtils from 'react-addons-test-utils';
import injectTheme from '../fixtures/inject-theme';

describe('TimePicker', () => {
  let ThemedTimePicker;

  beforeEach(() => {
    ThemedTimePicker = injectTheme(TimePicker);
  });

  it('has to give value prop precedence over defaultTime', () => {
    const initialTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
    const valueTime = addHours(initialTime, 2);

    const render = TestUtils.renderIntoDocument(
      <ThemedTimePicker
        value={valueTime}
        format="ampm"
        locale="en-US"
        initialTime={initialTime}
      />
    );

    const timeTextField = TestUtils.findRenderedComponentWithType(render, TextField);

    expect(timeTextField.props.value, formatTime(valueTime));
  });

  it('takes defaulTime prop to set first value when value prop is missing', () => {
    const initialTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT

    const render = TestUtils.renderIntoDocument(
      <ThemedTimePicker format="ampm" locale="en-US" defaultTime={initialTime} />
    );

    const timeTextField = TestUtils.findRenderedComponentWithType(render, TextField);

    expect(timeTextField.props.value, formatTime(initialTime));
  });

  it('shows value prop if defaultTime is missing', () => {
    const initialTime = null;
    const valueTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GM

    const render = TestUtils.renderIntoDocument(
      <ThemedTimePicker
        value={valueTime}
        format="ampm"
        locale="en-US"
        defaultTime={initialTime}
      />
    );

    const timeTextField = TestUtils.findRenderedComponentWithType(render, TextField);

    expect(timeTextField.props.value, formatTime(valueTime));
  });
});
