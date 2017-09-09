// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Clock, { styleSheet } from './Clock';
import ClockHours from './ClockHours';
import ClockMinutes from './ClockMinutes';

describe('<Clock>', () => {
  let shallow;
  let classes;
  let initialTime;
  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
    initialTime = new Date('2016-11-14T18:01:54.328Z');
  });

  it('should render a <Clock>', () => {
    const wrapper = shallow(<Clock className="passedByProps" />);
    assert.strictEqual(wrapper.hasClass(classes.clock), true, 'should have the clock class');
    assert.strictEqual(wrapper.hasClass('passedByProps'), true, 'should have the "user" defined class');
  });

  it('should get an affix', () => {
    const initTime = new Date();
    initTime.setHours(13);
    const wrapper = shallow(<Clock format="ampm" initialTime={initTime} />);
    assert.strictEqual(wrapper.instance().getAffix(), 'pm', 'the affix should be pm');
    const selectedTime = new Date();
    selectedTime.setHours(1);
    wrapper.setState({ selectedTime });
    assert.strictEqual(wrapper.instance().getAffix(), 'am', 'the affix should be am');
  });

  it('should render <ClockHours> before and <ClockMinutes> after', () => {
    const wrapper = shallow(<Clock format="24hr" initialTime={initialTime} />);
    const clockhourWrapper = wrapper.find(ClockHours);
    assert.strictEqual(clockhourWrapper.prop('format'), '24hr',
      'ClockHours format prop should be 24hr');
    assert.strictEqual(clockhourWrapper.prop('initialHours'), initialTime.getHours(),
      'initialHours should be the same as initialTime hours');
    wrapper.instance().setMode('minute');
    setTimeout(() => {
      assert.strictEqual(wrapper.find(ClockMinutes).prop('initialMinutes'), initialTime.getMinutes(),
      'initialMinutes should be the same as initialTime minute');
    }, 200);
  });

  it('affix test', () => {
    const selectedTime = new Date();
    selectedTime.setHours(11);
    const wrapper = shallow(<Clock initialTime={selectedTime} />);
    wrapper.instance().handleSelectAffix('pm');
    assert.strictEqual(wrapper.state('selectedTime').getHours(), 23,
      'should change from 11 to 23 the selectedTime');
    assert.strictEqual(wrapper.instance().handleSelectAffix('am'), undefined,
      'should return without anything');
  });
});
