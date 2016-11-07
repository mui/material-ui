/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import getMuiTheme from '../styles/getMuiTheme';
import ClockMinutes from './ClockMinutes';

describe('<ClockMinutes />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('at touchEnd as to call onChange once and return the second arg as true', () => {
    const onChange = sinon.spy();
    const wrapper = shallowWithContext(
      <ClockMinutes onChange={onChange} />
    );

    wrapper.instance().center = {x: 100, y: 100};
    wrapper.instance().basePoint = {x: 100, y: 0};
    const simComp = wrapper.find('div').at(1);

    simComp.simulate('touchEnd', {preventDefault() {}, type: 'touchend', changedTouches: [{offsetX: 50, offsetY: 70}]});
    expect(onChange.calledOnce).to.equal(true);
    expect(onChange.calledTwice).to.equal(false);
    expect(onChange.args[0][1]).to.equal(true);
    simComp.simulate('mouseUp', {preventDefault() {}, type: 'mouseUp', nativeEvent: {offsetX: 50, offsetY: 70}});
    expect(onChange.calledOnce).to.equal(false);
    expect(onChange.calledTwice).to.equal(true);
    expect(onChange.args[0][1]).to.equal(true);
  });
});
