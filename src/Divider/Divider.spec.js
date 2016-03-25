/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Divider from './Divider';

describe('<Divider />', () => {
  it('renders className', () => {
    const wrapper = shallow(
      <Divider
        className="test-class-name"
      />
    );

    assert.ok(wrapper.is('.test-class-name'), 'should contain the className');
  });

  it('renders inset', () => {
    const wrapper = shallow(
      <Divider
        inset={true}
      />
    );
    const cheerioDivider = wrapper.render().children();

    assert.strictEqual(cheerioDivider.css('margin-left'), '72px');
  });

  it('overwrite styles', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallow(
      <Divider
        style={style}
      />
    );

    assert.strictEqual(wrapper.prop('style').backgroundColor, 'red', 'should have red backgroundColor');
  });
});
