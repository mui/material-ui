/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Divider from './Divider';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Divider />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('renders className', () => {
    const wrapper = shallowWithContext(
      <Divider
        className="test-class-name"
      />
    );

    assert.ok(wrapper.is('.test-class-name'), 'should contain the className');
  });

  it('renders inset', () => {
    const wrapper = shallowWithContext(
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
    const wrapper = shallowWithContext(
      <Divider
        style={style}
      />
    );

    assert.strictEqual(wrapper.prop('style').backgroundColor, 'red', 'should have red backgroundColor');
  });
});
