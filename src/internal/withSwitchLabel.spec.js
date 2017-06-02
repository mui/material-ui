// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow } from '../test-utils';
import withSwitchLabel, { styleSheet } from './withSwitchLabel';

describe('withSwitchLabel', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('exports.withSwitchLabel', () => {
    it('should be a function', () => {
      assert.strictEqual(typeof withSwitchLabel, 'function');
    });

    it('should return a SwitchLabel component with a wrapped displayName', () => {
      const SwitchLabel = withSwitchLabel({ displayName: 'Foo' });
      assert.strictEqual(SwitchLabel.displayName, 'withStyles(withSwitchLabel(Foo))');

      /* eslint-disable prefer-arrow-callback */
      const SwitchLabelFn = withSwitchLabel(function Foo() {});
      /* eslint-enable prefer-arrow-callback */
      assert.strictEqual(SwitchLabelFn.displayName, 'withStyles(withSwitchLabel(Foo))');
    });
  });

  describe('SwitchLabelFoo', () => {
    let SwitchLabelFoo;
    let wrapper;

    beforeEach(() => {
      class Foo {}
      SwitchLabelFoo = withSwitchLabel(Foo);
      wrapper = shallow(<SwitchLabelFoo label="Pizza" labelClassName="foo" />);
    });

    it('should have the correct displayName', () => {
      assert.strictEqual(SwitchLabelFoo.displayName, 'withStyles(withSwitchLabel(Foo))');
    });

    it('should render a label', () => {
      assert.strictEqual(wrapper.name(), 'label');
    });

    it('should render the label text inside an additional span', () => {
      const span = wrapper.childAt(1);
      assert.strictEqual(span.is('span'), true, 'should render a span');
      assert.strictEqual(span.childAt(0).node, 'Pizza', 'should be the label text');
    });

    it('should render with the default and custom classes', () => {
      assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
    });

    it('should render the switch element and no label if no label is provided', () => {
      wrapper.setProps({ label: null });
      assert.strictEqual(wrapper.name(), 'Foo');
    });

    describe('imperative methods', () => {
      it('should forward the focus method to the base component stored on switch', () => {
        const focusSpy = spy();
        wrapper.instance().switch = {
          focus: focusSpy,
        };
        wrapper.instance().focus();
        assert.strictEqual(focusSpy.callCount, 1);
      });
    });

    describe('prop: disabled', () => {
      it('should disable the component', () => {
        wrapper.setProps({
          disabled: true,
        });

        assert.strictEqual(
          wrapper.hasClass(classes.disabled),
          true,
          'should have the disabled class',
        );
      });
    });
  });
});
