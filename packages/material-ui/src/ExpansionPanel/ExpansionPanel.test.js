import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createShallow,
  createMount,
  getClasses,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Collapse from '../Collapse';
import Paper from '../Paper';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelSummary from '../ExpansionPanelSummary';

describe('<ExpansionPanel />', () => {
  let mount;
  let shallow;
  let classes;
  const minimalChildren = [<ExpansionPanelSummary key="header" />];

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<ExpansionPanel>{minimalChildren}</ExpansionPanel>);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Paper', () => {
    const wrapper = mount(<ExpansionPanel>{minimalChildren}</ExpansionPanel>);
    const paper = wrapper.find(Paper);
    assert.strictEqual(paper.exists(), true);
    assert.strictEqual(paper.props().elevation, 1);
    assert.strictEqual(paper.props().square, false);
  });

  it('is uncontrolled by default', () => {
    const wrapper = mount(<ExpansionPanel>{minimalChildren}</ExpansionPanel>);

    wrapper.setProps({ expanded: true });
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.expanded), false);
  });

  it('should handle defaultExpanded prop', () => {
    const wrapper = shallow(<ExpansionPanel defaultExpanded>{minimalChildren}</ExpansionPanel>);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <ExpansionPanel className="test-class-name">{minimalChildren}</ExpansionPanel>,
    );
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
    const wrapper = shallow(<ExpansionPanel expanded>{minimalChildren}</ExpansionPanel>);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
    assert.strictEqual(wrapper.instance().isControlled, true);

    wrapper.setProps({ expanded: false });
    assert.strictEqual(wrapper.hasClass(classes.expanded), false);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange}>{minimalChildren}</ExpansionPanel>,
    );
    assert.strictEqual(wrapper.type(), ExpansionPanel);
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange} expanded>
        {minimalChildren}
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
        {minimalChildren}
      </ExpansionPanel>,
    );
    wrapper.setProps({ onChange: undefined });
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 0);
  });

  it('when disabled should have the disabled class', () => {
    const wrapper = shallow(<ExpansionPanel disabled>{minimalChildren}</ExpansionPanel>);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true);
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
    describe('first child', () => {
      beforeEach(() => {
        consoleErrorMock.spy();
      });

      afterEach(() => {
        consoleErrorMock.reset();
      });

      /* works locally but doesn't catch the errors in test:karma 
      it('requires at least one child', () => {
        assert.throws(() => mount(<ExpansionPanel>[]</ExpansionPanel>));
        // 2 other errors are from accesing property of undefined and react component stack
        assert.strictEqual(consoleErrorMock.callCount(), 3);
        assert.include(consoleErrorMock.args()[0][0], 'Material-UI: Expected the first child');
      }); */

      it('needs a valid element as the first child', () => {
        mount(
          <ExpansionPanel>
            <></>
          </ExpansionPanel>,
        );
        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(
          consoleErrorMock.args()[0][0],
          "Material-UI: The ExpansionPanel doesn't accept a Fragment",
        );
      });
    });

    it('should accept empty content', () => {
      mount(
        <ExpansionPanel>
          <ExpansionPanelSummary />
          {null}
        </ExpansionPanel>,
      );
    });
  });
});
