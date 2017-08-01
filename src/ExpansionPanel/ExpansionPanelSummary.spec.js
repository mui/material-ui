// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import ExpansionPanelSummary from './ExpansionPanelSummary';

const ExpansionPanelSummaryNaked = unwrap(ExpansionPanelSummary);

describe('<ExpansionPanelSummary />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<ExpansionPanelSummary />);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<ExpansionPanelSummary />);
    assert.strictEqual(wrapper.name(), 'withStyles(ButtonBase)');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ExpansionPanelSummary className="woofExpansionPanelSummary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofExpansionPanelSummary'), true);
  });

  it('should render with the items', () => {
    const wrapper = shallow(<ExpansionPanelSummary />);
    const itemsWrap = wrapper.childAt(0);
    assert.strictEqual(itemsWrap.hasClass(classes.items), true);
  });

  it('when disabled should have disabled class', () => {
    const wrapper = shallow(<ExpansionPanelSummary disabled />);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true);
  });

  it('when expanded should have expanded class', () => {
    const wrapper = shallow(<ExpansionPanelSummary expanded />);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
  });

  it('should render with the expand icon and have the action class', () => {
    const wrapper = shallow(<ExpansionPanelSummary expandIcon={<div>Icon</div>} />);
    const iconWrap = wrapper.childAt(1);
    assert.strictEqual(iconWrap.hasClass(classes.action), true);
  });

  it('handleFocus() should set focused state', () => {
    const eventMock = 'woofExpansionPanelSummary';
    const wrapper = mount(<ExpansionPanelSummaryNaked classes={{}} />);
    wrapper.instance().handleFocus(eventMock);
    assert.strictEqual(wrapper.state().focused, true);
  });

  it('handleBlur() should unset focused state', () => {
    const eventMock = 'woofExpansionPanelSummary';
    const wrapper = mount(<ExpansionPanelSummaryNaked classes={{}} />);
    wrapper.setState({ focused: true });
    wrapper.instance().handleBlur(eventMock);
    assert.strictEqual(wrapper.state().focused, false);
  });

  it('handleChange() should propagate call to onChange prop', () => {
    const eventMock = 'woofExpansionPanelSummary';
    const onChangeSpy = spy();
    const wrapper = mount(<ExpansionPanelSummaryNaked classes={{}} onChange={onChangeSpy} />);
    wrapper.instance().handleChange(eventMock);
    assert.strictEqual(onChangeSpy.callCount, 1);
    assert.strictEqual(onChangeSpy.calledWith(eventMock), true);
  });

  it('handleChange() should not propagate call to onChange prop', () => {
    const eventMock = 'woofExpansionPanelSummary';
    const onChangeSpy = spy();
    const wrapper = mount(<ExpansionPanelSummaryNaked classes={{}} onChange={onChangeSpy} />);
    wrapper.setProps({ onChange: undefined });
    wrapper.instance().handleChange(eventMock);
    assert.strictEqual(onChangeSpy.callCount, 0);
  });
});
