import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ListItem from '../ListItem';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import MenuItem from './MenuItem';

describe('<MenuItem />', () => {
  let shallow;
  let classes;
  const mount = createMount();

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<MenuItem />);
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
    expect(wrapper.type()).to.equal(ListItem);
    expect(wrapper.find(ListItem).props().button).to.equal(true);
    expect(wrapper.find(ListItem).props().disableRipple).to.equal(undefined);
  });

  it('should render with the selected class', () => {
    const wrapper = shallow(<MenuItem selected />);
    expect(wrapper.hasClass(classes.selected)).to.equal(true);
  });

  it('should have a default role of menuitem', () => {
    const wrapper = shallow(<MenuItem />);
    expect(wrapper.props().role).to.equal('menuitem');
  });

  it('should have a role of option', () => {
    const wrapper = shallow(<MenuItem role="option" aria-selected={false} />);
    expect(wrapper.props().role).to.equal('option');
  });

  it('should have a tabIndex of -1 by default', () => {
    const wrapper = shallow(<MenuItem />);
    expect(wrapper.props().tabIndex).to.equal(-1);
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
        expect(handlers[n].callCount).to.equal(1);
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
      expect(wrapper1.find('li').length).to.equal(1);
      const wrapper2 = mount(
        <MenuItem button={false}>
          <ListItemSecondaryAction>
            <div />
          </ListItemSecondaryAction>
        </MenuItem>,
      );
      expect(wrapper2.find('li').length).to.equal(1);
    });
  });

  describe('prop: ListItemClasses', () => {
    it('should be able to change the style of ListItem', () => {
      const wrapper = mount(<MenuItem ListItemClasses={{ disabled: 'bar' }} />);
      expect(wrapper.find(ListItem).props().classes.disabled).to.equal('bar');
    });
  });
});
