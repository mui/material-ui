import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createShallow,
  getClasses,
  createMount,
  describeConformance,
} from '@material-ui/core/test-utils';
import ListItem from '../ListItem';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import MenuItem from './MenuItem';

describe('<MenuItem />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<MenuItem />);
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<MenuItem />, () => ({
    classes,
    inheritComponent: ListItem,
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
  }));

  it('should render a button ListItem with with ripple', () => {
    const wrapper = shallow(<MenuItem />);
    assert.strictEqual(wrapper.type(), ListItem);
    assert.strictEqual(wrapper.find(ListItem).props().button, true);
    assert.strictEqual(wrapper.find(ListItem).props().disableRipple, undefined);
  });

  it('should render with the selected class', () => {
    const wrapper = shallow(<MenuItem selected />);
    assert.strictEqual(wrapper.hasClass(classes.selected), true);
  });

  it('should have a default role of menuitem', () => {
    const wrapper = shallow(<MenuItem />);
    assert.strictEqual(wrapper.props().role, 'menuitem');
  });

  it('should have a role of option', () => {
    const wrapper = shallow(<MenuItem role="option" aria-selected={false} />);
    assert.strictEqual(wrapper.props().role, 'option');
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
