/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {stub} from 'sinon';

import TimePicker from './TimePicker';
import {addHours, formatTime} from './timeUtils';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TimePicker />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('has to give value prop precedence over defaultTime', () => {
    const initialTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
    const valueTime = addHours(initialTime, 2);

    const wrapper = shallowWithContext(
      <TimePicker
        value={valueTime}
        format="ampm"
        locale="en-US"
        initialTime={initialTime}
      />
    );

    assert.strictEqual(wrapper.find('TextField').prop('value'), formatTime(valueTime));
  });

  it('takes defaulTime prop to set first value when value prop is missing', () => {
    const initialTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT

    const wrapper = shallowWithContext(
      <TimePicker format="ampm" locale="en-US" defaultTime={initialTime} />
    );

    assert.strictEqual(wrapper.find('TextField').prop('value'), formatTime(initialTime));
  });

  it('shows value prop if defaultTime is missing', () => {
    const initialTime = null;
    const valueTime = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GM

    const wrapper = shallowWithContext(
      <TimePicker
        value={valueTime}
        format="ampm"
        locale="en-US"
        defaultTime={initialTime}
      />
    );

    assert.strictEqual(wrapper.find('TextField').prop('value'), formatTime(valueTime));
  });

  describe('propTypes', () => {
    let consoleStub;

    beforeEach(() => {
      consoleStub = stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore(); // eslint-disable-line no-console
    });

    it('should throw when using wrong properties', () => {
      shallowWithContext(
        <TimePicker value="2016-03-21" />
      );
      assert.strictEqual(consoleStub.callCount, 1);
      assert.deepEqual(
        consoleStub.args[0][0].split('\n'),
        [
          'Warning: Failed prop type: Invalid prop `value` of type `string`' +
          ' supplied to `TimePicker`, expected `object`.',
          '    in TimePicker',
        ]
      );
    });

    it('should not throw when using a valid properties', () => {
      shallowWithContext(
        <TimePicker value={new Date()} />
      );
      assert.strictEqual(consoleStub.callCount, 0);
    });
  });
});
