// @flow

import React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import { spy } from 'sinon';
import { ReactWrapper } from 'enzyme';
import { createShallow, createMount } from '../test-utils';
import Input, { InputLabel } from '../Input';
import Menu, { MenuItem } from '../Menu';
import FormHelperText from '../Form/FormHelperText';
import SelectField from './SelectField';

describe('<SelectField />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('shallow', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<SelectField />);
    });

    describe('structure', () => {
      it('should be a FormControl', () => {
        assert.strictEqual(wrapper.name(), 'withStyles(FormControl)');
        assert.strictEqual(wrapper.dive().is('FormControl'), true);
      });

      it('should pass className to the FormControl', () => {
        wrapper.setProps({ className: 'foo' });
        assert.strictEqual(wrapper.dive().hasClass('foo'), true);
      });

      it('should pass margin to the FormControl', () => {
        wrapper.setProps({ margin: 'normal' });
        assert.strictEqual(wrapper.dive().props().margin, 'normal');
      });

      it('should have an Input as the first child', () => {
        assert.strictEqual(wrapper.children().length, 2);
        assert.strictEqual(wrapper.childAt(0).is(Input), true);
      });

      it('should forward the label prop to Input', () => {
        wrapper = shallow(<SelectField defaultValue="test" />);
        assert.strictEqual(wrapper.childAt(0).props().defaultValue, 'test');
      });

      it('should pass inputClassName to the input as className', () => {
        wrapper.setProps({ inputClassName: 'foo' });
        assert.strictEqual(wrapper.find(Input).props().inputProps.className, 'foo');
      });

      it('should pass InputClassName to the Input as className', () => {
        wrapper.setProps({ InputClassName: 'foo' });
        assert.strictEqual(wrapper.find(Input).hasClass('foo'), true);
      });

      it('should have an Menu as the second child', () => {
        assert.strictEqual(wrapper.children().length, 2);
        assert.strictEqual(wrapper.childAt(1).is(Menu), true);
      });

      it('should pass menuClassName to the Menu as className', () => {
        wrapper.setProps({ menuClassName: 'foo' });
        assert.strictEqual(wrapper.find(Menu).props().className, 'foo');
      });
    });

    describe('with a label', () => {
      beforeEach(() => {
        wrapper.setProps({ label: 'Foo bar' });
      });

      it('should have 3 children', () => {
        assert.strictEqual(wrapper.children().length, 3);
      });

      it('should have an InputLabel as the first child', () => {
        assert.strictEqual(wrapper.childAt(0).is(InputLabel), true);
      });

      it('should pass labelClassName to the InputLabel as className', () => {
        wrapper.setProps({ labelClassName: 'foo' });
        assert.strictEqual(wrapper.find(InputLabel).hasClass('foo'), true);
      });

      it('should have an Input as the second child', () => {
        assert.strictEqual(wrapper.childAt(1).is(Input), true);
      });

      it('should have an Menu as the third child', () => {
        assert.strictEqual(wrapper.childAt(2).is(Menu), true);
      });

      it('should not render label', () => {
        wrapper.setProps({ value: 'foo', hideLabel: true });
        assert.strictEqual(wrapper.children().length, 2);
        assert.strictEqual(wrapper.childAt(0).is(InputLabel), false);
      });
    });

    describe('with a helper text', () => {
      beforeEach(() => {
        wrapper.setProps({ helperText: 'Foo bar' });
      });

      it('should have 3 children', () => {
        assert.strictEqual(wrapper.children().length, 3);
      });

      it('should have an FormHelperText as the second child', () => {
        assert.strictEqual(wrapper.childAt(1).is(FormHelperText), true);
      });

      it('should pass helperTextClassName to the FormHelperText as className', () => {
        wrapper.setProps({ helperTextClassName: 'foo' });
        assert.strictEqual(wrapper.find(FormHelperText).hasClass('foo'), true);
      });

      it('should have an Input as the first child', () => {
        assert.strictEqual(wrapper.childAt(0).is(Input), true);
      });

      it('should have an Menu as the third child', () => {
        assert.strictEqual(wrapper.childAt(2).is(Menu), true);
      });
    });

    describe('prop: InputProps', () => {
      it('should apply additional properties to the Input component', () => {
        wrapper.setProps({
          InputProps: {
            inputClassName: 'fullWidth',
          },
        });
        assert.strictEqual(wrapper.find(Input).props().inputClassName, 'fullWidth');
      });
    });
  });

  describe('with children', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <SelectField value="test">
          <div>None</div>
          <div value="test">Test</div>
          <div value="some">Some</div>
        </SelectField>,
      );
    });

    it('should have Menu with 3 children', () => {
      assert.strictEqual(wrapper.find(Menu).children().length, 3);
    });

    it('second Menu child should be selected', () => {
      assert.strictEqual(wrapper.find(Menu).childAt(1).props().selected, true);
    });
  });

  describe('prop: onChange', () => {
    let wrapper;
    let handleChange;

    before(() => {
      handleChange = spy();
      wrapper = mount(
        <SelectField
          label="Test"
          value=""
          onChange={handleChange}
          menuProps={{
            transitionDuration: 0,
          }}
        >
          <MenuItem value="one">One</MenuItem>
          <MenuItem value="two">Two</MenuItem>
        </SelectField>,
      );
    });

    it('should call onChange when clicking on option', () => {
      assert.strictEqual(wrapper.find('select').length, 1, 'should have only Input');
      wrapper.find('select').simulate('click');
      assert.strictEqual(wrapper.state().open, true, 'should have an open state of true');

      const portal = wrapper.find('Modal').node.mountNode.firstChild;
      const portalWrapper = new ReactWrapper(portal, portal);
      const menuItem = portalWrapper.find(MenuItem);
      menuItem.at(1).simulate('click');
      assert.strictEqual(wrapper.state().open, false, 'should have an open state of false');
      assert.strictEqual(wrapper.state().ignoreFocusOnce, true);

      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(handleChange.args[0][2], 'two', 'should have been called with value 2');
    });

    it('should set ignoreFocusOnce to false when select is focused', () => {
      assert.strictEqual(wrapper.find('select').length, 1, 'should have only Input');
      wrapper.setState({ ignoreFocusOnce: true });
      wrapper.find('select').simulate('focus');
      assert.strictEqual(wrapper.state().ignoreFocusOnce, false);
    });

    ['enter', 'space', 'up', 'down'].forEach(key => {
      it(`'should open menu when pressed ${key} key on select`, () => {
        assert.strictEqual(wrapper.find('select').length, 1, 'should have only Input');
        wrapper.find('select').simulate('keyDown', { which: keycode(key) });
        assert.strictEqual(wrapper.state().open, true, 'should have an open state of true');
        assert.strictEqual(wrapper.state().ignoreFocusOnce, false);
      });
    });

    it('should call handleRequestClose', () => {
      assert.strictEqual(wrapper.find('select').length, 1, 'should have only Input');
      wrapper.find('select').simulate('click');
      assert.strictEqual(wrapper.state().open, true, 'should have an open state of true');

      const portal = wrapper.find('Modal').node.mountNode.firstChild;
      const portalWrapper = new ReactWrapper(portal, portal);
      const backdrop = portalWrapper.find('Backdrop');

      backdrop.simulate('click');
      assert.strictEqual(wrapper.state().open, false, 'should have an open state of false');
    });

    it('should not focus select on mouseDown event', () => {
      assert.strictEqual(wrapper.find('select').length, 1, 'should have only Input');
      wrapper.find('select').simulate('mouseDown');
      const focusedElement = document.activeElement;
      assert.strictEqual(wrapper.find('select').matchesElement(focusedElement), false);
    });
  });

  describe('prop: menuProps', () => {
    it('should apply additional properties to the Menu component', () => {
      const wrapper = mount(
        <SelectField
          menuProps={{
            transitionDuration: 100,
          }}
        />,
      );
      assert.strictEqual(wrapper.find(Menu).props().transitionDuration, 100);
    });
  });
});
