import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
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

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const wrapper = mount(<Checkbox indeterminate />);
      assert.strictEqual(wrapper.find(IndeterminateCheckBoxIcon).length, 1);
    });

    it('should set input indeterminate status', () => {
      const wrapper = mount(<Checkbox indeterminate />);
      assert.strictEqual(wrapper.find('input').getDOMNode().indeterminate, true);
    });

    it('should change input indeterminate status on props change', () => {
      const wrapper = mount(<Checkbox indeterminate />);
      wrapper.setProps({ indeterminate: false });
      assert.strictEqual(wrapper.find('input').getDOMNode().indeterminate, false);
    });

    it('should invert checked if it got determined', () => {
      const testCombination = (checked, indeterminate) => {
        const onChange = spy();
        const wrapper = mount(
          <Checkbox checked={checked} indeterminate={indeterminate} onChange={onChange} />,
        );

        // W3C recommended behavior
        // https://www.w3.org/TR/2014/WD-html51-20140617/forms.html#checkbox-state-(type=checkbox)
        // wrapper.simulate('click', { target: { checked: !checked, indeterminate: false } });

        // Edge behavior
        wrapper.simulate('click', { target: { checked, indeterminate: false } });
        assert.strictEqual(onChange.args[0][1], !checked);
      };

      testCombination(false, true);
      testCombination(true, true);
    });
  });
});
