// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Switch, { styleSheet } from './Switch';
import LabelSwitch from './LabelSwitch';

describe('<Switch />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.default, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  describe('default Switch export', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Switch className="foo" />);
    });

    it('should render a div with the root and user classes', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('foo'), true);
    });

    it('should render SwitchBase with a custom div icon with the icon class', () => {
      const switchBase = wrapper.childAt(0);

      assert.strictEqual(switchBase.is('SwitchBase'), true);
      assert.strictEqual(switchBase.props().icon.type, 'div');
      assert.strictEqual(switchBase.props().icon.props.className, classes.icon);
    });

    it('should render the bar as the 2nd child', () => {
      const bar = wrapper.childAt(1);

      assert.strictEqual(bar.is('div'), true);
      assert.strictEqual(bar.hasClass(classes.bar), true);
    });
  });

  describe('named LabelSwitch export', () => {
    it('should be Switch wrapped with SwitchLabel', () => {
      assert.strictEqual(LabelSwitch.name, 'Style');
      assert.strictEqual(LabelSwitch.displayName, 'withStyles(LabelwithStyles(Switch))');
    });
  });
});
