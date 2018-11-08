import React from 'react';
import { assert } from 'chai';
import classNames from 'classnames';
import { createShallow, createMount, getClasses } from '../test-utils';
import SwitchBase from '../internal/SwitchBase';
import Switch from './Switch';

describe('<Switch />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ untilSelector: 'span' });
    classes = getClasses(<Switch />);
  });

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  describe('default Switch export', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Switch className="foo" />);
    });

    it('should render a span with the root and user classes', () => {
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('foo'), true);
    });

    it('should render SwitchBase with a custom span icon with the icon class', () => {
      const switchBase = wrapper.childAt(0);
      assert.strictEqual(switchBase.type(), SwitchBase);
      assert.strictEqual(switchBase.props().icon.type, 'span');
      assert.strictEqual(switchBase.props().icon.props.className, classes.icon);
      assert.strictEqual(switchBase.props().checkedIcon.type, 'span');
      assert.strictEqual(
        switchBase.props().checkedIcon.props.className,
        classNames(classes.icon, classes.iconChecked),
      );
    });

    it('should render the bar as the 2nd child', () => {
      const bar = wrapper.childAt(1);
      assert.strictEqual(bar.name(), 'span');
      assert.strictEqual(bar.hasClass(classes.bar), true);
    });
  });

  it('should have the switch role', () => {
    const wrapper = mount(<Switch />);
    assert.strictEqual(wrapper.find('span[role="switch"]').exists(), true);
  });

  it('should have the correct aria-checked attribute', () => {
    const wrapper = mount(<Switch checked={false} />);
    assert.equal(wrapper.find('span[role="switch"]').props()['aria-checked'], false);

    wrapper.setProps({ checked: true });
    assert.equal(wrapper.find('span[role="switch"]').props()['aria-checked'], true);
  });
});
