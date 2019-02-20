import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '@material-ui/core/test-utils';
import Collapse from '../Collapse';
import Paper from '../Paper';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelSummary from '../ExpansionPanelSummary';

describe('<ExpansionPanel />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<ExpansionPanel>foo</ExpansionPanel>);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render and have isControlled set to false', () => {
    const wrapper = shallow(<ExpansionPanel>foo</ExpansionPanel>);
    assert.strictEqual(wrapper.type(), Paper);
    assert.strictEqual(wrapper.props().elevation, 1);
    assert.strictEqual(wrapper.props().square, false);
    assert.strictEqual(wrapper.instance().isControlled, false);

    wrapper.setProps({ expanded: true });
    assert.strictEqual(wrapper.state().expanded, false);
  });

  it('should handle defaultExpanded prop', () => {
    const wrapper = shallow(<ExpansionPanel defaultExpanded>foo</ExpansionPanel>);
    assert.strictEqual(
      wrapper.instance().isControlled,
      false,
      'should have isControlled state false',
    );
    assert.strictEqual(wrapper.state().expanded, true);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(<ExpansionPanel className="test-class-name">foo</ExpansionPanel>);
    assert.strictEqual(wrapper.hasClass('test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render the summary and collapse elements', () => {
    const wrapper = shallow(
      <ExpansionPanel>
        <ExpansionPanelSummary />
        <div>Hello</div>
      </ExpansionPanel>,
    );

    assert.strictEqual(wrapper.childAt(0).type(), ExpansionPanelSummary);
    const collapse = wrapper.childAt(1);
    assert.strictEqual(collapse.type(), Collapse);
    assert.strictEqual(collapse.children().length, 1, 'collapse should have 1 children div');
  });

  it('should handle the expanded prop', () => {
    const wrapper = shallow(<ExpansionPanel expanded>foo</ExpansionPanel>);
    assert.strictEqual(wrapper.state().expanded, undefined);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
    assert.strictEqual(wrapper.instance().isControlled, true);

    wrapper.setProps({ expanded: false });
    assert.strictEqual(wrapper.hasClass(classes.expanded), false);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange}>
        <ExpansionPanelSummary />
      </ExpansionPanel>,
    );
    assert.strictEqual(wrapper.type(), ExpansionPanel);
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange} expanded>
        <ExpansionPanelSummary />
      </ExpansionPanel>,
    );
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 1);
    assert.strictEqual(handleChange.args[0][1], false);
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
    const wrapper = shallow(<ExpansionPanel disabled>foo</ExpansionPanel>);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true);
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
