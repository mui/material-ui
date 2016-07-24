// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import Checkbox, { styleSheet } from './Checkbox';
import { createShallowWithContext, createMountWithContext } from 'test/utils';

describe('<Checkbox>', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallowWithContext();
    mount = createMountWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });
  after(() => mount.cleanUp());

  it('should render an IconButton', () => {
    const wrapper = shallow(
      <Checkbox />
    );
    assert.strictEqual(wrapper.is('IconButton'), true, 'should be an IconButton');
  });

  it('should render an icon and input inside the button', () => {
    const wrapper = shallow(
      <Checkbox />
    );
    assert.strictEqual(wrapper.childAt(0).is('span.material-icons'), true, 'should be a font icon');
    assert.strictEqual(wrapper.childAt(1).is('input[type="checkbox"]'), true, 'should be a checkbox input');
  });

  // className is put on the root node, this is a special case!
  it('should render with the user and root classes', () => {
    const wrapper = shallow(<Checkbox className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should spread custom props on the input node', () => {
    const wrapper = shallow(<Checkbox data-my-prop="woof" />);
    assert.strictEqual(wrapper.childAt(1).prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should set the icon to aria-hidden="true" to avoid the ligature being read by screenreaders', () => {
    const wrapper = shallow(<Checkbox />);
    assert.strictEqual(wrapper.childAt(0).prop('aria-hidden'), 'true');
  });

  it('should disable the IconButton and the input, and render the IconButton with the disabled className', () => {
    const wrapper = shallow(<Checkbox disabled />);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');
    assert.strictEqual(wrapper.prop('disabled'), true, 'should disable the root node');
    assert.strictEqual(wrapper.childAt(1).prop('disabled'), true, 'should disable the input node');
  });

  describe('controlled', () => {
    let wrapper;

    before(() => {
      wrapper = mount(<Checkbox checked={false} />);
    });

    it('should recognize a controlled input', () => {
      assert.strictEqual(wrapper.instance().isControlled, true, 'should set instance.isControlled to true');
    });

    it('should not not be checked', () => {
      assertIsNotChecked(classes, wrapper);
    });

    it('should check the checkbox', () => {
      wrapper.setProps({ checked: true });
      assertIsChecked(classes, wrapper);
    });
  });

  describe('uncontrolled', () => {
    let wrapper;

    before(() => {
      wrapper = mount(<Checkbox />);
    });

    it('should recognize an uncontrolled input', () => {
      assert.strictEqual(wrapper.instance().isControlled, false, 'should set instance.isControlled to false');
    });

    it('should not not be checked', () => {
      assertIsNotChecked(classes, wrapper);
    });

    it('should check the checkbox', () => {
      const input = wrapper.find('input');
      input.node.checked = true;
      wrapper.instance().handleChange({});
      assertIsChecked(classes, wrapper);
    });

    it('should uncheck the checkbox', () => {
      const input = wrapper.find('input');
      input.node.checked = false;
      wrapper.instance().handleChange({});
      assertIsNotChecked(classes, wrapper);
    });
  });
});

function assertIsChecked(classes, wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass(classes.checked),
    true,
    'should have the checked class on the root node'
  );
  assert.strictEqual(
    iconButton.prop('aria-checked'),
    true,
    'should pass aria-checked=true to the root node'
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.node.checked, true, 'the DOM node should be checked');

  const icon = wrapper.find('span.material-icons');
  assert.strictEqual(icon.text(), 'check_box', 'should be the check_box icon');
}

function assertIsNotChecked(classes, wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass(classes.checked),
    false,
    'should not have the checked class on the root node'
  );
  assert.strictEqual(
    iconButton.prop('aria-checked'),
    false,
    'should pass aria-checked=false to the root node'
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.node.checked, false, 'the DOM node should not be checked');

  const icon = wrapper.find('span.material-icons');
  assert.strictEqual(icon.text(), 'check_box_outline_blank', 'should be the check_box_outline_blank icon');
}
