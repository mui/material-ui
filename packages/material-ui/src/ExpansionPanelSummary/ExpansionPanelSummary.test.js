import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import ExpansionPanelSummary from './ExpansionPanelSummary';
import ButtonBase from '../ButtonBase';

describe('<ExpansionPanelSummary />', () => {
  let mount;
  let classes;

  function findExpandButton(wrapper) {
    return wrapper.find('[role="button"]:not([aria-hidden=true])');
  }

  before(() => {
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(<ExpansionPanelSummary />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ExpansionPanelSummary />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render with the content', () => {
    const wrapper = mount(<ExpansionPanelSummary>The Summary</ExpansionPanelSummary>);
    const itemsWrap = wrapper.find(`.${classes.content}`);
    assert.strictEqual(itemsWrap.text(), 'The Summary');
  });

  it('when disabled should have disabled class', () => {
    const wrapper = mount(<ExpansionPanelSummary disabled />);
    assert.strictEqual(findExpandButton(wrapper).hasClass(classes.disabled), true);
  });

  it('when expanded should have expanded class', () => {
    const wrapper = mount(<ExpansionPanelSummary expanded />);
    assert.strictEqual(wrapper.find('[aria-expanded=true]').every(`.${classes.expanded}`), true);
  });

  it('should render with the expand icon and have the expandIcon class', () => {
    const wrapper = mount(<ExpansionPanelSummary expandIcon={<div>Icon</div>} />);
    const iconWrap = wrapper.find(`.${classes.expandIcon}`).first();
    assert.strictEqual(iconWrap.text(), 'Icon');
  });

  it('handleFocusVisible() should set focused state', () => {
    const wrapper = mount(<ExpansionPanelSummary />);
    wrapper
      .find(ButtonBase)
      .props()
      .onFocusVisible();
    wrapper.update();
    assert.strictEqual(findExpandButton(wrapper).hasClass(classes.focused), true);
  });

  it('handleBlur() should unset focused state', () => {
    const wrapper = mount(<ExpansionPanelSummary />);
    wrapper
      .find(ButtonBase)
      .props()
      .onFocusVisible();
    wrapper.update();
    wrapper
      .find(ButtonBase)
      .props()
      .onBlur();
    wrapper.update();
    assert.strictEqual(findExpandButton(wrapper).hasClass(classes.focused), false);
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onClick', 'onFocusVisible', 'onBlur'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = mount(<ExpansionPanelSummary {...handlers} />);

      events.forEach(event => {
        wrapper
          .find(ButtonBase)
          .props()
          [event]({ persist: () => {} });
        assert.strictEqual(handlers[event].callCount, 1, `should have called the ${event} handler`);
      });
    });
  });

  describe('prop: onChange', () => {
    it('fires onChange if the summary control is clicked', () => {
      const handleChange = spy();
      const wrapper = mount(<ExpansionPanelSummary expanded={false} onChange={handleChange} />);

      const control = findOutermostIntrinsic(wrapper);
      const eventMock = 'woofExpansionPanelSummary';
      control.simulate('click', { eventMock });

      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.calledWithMatch({ eventMock }), true);
    });
  });

  describe('prop: click', () => {
    it('should trigger onClick', () => {
      const handleClick = spy();
      const wrapper = mount(<ExpansionPanelSummary onClick={handleClick} />);
      wrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1);
    });
  });
});
