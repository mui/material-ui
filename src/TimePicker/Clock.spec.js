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

  it('should render <ClockHours> before and <ClockMinutes> after', () => {
    const wrapper = shallow(<Clock format="24hr" initialTime={initialTime} />);
    const clockhourWrapper = wrapper.find(ClockHours);
    assert.strictEqual(clockhourWrapper.prop('format'), '24hr',
      'ClockHours format prop should be 24hr');
    assert.strictEqual(clockhourWrapper.prop('initialHours'), initialTime.getHours(),
      'initialHours should be the same as initialTime hours');
    wrapper.setState({ mode: 'minute' });
    assert.strictEqual(wrapper.find(ClockMinutes).prop('initialMinutes'), initialTime.getMinutes(),
      'initialMinutes should be the same as initialTime minute');
  });
});
