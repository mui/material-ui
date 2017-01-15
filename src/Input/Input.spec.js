// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import Input, { styleSheet } from './Input';

describe('<Input />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <div />', () => {
    const wrapper = shallow(<Input />);
    assert.strictEqual(wrapper.is('div'), true, 'should be a <input>');
    assert.strictEqual(wrapper.hasClass(classes.wrapper), true, 'should have the wrapper class');
  });

  it('should render an <input /> inside the div', () => {
    const wrapper = shallow(<Input />);
    const input = wrapper.find('input');
    assert.strictEqual(input.is('input'), true, 'should be a <input>');
    assert.strictEqual(input.prop('type'), 'text', 'should pass the text type prop');
    assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
    assert.strictEqual(input.prop('aria-required'), undefined,
      'should not have the area-required prop');
  });

  it('should render a disabled <input />', () => {
    const wrapper = shallow(<Input disabled />);
    const input = wrapper.find('input');
    assert.strictEqual(input.is('input'), true, 'should be a <input>');
    assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
    assert.strictEqual(input.hasClass(classes.disabled), true, 'should have the disabled class');
  });

  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = shallow(<Input {...handlers} />);

    events.forEach((n) => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  describe('controlled', () => {
    let wrapper;
    let handleDirty;
    let handleClean;

    before(() => {
      handleClean = spy();
      handleDirty = spy();
      wrapper = shallow(
        <Input value="" onDirty={handleDirty} onClean={handleClean} />,
      );
    });

    it('should check that the component is controlled', () => {
      const instance = wrapper.instance();
      assert.strictEqual(instance.isControlled(), true, 'isControlled() should return true');
    });

    it('should have called the handleClean callback', () => {
      assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean cb');
    });

    it('should fire the onDirty callback when dirtied', () => {
      assert.strictEqual(handleDirty.callCount, 0, 'should not have called the onDirty cb yet');
      wrapper.setProps({ value: 'hello' });
      assert.strictEqual(handleDirty.callCount, 1, 'should have called the onDirty cb');
    });

    it('should fire the onClean callback when dirtied', () => {
      assert.strictEqual(handleClean.callCount, 1,
        'should have called the onClean cb once already');
      wrapper.setProps({ value: '' });
      assert.strictEqual(handleClean.callCount, 2, 'should have called the onClean cb again');
    });
  });

  /**
   * Note the initial callback when
   * uncontrolled only fires for a full mount
   */
  describe('uncontrolled', () => {
    let wrapper;
    let handleDirty;
    let handleClean;

    before(() => {
      handleClean = spy();
      handleDirty = spy();
      wrapper = shallow(
        <Input onDirty={handleDirty} onClean={handleClean} />,
      );

      // Mock the input ref
      wrapper.instance().input = { value: '' };
    });

    it('should check that the component is uncontrolled', () => {
      const instance = wrapper.instance();
      assert.strictEqual(instance.isControlled(), false, 'isControlled() should return false');
    });

    it('should fire the onDirty callback when dirtied', () => {
      assert.strictEqual(handleDirty.callCount, 0, 'should not have called the onDirty cb yet');
      wrapper.instance().input.value = 'hello';
      wrapper.find('input').simulate('change');
      assert.strictEqual(handleDirty.callCount, 1, 'should have called the onDirty cb');
    });

    it('should fire the onClean callback when cleaned', () => {
      // Because of shallow() this hasn't fired since there is no mounting
      assert.strictEqual(handleClean.callCount, 0, 'should not have called the onClean cb yet');
      wrapper.instance().input.value = '';
      wrapper.find('input').simulate('change');
      assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean cb');
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext({ ...wrapper.context(), muiFormControl });
    }

    beforeEach(() => {
      wrapper = shallow(<Input />);
    });

    it('should have the formControl class', () => {
      setFormControlContext({});
      assert.strictEqual(wrapper.hasClass(classes.formControl), true);
    });

    describe('callbacks', () => {
      let handleDirty;
      let handleClean;

      beforeEach(() => {
        handleDirty = spy();
        handleClean = spy();
        // Mock the input ref
        wrapper.setProps({
          onDirty: handleDirty,
          onClean: handleClean,
        });
        wrapper.instance().input = { value: '' };
        setFormControlContext({
          onDirty: spy(),
          onClean: spy(),
        });
      });

      it('should fire the onDirty muiFormControl and props callback when dirtied', () => {
        wrapper.instance().input.value = 'hello';
        wrapper.find('input').simulate('change');
        assert.strictEqual(handleDirty.callCount, 1, 'should have called the onDirty props cb');
        assert.strictEqual(
          muiFormControl.onDirty.callCount,
          1,
          'should have called the onDirty muiFormControl cb',
        );
      });

      it('should fire the onClean muiFormControl and props callback when cleaned', () => {
        wrapper.instance().input.value = '';
        wrapper.find('input').simulate('change');
        assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean props cb');
        assert.strictEqual(
          muiFormControl.onClean.callCount,
          1,
          'should have called the onClean muiFormControl cb',
        );
      });
    });

    describe('error', () => {
      beforeEach(() => {
        setFormControlContext({ error: true });
      });

      it('should have the error class', () => {
        assert.strictEqual(wrapper.hasClass(classes.error), true);
      });

      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.hasClass(classes.error), true);
        wrapper.setProps({ error: false });
        assert.strictEqual(wrapper.hasClass(classes.error), false);
        wrapper.setProps({ error: true });
        assert.strictEqual(wrapper.hasClass(classes.error), true);
      });
    });

    describe('required', () => {
      it('should have the aria-required prop with value true', () => {
        setFormControlContext({ required: true });
        const input = wrapper.find('input');
        assert.strictEqual(input.prop('aria-required'), true);
      });
    });
  });
});
