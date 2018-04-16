import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses, createMount } from '../test-utils';
import ListItem from '../List/ListItem';
import ListItemSecondaryAction from '../List/ListItemSecondaryAction';
import MenuItem from './MenuItem';

describe('<MenuItem />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<MenuItem />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a button ListItem with with ripple', () => {
    const wrapper = shallow(<MenuItem />);
    assert.strictEqual(wrapper.type(), ListItem);
    assert.strictEqual(wrapper.props().button, true, 'should have the button prop');
    assert.strictEqual(wrapper.props().disableRipple, undefined, 'should have a ripple');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<MenuItem className="woofMenuItem" />);
    assert.strictEqual(wrapper.hasClass('woofMenuItem'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the selected class', () => {
    const wrapper = shallow(<MenuItem selected />);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
  });

  it('should have a default role of menuitem', () => {
    const wrapper = shallow(<MenuItem />);
    assert.strictEqual(wrapper.props().role, 'menuitem', 'should have the menuitem role');
  });

  it('should have a role of option', () => {
    const wrapper = shallow(<MenuItem role="option" aria-selected={false} />);
    assert.strictEqual(wrapper.props().role, 'option', 'should have the option role');
  });

  it('should have a tabIndex of -1 by default', () => {
    const wrapper = shallow(<MenuItem />);
    assert.strictEqual(wrapper.props().tabIndex, -1);
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = [
        'onClick',
        'onFocus',
        'onBlur',
        'onKeyUp',
        'onKeyDown',
        'onMouseDown',
        'onMouseLeave',
        'onMouseUp',
        'onTouchEnd',
        'onTouchStart',
      ];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<MenuItem {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { persist: () => {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('prop: component', () => {
    it('should be able to override the rendered component', () => {
      const wrapper = shallow(<MenuItem component="a" />);

      assert.strictEqual(wrapper.props().component, 'a');
      assert.strictEqual(wrapper.props().disableRipple, undefined);
    });
  });

  describe('mount', () => {
    it('should not fail with a li > li error message', () => {
      const wrapper1 = mount(
        <MenuItem>
          <ListItemSecondaryAction>
            <div />
          </ListItemSecondaryAction>
        </MenuItem>,
      );
      assert.strictEqual(wrapper1.find('li').length, 1);
      const wrapper2 = mount(
        <MenuItem button={false}>
          <ListItemSecondaryAction>
            <div />
          </ListItemSecondaryAction>
        </MenuItem>,
      );
      assert.strictEqual(wrapper2.find('li').length, 1);
    });
  });
});
