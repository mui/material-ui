import React from 'react';
import TextField from 'TextField';
import TimePicker from 'TimePicker';
import DateTime from 'utils/dateTime';
import TestUtils from 'react-addons-test-utils';

describe('TimePicker', () => {
  it('has to give value prop precedence over defaultTime', () => {
    const initialTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
    const valueTime = DateTime.addHours(initialTime, 2);

    const render = TestUtils.renderIntoDocument(
      <TimePicker value={valueTime} format="ampm" locale="en-US"
        initialTime={initialTime}
      />
    );

    const timeTextField = TestUtils.findRenderedComponentWithType(render, TextField);

    expect(timeTextField.props.value, DateTime.formatTime(valueTime));
  });

  it('takes defaulTime prop to set first value when value prop is missing', () => {
    const initialTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT

    const render = TestUtils.renderIntoDocument(
      <TimePicker format="ampm" locale="en-US"
        defaultTime={initialTime}
      />
    );

    const timeTextField = TestUtils.findRenderedComponentWithType(render, TextField);

    expect(timeTextField.props.value, DateTime.formatTime(initialTime));
  });

  it('shows value prop if defaultTime is missing', () => {
    const initialTime = null;
    const valueTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GM

    const render = TestUtils.renderIntoDocument(
      <TimePicker value={valueTime} format="ampm" locale="en-US"
        defaultTime={initialTime}
      />
    );

    const timeTextField = TestUtils.findRenderedComponentWithType(render, TextField);

    expect(timeTextField.props.value, DateTime.formatTime(valueTime));
  });
});
