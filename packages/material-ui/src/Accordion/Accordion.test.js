import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createClientRender,
  describeConformance,
  getClasses,
  fireEvent
} from 'test/utils';
import Paper from '../Paper';
import Accordion from './Accordion';
import AccordionSummary from '../AccordionSummary';

describe('<Accordion />', () => {
  const mount = createClientRender({ strict: true });
  let classes;
  const minimalChildren = [(<AccordionSummary key="header" >Header</AccordionSummary>)];

  before(() => {
    classes = getClasses(<Accordion>{minimalChildren}</Accordion>);
  });

  describeConformance(<Accordion>{minimalChildren}</Accordion>, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    useRTL: true,
  }));

  it('should render and not be controlled', () => {
    const accordion = mount(<Accordion>{minimalChildren}</Accordion>);
    expect(accordion.container.firstChild.tagName).to.equal("DIV");
    expect(accordion.container.firstChild.classList.contains(classes.expanded)).to.be.false;
    expect(accordion.container.firstChild.classList.contains(classes.square)).to.be.false;
  });

  it('should handle defaultExpanded prop', () => {
    const accordion = mount(<Accordion defaultExpanded>{minimalChildren}</Accordion>);
    expect(accordion.container.firstChild.classList.contains(classes.expanded)).to.be.true;
  });

  it('should render the summary and collapse elements', () => {
    const accordion = mount(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <div id="panel-content">Hello</div>
      </Accordion>,
    );

    expect(accordion.getByText("Summary").parentNode.getAttribute("aria-expanded")).to.be.equal('false');
    expect(accordion.getByText("Hello")).to.not.be.visible;
  });

  it('should be controlled', () => {
    const accordion = mount(<Accordion expanded>{minimalChildren}</Accordion>);
    const panel = accordion.container.firstChild;
    expect(panel.classList.contains(classes.expanded)).to.be.true;
    accordion.rerender(<Accordion expanded={false}>{minimalChildren}</Accordion>);
    expect(panel.classList.contains(classes.expanded)).to.be.false;
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const accordion = mount(<Accordion onChange={handleChange}>{minimalChildren}</Accordion>);
    const summary = accordion.getByText("Header");
    fireEvent.click(summary);
    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const accordion = mount(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    const summary = accordion.getByText("Header");
    fireEvent.click(summary);
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(false);
  });

  it('when undefined onChange and controlled should not call the onChange', () => {
    const handleChange = spy();
    const accordion = mount(
      <Accordion onChange={undefined} expanded>
        {minimalChildren}
      </Accordion>,
    );
    const summary = accordion.getByText("Header");
    fireEvent.click(summary);
    expect(handleChange.callCount).to.equal(0);
  });

  it('when disabled should have the disabled class', () => {
    const accordion = mount(<Accordion disabled>{minimalChildren}</Accordion>);
    expect(accordion.container.firstChild.classList.contains(classes.disabled)).to.be.true;
  });

  it('should handle the TransitionComponent prop', () => {
    const NoTransitionCollapse = (props) => {
      return props.in ? <div data-testid="no-transition-collapse">{props.children}</div> : null;
    };
    NoTransitionCollapse.propTypes = {
      children: PropTypes.node,
      in: PropTypes.bool,
    };

    const CustomContent = () => <div>Hello</div>;
    const accordion = mount(
      <Accordion expanded TransitionComponent={NoTransitionCollapse}>
        <AccordionSummary />
        <CustomContent />
      </Accordion>,
    );

    // Collapse is initially shown
    expect(accordion.getByText("Hello")).to.be.visible;

    // Hide the collapse
    accordion.rerender(
      <Accordion expanded={false} TransitionComponent={NoTransitionCollapse}>
        <AccordionSummary />
        <CustomContent />
      </Accordion>
    );
    expect(accordion.queryByText("Hello")).to.not.exist
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
      createClientRender(
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
