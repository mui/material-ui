import React from 'react';
import { assert } from 'chai';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import { createShallow, getClasses, createMount } from '../test-utils';
import SwitchBase from '../internal/SwitchBase';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Checkbox />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should have the classes required for Checkbox', () => {
    assert.strictEqual(typeof classes.root, 'string');
    assert.strictEqual(typeof classes.checked, 'string');
    assert.strictEqual(typeof classes.disabled, 'string');
  });

  it('should render a div with a SwitchBase', () => {
    const wrapper = shallow(<Checkbox />);
    assert.strictEqual(wrapper.type(), SwitchBase);
  });

  it('should mount without issue', () => {
    mount(<Checkbox checked />);
  });

  it('should have the checkbox role', () => {
    const wrapper = mount(<Checkbox />);
    assert.strictEqual(wrapper.find('span[role="checkbox"]').exists(), true);
  });

  it('should have the correct aria-checked attribute', () => {
    const wrapper = mount(<Checkbox checked={false} />);
    assert.equal(wrapper.find('span[role="checkbox"]').props()['aria-checked'], false);

    wrapper.setProps({ checked: true });
    assert.equal(wrapper.find('span[role="checkbox"]').props()['aria-checked'], true);
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const wrapper = mount(<Checkbox indeterminate />);
      assert.strictEqual(wrapper.find(IndeterminateCheckBoxIcon).length, 1);
    });
  });
});
