/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import {assert} from 'chai';
import Checkbox from './Checkbox';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Checkbox />', () => {
  /* eslint-disable max-len */
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  it('should display checkmark when checked by default', () => {
    const wrapper = shallowWithContext(
      <Checkbox defaultChecked={true} />
    );

    const enhancedSwitch = wrapper.find('EnhancedSwitch');
    const svgs = wrapper.prop('switchElement').props.children;
    const checkMarkNode = shallow(svgs[1]);

    assert.ok(enhancedSwitch.prop('switched'));
    assert.ok(checkMarkNode.is('ToggleCheckBox'));
    assert.strictEqual(checkMarkNode.props().style.opacity, 1);
  });


  it('should NOT display checkmark when not checked by default', () => {
    const wrapper = shallowWithContext(
      <Checkbox defaultChecked={false} />
    );

    const enhancedSwitch = wrapper.find('EnhancedSwitch');
    const svgs = wrapper.prop('switchElement').props.children;
    const checkMarkNode = shallow(svgs[1]);

    assert.notOk(enhancedSwitch.prop('switched'));
    assert.ok(checkMarkNode.is('ToggleCheckBox'));
    assert.strictEqual(checkMarkNode.props().style.opacity, 0);
  });


  describe('when initially unchecked', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountWithContext(
        <Checkbox defaultChecked={false} />
      );
    });

    it('should display checkmark when clicked once', () => {
      const input = wrapper.find('input');
      input.node.checked = !input.node.checked;
      input.simulate('change');
      const enhancedSwitch = wrapper.find('EnhancedSwitch');
      assert.ok(enhancedSwitch.prop('switched'));
    });


    it('should NOT display checkmark when clicked twice', () => {
      const input = wrapper.find('input');
      input.node.checked = !input.node.checked;
      input.simulate('change');
      input.node.checked = !input.node.checked;
      input.simulate('change');
      const enhancedSwitch = wrapper.find('EnhancedSwitch');
      assert.notOk(enhancedSwitch.prop('switched'));
    });
  });
});
