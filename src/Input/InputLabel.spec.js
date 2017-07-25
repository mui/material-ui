// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import InputLabel, { styleSheet } from './InputLabel';

describe('<InputLabel />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a FormLabel', () => {
    const wrapper = shallow(<InputLabel>Foo</InputLabel>);
    assert.strictEqual(wrapper.name(), 'withStyles(FormLabel)');
    assert.strictEqual(wrapper.childAt(0).node, 'Foo');
  });

  it('should have the root and animated classes by default', () => {
    const wrapper = shallow(<InputLabel>Foo</InputLabel>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.animated), true);
  });

  it('should not have the animated class when disabled', () => {
    const wrapper = shallow(<InputLabel disableAnimation>Foo</InputLabel>);
    assert.strictEqual(wrapper.hasClass(classes.animated), false);
  });

  it('should have the disabled class when disabled', () => {
    const wrapper = shallow(<InputLabel disabled>Foo</InputLabel>);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true);
  });

  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext({ ...wrapper.context(), muiFormControl });
    }

    beforeEach(() => {
      wrapper = shallow(<InputLabel />);
    });

    it('should have the formControl class', () => {
      setFormControlContext({});
      assert.strictEqual(wrapper.hasClass(classes.formControl), true);
    });
    ['dirty', 'focused'].forEach(state => {
      describe(state, () => {
        beforeEach(() => {
          setFormControlContext({ [state]: true });
        });

        it('should have the shrink class', () => {
          assert.strictEqual(wrapper.hasClass(classes.shrink), true);
        });

        it('should be overridden by the shrink prop', () => {
          assert.strictEqual(wrapper.hasClass(classes.shrink), true);
          wrapper.setProps({ shrink: false });
          assert.strictEqual(wrapper.hasClass(classes.shrink), false);
          wrapper.setProps({ shrink: true });
          assert.strictEqual(wrapper.hasClass(classes.shrink), true);
        });
      });
    });
  });
});
