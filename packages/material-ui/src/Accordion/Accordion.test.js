import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, describeConformance, getClasses, findOutermostIntrinsic } from 'test/utils';
import Paper from '../Paper';
import Accordion from './Accordion';
import AccordionSummary from '../AccordionSummary';
import Collapse from '../Collapse';

describe('<Accordion />', () => {
  const mount = createMount({ strict: true });
  let classes;
  const minimalChildren = [<AccordionSummary key="header" />];

  before(() => {
    classes = getClasses(<Accordion>{minimalChildren}</Accordion>);
  });

  describeConformance(<Accordion>{minimalChildren}</Accordion>, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render and not be controlled', () => {
    const wrapper = mount(<Accordion>{minimalChildren}</Accordion>);
    const root = wrapper.find(`.${classes.root}`).first();
    expect(root.type()).to.equal(Paper);
    expect(root.props().square).to.equal(false);
    expect(root.hasClass(classes.expanded)).to.equal(false);
  });

  it('should handle defaultExpanded prop', () => {
    const wrapper = mount(<Accordion defaultExpanded>{minimalChildren}</Accordion>);
    expect(findOutermostIntrinsic(wrapper).hasClass(classes.expanded)).to.equal(true);
  });

  it('should render the summary and collapse elements', () => {
    const wrapper = mount(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <div id="panel-content">Hello</div>
      </Accordion>,
    );

    expect(wrapper.find('[aria-expanded=false]').hostNodes().text()).to.equal('Summary');
    expect(wrapper.find(Collapse).find('div#panel-content').text()).to.equal('Hello');
  });

  it('should be controlled', () => {
    const wrapper = mount(<Accordion expanded>{minimalChildren}</Accordion>);
    const panel = wrapper.find(`.${classes.root}`).first();
    expect(panel.hasClass(classes.expanded)).to.equal(true);
    wrapper.setProps({ expanded: false });
    expect(wrapper.hasClass(classes.expanded)).to.equal(false);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const wrapper = mount(<Accordion onChange={handleChange}>{minimalChildren}</Accordion>);
    wrapper.find(AccordionSummary).simulate('click');
    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    wrapper.find(AccordionSummary).simulate('click');
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(false);
  });

  it('when undefined onChange and controlled should not call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    wrapper.setProps({ onChange: undefined });
    wrapper.find(AccordionSummary).simulate('click');
    expect(handleChange.callCount).to.equal(0);
  });

  it('when disabled should have the disabled class', () => {
    const wrapper = mount(<Accordion disabled>{minimalChildren}</Accordion>);
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
      <Accordion expanded TransitionComponent={NoTransitionCollapse}>
        <AccordionSummary />
        <CustomContent />
      </Accordion>,
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
        PropTypes.resetWarningCache();
      });

      it('requires at least one child', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            Accordion.Naked.propTypes,
            { classes: {}, children: [] },
            'prop',
            'MockedName',
          );
        }).toErrorDev(['Material-UI: Expected the first child']);
      });

      it('needs a valid element as the first child', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            Accordion.Naked.propTypes,
            { classes: {}, children: <React.Fragment /> },
            'prop',
            'MockedName',
          );
        }).toErrorDev(["Material-UI: The Accordion doesn't accept a Fragment"]);
      });
    });

    it('should accept empty content', () => {
      mount(
        <Accordion>
          <AccordionSummary />
          {null}
        </Accordion>,
      );
    });
  });

  it('should warn when switching from controlled to uncontrolled', () => {
    const wrapper = mount(<Accordion expanded>{minimalChildren}</Accordion>);

    expect(() => wrapper.setProps({ expanded: undefined })).to.toErrorDev(
      'Material-UI: A component is changing the controlled expanded state of Accordion to be uncontrolled.',
    );
  });

  it('should warn when switching between uncontrolled to controlled', () => {
    const wrapper = mount(<Accordion>{minimalChildren}</Accordion>);

    expect(() => wrapper.setProps({ expanded: true })).toErrorDev(
      'Material-UI: A component is changing the uncontrolled expanded state of Accordion to be controlled.',
    );
  });
});
