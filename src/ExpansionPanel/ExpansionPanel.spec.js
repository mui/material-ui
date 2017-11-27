// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import Collapse from '../transitions/Collapse';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelSummary from './ExpansionPanelSummary';

describe('<ExpansionPanel />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<ExpansionPanel />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render and have isControlled set to false', () => {
    const wrapper = shallow(<ExpansionPanel />);
    assert.strictEqual(wrapper.name(), 'withStyles(Paper)');
    assert.strictEqual(wrapper.props().elevation, 1);
    assert.strictEqual(wrapper.props().square, true);
    assert.strictEqual(wrapper.instance().isControlled, false);

    const collapse = wrapper.find(Collapse);
    assert.strictEqual(collapse.props().containerProps['aria-hidden'], 'true');

    wrapper.setProps({ expanded: true });
    assert.strictEqual(wrapper.state().expanded, false, 'should not change the expanded state');
  });

  it('should handle defaultExpanded prop', () => {
    const wrapper = shallow(<ExpansionPanel defaultExpanded />);
    assert.strictEqual(
      wrapper.instance().isControlled,
      false,
      'should have isControlled state false',
    );
    assert.strictEqual(wrapper.state().expanded, true, 'should set expanded state');
    assert.strictEqual(wrapper.hasClass(classes.expanded), true, 'should have the expanded class');
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(<ExpansionPanel className="test-class-name" />);
    assert.strictEqual(wrapper.hasClass('test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render the summary and collapse elements', () => {
    const wrapper = shallow(
      <ExpansionPanel>
        <ExpansionPanelSummary />
        <div>Hello</div>
      </ExpansionPanel>,
    );

    assert.strictEqual(wrapper.childAt(0).name(), 'withStyles(ExpansionPanelSummary)');
    const collapse = wrapper.childAt(1);
    assert.strictEqual(collapse.name(), 'withStyles(Collapse)');
    assert.strictEqual(collapse.children().length, 1, 'collapse should have 1 children div');
  });

  it('should handle the expanded prop', () => {
    const wrapper = shallow(<ExpansionPanel expanded />);
    assert.strictEqual(wrapper.state().expanded, true);
    assert.strictEqual(wrapper.instance().isControlled, true, 'should set isControlled prop');

    wrapper.setProps({ expanded: false });
    assert.strictEqual(wrapper.state().expanded, false, 'should have expanded set to false');
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange}>
        <ExpansionPanelSummary />
      </ExpansionPanel>,
    );
    assert.strictEqual(wrapper.name(), 'withStyles(ExpansionPanel)');
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange} expanded>
        <ExpansionPanelSummary />
      </ExpansionPanel>,
    );
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
  });

  it('when undefined onChange and controlled should not call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange} expanded>
        <ExpansionPanelSummary />
      </ExpansionPanel>,
    );
    wrapper.setProps({ onChange: undefined });
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 0);
  });

  it('when disabled should have the disabled class', () => {
    const wrapper = shallow(<ExpansionPanel disabled />);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');
  });

  describe('prop: children', () => {
    it('should accept an empty child', () => {
      shallow(
        <ExpansionPanel>
          <ExpansionPanelSummary />
          {null}
        </ExpansionPanel>,
      );
    });
  });
});
