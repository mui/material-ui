import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createShallow,
  createMount,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import ExpansionPanelSummary from './ExpansionPanelSummary';

describe('<ExpansionPanelSummary />', () => {
  let mount;
  let shallow;
  let classes;

  function findExpandButton(wrapper) {
    return wrapper.find('[role="button"]:not([aria-hidden=true])');
  }

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<ExpansionPanelSummary />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the user and root classes', () => {
    const root = findOutermostIntrinsic(
      mount(<ExpansionPanelSummary className="woofExpansionPanelSummary" />),
    );
    assert.strictEqual(root.hasClass(classes.root), true);
    assert.strictEqual(root.hasClass('woofExpansionPanelSummary'), true);
  });

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
    const eventMock = 'woofExpansionPanelSummary';
    const wrapper = mount(<ExpansionPanelSummary />);

    wrapper
      .find('ExpansionPanelSummary')
      .instance()
      .handleFocusVisible(eventMock);
    // ButtonBase wont rerender otherwise resulting in the missing className
    wrapper.update();

    assert.strictEqual(findExpandButton(wrapper).hasClass(classes.focused), true);
  });

  it('handleBlur() should unset focused state', () => {
    const wrapper = mount(<ExpansionPanelSummary classes={{}} />);

    const eventMock = 'woofExpansionPanelSummary';
    wrapper
      .find('ExpansionPanelSummary')
      .instance()
      .handleFocusVisible(eventMock);
    wrapper.update();
    wrapper
      .find('ExpansionPanelSummary')
      .instance()
      .handleBlur(eventMock);
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

      const wrapper = shallow(<ExpansionPanelSummary {...handlers} />);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { persist: () => {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('prop: onChange', () => {
    it('fires onChange if the summary control is clicked', () => {
      const handleChange = spy();
      const wrapper = mount(<ExpansionPanelSummary expanded={false} onChange={handleChange} />);

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
      const wrapper = shallow(<ExpansionPanelSummary onClick={handleClick} />);
      wrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1);
    });
  });
});
