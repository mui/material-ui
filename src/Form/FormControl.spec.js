// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import FormControl, { styleSheet } from './FormControl';

describe('<FormControl />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div with the root and user classes', () => {
    const wrapper = shallow(
      <FormControl className="woof" />,
    );

    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woof'), true);
  });

  it('should have the focused class', () => {
    const wrapper = shallow(
      <FormControl className="woof" />,
    );

    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woof'), true);
  });

  describe('initial state', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<FormControl />);
    });

    it('should not be dirty initially', () => {
      assert.strictEqual(wrapper.state().dirty, false);
    });

    it('should not be focused initially', () => {
      assert.strictEqual(wrapper.state().focused, false);
    });
  });

  describe('muiFormControl child context', () => {
    let wrapper;
    let muiFormControlContext;

    function loadChildContext() {
      muiFormControlContext = wrapper.instance().getChildContext().muiFormControl;
    }

    beforeEach(() => {
      wrapper = shallow(<FormControl />);
      loadChildContext();
    });

    describe('from state', () => {
      it('should have the dirty state from the instance', () => {
        assert.strictEqual(muiFormControlContext.dirty, false);
        wrapper.setState({ dirty: true });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.dirty, true);
      });

      it('should have the focused state from the instance', () => {
        assert.strictEqual(muiFormControlContext.focused, false);
        wrapper.setState({ focused: true });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.focused, true);
      });
    });

    describe('from props', () => {
      it('should have the required prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.required, false);
        wrapper.setProps({ required: true });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.required, true);
      });

      it('should have the error prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.error, false);
        wrapper.setProps({ error: true });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.error, true);
      });
    });

    describe('callbacks', () => {
      describe('onDirty', () => {
        it('should set the dirty state', () => {
          assert.strictEqual(muiFormControlContext.dirty, false);
          muiFormControlContext.onDirty();
          loadChildContext();
          assert.strictEqual(muiFormControlContext.dirty, true);
          muiFormControlContext.onDirty();
          assert.strictEqual(muiFormControlContext.dirty, true);
        });
      });

      describe('onClean', () => {
        it('should clean the dirty state', () => {
          muiFormControlContext.onDirty();
          loadChildContext();
          assert.strictEqual(muiFormControlContext.dirty, true);
          muiFormControlContext.onClean();
          loadChildContext();
          assert.strictEqual(muiFormControlContext.dirty, false);
          muiFormControlContext.onClean();
          assert.strictEqual(muiFormControlContext.dirty, false);
        });
      });

      describe('handleFocus', () => {
        it('should set the focused state', () => {
          assert.strictEqual(wrapper.state('focused'), false);
          muiFormControlContext.onFocus();
          assert.strictEqual(wrapper.state('focused'), true);
          muiFormControlContext.onFocus();
          assert.strictEqual(wrapper.state('focused'), true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          assert.strictEqual(wrapper.state('focused'), false);
          muiFormControlContext.onFocus();
          assert.strictEqual(wrapper.state('focused'), true);
          muiFormControlContext.onBlur();
          assert.strictEqual(wrapper.state('focused'), false);
          muiFormControlContext.onBlur();
          assert.strictEqual(wrapper.state('focused'), false);
        });
      });
    });
  });
});
