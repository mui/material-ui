import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createShallow,
  createMount,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import ButtonBase from '../ButtonBase';
import ExpansionPanel from '../ExpansionPanel';
import ExpansionPanelSummary from './ExpansionPanelSummary';

describe.only('<ExpansionPanelSummary />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<ExpansionPanelSummary />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<ExpansionPanelSummary />);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ExpansionPanelSummary className="woofExpansionPanelSummary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofExpansionPanelSummary'), true);
  });

  it('should render with the content', () => {
    const wrapper = shallow(<ExpansionPanelSummary />);
    const itemsWrap = wrapper.childAt(0);
    assert.strictEqual(itemsWrap.hasClass(classes.content), true);
  });

  it('when disabled should have disabled class', () => {
    const wrapper = shallow(<ExpansionPanelSummary disabled />);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true);
  });

  it('when expanded should have expanded class', () => {
    const wrapper = shallow(<ExpansionPanelSummary expanded />);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
  });

  it('should render with the expand icon and have the expandIcon class', () => {
    const wrapper = shallow(<ExpansionPanelSummary expandIcon={<div>Icon</div>} />);
    const iconWrap = wrapper.childAt(1);
    assert.strictEqual(iconWrap.hasClass(classes.expandIcon), true);
  });

  describe('focus', () => {
    function focusVisible(wrapper, event) {
      // don't know of any better strategy to simulate focusvisible
      wrapper
        .find(ButtonBase)
        .props()
        .onFocusVisible(event);
      wrapper.update();
    }

    function isFocused(wrapper) {
      return wrapper
        .find(`.${classes.root}`)
        .first()
        .hasClass(classes.focused);
    }

    it('handleFocusVisible() should set focused state', () => {
      const wrapper = mount(<ExpansionPanelSummary />);

      focusVisible(wrapper);
      assert.strictEqual(isFocused(wrapper), true);
    });

    it('handleBlur() should unset focused state', () => {
      const wrapper = mount(<ExpansionPanelSummary expanded />);

      focusVisible(wrapper);
      assert.strictEqual(isFocused(wrapper), true);

      wrapper
        .find('[aria-expanded=true]')
        .first()
        .simulate('blur');
      assert.strictEqual(isFocused(wrapper), false);
    });
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onClick', 'onFocusVisible', 'onBlur'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = mount(
        <ExpansionPanel expanded>
          <ExpansionPanelSummary {...handlers} />
        </ExpansionPanel>,
      );

      const summary = wrapper.find('[aria-expanded]').first();

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        summary.simulate(event, { persist: () => {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('prop: onChange', () => {
    it('fires onChange if the summary control is clicked', () => {
      const handleChange = spy();
      const wrapper = mount(
        <ExpansionPanel expanded={false} onChange={handleChange}>
          <ExpansionPanelSummary />
        </ExpansionPanel>,
      );

      const control = findOutermostIntrinsic(wrapper.find('[aria-expanded]'));
      const eventMock = 'woofExpansionPanelSummary';
      control.simulate('click', { eventMock });

      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.calledWithMatch({ eventMock }), true);
    });
  });

  describe('prop: click', () => {
    it('should trigger onClick', () => {
      const handleClick = spy();
      const wrapper = mount(
        <ExpansionPanel expanded={false} onChange={() => {}}>
          <ExpansionPanelSummary onClick={handleClick} />
        </ExpansionPanel>,
      );
      wrapper
        .find('[aria-expanded]')
        .first()
        .simulate('click');
      assert.strictEqual(handleClick.callCount, 1);
    });
  });
});
