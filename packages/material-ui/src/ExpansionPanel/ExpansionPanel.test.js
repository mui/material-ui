import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Paper from '../Paper';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelSummary from '../ExpansionPanelSummary';
import Collapse from '../Collapse';

describe('<ExpansionPanel />', () => {
  let mount;
  let classes;
  const minimalChildren = [<ExpansionPanelSummary key="header" />];

  before(() => {
    // StrictModeViolation: uses Collapse
    mount = createMount({ strict: false });
    classes = getClasses(<ExpansionPanel>{minimalChildren}</ExpansionPanel>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ExpansionPanel>{minimalChildren}</ExpansionPanel>, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render and not be controlled', () => {
    const wrapper = mount(<ExpansionPanel>{minimalChildren}</ExpansionPanel>);
    const root = wrapper.find(`.${classes.root}`).first();
    expect(root.type()).to.equal(Paper);
    expect(root.props().square).to.equal(false);
    expect(root.hasClass(classes.expanded)).to.equal(false);
  });

  it('should handle defaultExpanded prop', () => {
    const wrapper = mount(<ExpansionPanel defaultExpanded>{minimalChildren}</ExpansionPanel>);
    expect(findOutermostIntrinsic(wrapper).hasClass(classes.expanded)).to.equal(true);
  });

  it('should render the summary and collapse elements', () => {
    const wrapper = mount(
      <ExpansionPanel>
        <ExpansionPanelSummary>Summary</ExpansionPanelSummary>
        <div id="panel-content">Hello</div>
      </ExpansionPanel>,
    );

    expect(wrapper.find('[aria-expanded=false]').hostNodes().text()).to.equal('Summary');
    expect(wrapper.find(Collapse).find('div#panel-content').text()).to.equal('Hello');
  });

  it('should be controlled', () => {
    const wrapper = mount(<ExpansionPanel expanded>{minimalChildren}</ExpansionPanel>);
    const panel = wrapper.find(`.${classes.root}`).first();
    expect(panel.hasClass(classes.expanded)).to.equal(true);
    wrapper.setProps({ expanded: false });
    expect(wrapper.hasClass(classes.expanded)).to.equal(false);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange}>{minimalChildren}</ExpansionPanel>,
    );
    wrapper.find(ExpansionPanelSummary).simulate('click');
    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(
      <ExpansionPanel onChange={handleChange} expanded>
        {minimalChildren}
      </ExpansionPanel>,
    );
    wrapper.find(ExpansionPanelSummary).simulate('click');
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(false);
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
    expect(handleChange.callCount).to.equal(0);
  });

  it('when disabled should have the disabled class', () => {
    const wrapper = mount(<ExpansionPanel disabled>{minimalChildren}</ExpansionPanel>);
    expect(findOutermostIntrinsic(wrapper).hasClass(classes.disabled)).to.equal(true);
  });

  it('should handle the TransitionComponent prop', () => {
    const NoTransitionCollapse = (props) => {
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
    expect(collapse.props().in).to.equal(true);
    expect(wrapper.find(CustomContent).length).to.equal(1);

    // Hide the collapse
    wrapper.setProps({ expanded: false });
    const collapse2 = wrapper.find(NoTransitionCollapse);
    expect(collapse2.props().in).to.equal(false);
    expect(wrapper.find(CustomContent).length).to.equal(0);
  });

  describe('prop: children', () => {
    describe('first child', () => {
      beforeEach(() => {
        consoleErrorMock.spy();
        PropTypes.resetWarningCache();
      });

      afterEach(() => {
        consoleErrorMock.reset();
      });

      it('requires at least one child', () => {
        PropTypes.checkPropTypes(
          ExpansionPanel.Naked.propTypes,
          { classes: {}, children: [] },
          'prop',
          'MockedName',
        );

        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.messages()[0]).to.include('Material-UI: expected the first child');
      });

      it('needs a valid element as the first child', () => {
        PropTypes.checkPropTypes(
          ExpansionPanel.Naked.propTypes,
          { classes: {}, children: <React.Fragment /> },
          'prop',
          'MockedName',
        );

        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.messages()[0]).to.include(
          "Material-UI: the ExpansionPanel doesn't accept a Fragment",
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

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const wrapper = mount(<ExpansionPanel expanded>{minimalChildren}</ExpansionPanel>);

      wrapper.setProps({ expanded: undefined });
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: a component is changing the controlled expanded state of ExpansionPanel to be uncontrolled.',
      );
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const wrapper = mount(<ExpansionPanel>{minimalChildren}</ExpansionPanel>);

      wrapper.setProps({ expanded: true });
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: a component is changing the uncontrolled expanded state of ExpansionPanel to be controlled.',
      );
    });
  });
});
