import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Paper from '../Paper';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelSummary from '../ExpansionPanelSummary';

describe('<ExpansionPanel />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(<ExpansionPanel>foo</ExpansionPanel>);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render and have isControlled set to false', () => {
    const wrapper = mount(<ExpansionPanel>foo</ExpansionPanel>);

    const root = wrapper.find(`.${classes.root}`).first();
    assert.strictEqual(root.type(), Paper);
    assert.strictEqual(root.props().elevation, 1);
    assert.strictEqual(root.props().square, false);

    wrapper.setProps({ expanded: true });
    assert.strictEqual(wrapper.find(`.${classes.expanded}`).exists(), false);
  });

  it('should handle defaultExpanded prop', () => {
    const wrapper = mount(<ExpansionPanel defaultExpanded>foo</ExpansionPanel>);

    assert.strictEqual(
      wrapper
        .find(`.${classes.root}`)
        .first()
        .hasClass(classes.expanded),
      true,
    );
  });

  it('should render the custom className and the root class', () => {
    const wrapper = mount(<ExpansionPanel className="test-class-name">foo</ExpansionPanel>);
    const root = wrapper.find(`.${classes.root}`).first();
    assert.strictEqual(root.hasClass('test-class-name'), true);
  });

  it('should render the summary and collapse elements', () => {
    const wrapper = mount(
      <ExpansionPanel expanded>
        <ExpansionPanelSummary>summary</ExpansionPanelSummary>
        <div>Hello</div>
      </ExpansionPanel>,
    );

    assert.strictEqual(
      wrapper
        .find('[aria-expanded=true]')
        .first()
        .text(),
      'summary',
    );

    const collapse = wrapper.find('Collapse');
    assert.strictEqual(collapse.text(), 'Hello');
  });

  it('should handle the expanded prop', () => {
    const wrapper = mount(<ExpansionPanel expanded>foo</ExpansionPanel>);
    const findRoot = () => wrapper.find(`.${classes.root}`).first();

    assert.strictEqual(findRoot().hasClass(classes.expanded), true);

    wrapper.setProps({ expanded: false });
    assert.strictEqual(findRoot().hasClass(classes.expanded), false);
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

  it('when disabled should have the disabled class', () => {
    const wrapper = mount(<ExpansionPanel disabled>foo</ExpansionPanel>);
    assert.strictEqual(
      wrapper
        .find(`.${classes.root}`)
        .first()
        .hasClass(classes.disabled),
      true,
    );
  });

  it('should handle the TransitionComponent prop', () => {
    const NoTransitionCollapse = props => {
      return props.in ? <div>{props.children}</div> : null;
    };
    NoTransitionCollapse.propTypes = {
      children: PropTypes.node,
      in: PropTypes.bool,
    };

    const CustomContent = () => <div>Hello</div>;
    const wrapper = mount(
      <ExpansionPanel expanded TransitionComponent={NoTransitionCollapse}>
        <ExpansionPanelSummary />
        <CustomContent />
      </ExpansionPanel>,
    );

    // Collapse is initially shown
    const collapse = wrapper.find(NoTransitionCollapse);
    assert.strictEqual(collapse.props().in, true);
    assert.strictEqual(wrapper.find(CustomContent).length, 1);

    // Hide the collapse
    wrapper.setProps({ expanded: false });
    const collapse2 = wrapper.find(NoTransitionCollapse);
    assert.strictEqual(collapse2.props().in, false);
    assert.strictEqual(wrapper.find(CustomContent).length, 0);
  });

  describe('prop: children', () => {
    it('should accept an empty child', () => {
      mount(
        <ExpansionPanel expanded>
          <ExpansionPanelSummary />
          {null}
        </ExpansionPanel>,
      );
    });
  });
});
