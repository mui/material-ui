// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow } from 'src/test-utils';
import MenuItem, { styleSheet } from './MenuItem';

describe('<MenuItem />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a button ListItem with no ripple', () => {
    const wrapper = shallow(
      <MenuItem />,
    );
    assert.strictEqual(wrapper.name(), 'withStyles(ListItem)');
    assert.strictEqual(wrapper.props().button, true, 'should have the button prop');
    assert.strictEqual(wrapper.props().ripple, false, 'should not have a ripple');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<MenuItem className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
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
    assert.strictEqual(wrapper.props().tabIndex, '-1', 'should have a -1 tabIndex');
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

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { persist: () => {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('props: component', () => {
    it('should be able to override the rendered component', () => {
      const wrapper = shallow(<MenuItem component="a" />);

      assert.strictEqual(wrapper.props().component, 'a');
      assert.strictEqual(wrapper.props().ripple, undefined);
    });
  });
});
