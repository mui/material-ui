/* eslint-env mocha */
import React, {PropTypes} from 'react';
import {shallow, mount} from 'enzyme';
import {spy, useFakeTimers} from 'sinon';
import {assert} from 'chai';

import DatePicker from './DatePicker';
import getMuiTheme from '../styles/getMuiTheme';
import TextField from '../TextField';

describe('<DatePicker />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  describe('formatDate', () => {
    it('should use the default format', () => {
      const date = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const wrapper = shallowWithContext(
        <DatePicker value={date} />
      );

      assert.strictEqual(wrapper.find(TextField).props().value, '2015-12-01',
        'should format the date to ISO 8601 (YYYY-MM-DD)');
    });
  });

  describe('getDate method', () => {
    it('should select current date if no defaultDate is passed', () => {
      const now = new Date();
      const clock = useFakeTimers(now.getTime());

      const datePicker = shallowWithContext(
        <DatePicker />
      ).instance();

      assert.strictEqual(datePicker.getDate().toString(), now.toString(),
      'should set the date to the current time when defaultDate is missing');

      clock.restore();
    });

    it('should select defaultDate date if it is passed', () => {
      const defaultDate = new Date(358327500000); // Sun, 10 May 1981 09:25:00 GMT

      const datePicker = shallowWithContext(
        <DatePicker value={defaultDate} />
      ).instance();

      assert.strictEqual(datePicker.getDate().toString(), defaultDate.toString(),
      'should set the date to the defaultDate that was set');
    });
  });

  it('should call the onFocus method when TextField receives focus', () => {
    const onFocus = spy();
    const wrapper = mountWithContext(
      <DatePicker id="mock-id" onFocus={onFocus} />
    );

    wrapper.find('input').simulate('focus');
    assert.strictEqual(
      onFocus.called,
      true, 'should call DatePicker\'s onFocus method');
  });

  it('should call the onBlur method when TextField blurs', () => {
    const onBlur = spy();
    const wrapper = mountWithContext(
      <DatePicker id="mock-id" onBlur={onBlur} />
    );

    wrapper.find('input').simulate('blur');
    assert.strictEqual(
      onBlur.called,
      true, 'should call DatePicker\'s onBlur method');
  });
});
