import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, reactMajor } from '@mui/internal-test-utils';
import Accordion, { accordionClasses as classes } from '@mui/material/Accordion';
import Paper from '@mui/material/Paper';
import AccordionSummary from '@mui/material/AccordionSummary';
import describeConformance from '../../test/describeConformance';

function NoTransition(props) {
  const { children, in: inProp } = props;

  if (!inProp) {
    return null;
  }
  return children;
}

describe('<Accordion />', () => {
  const { render } = createRenderer();

  const minimalChildren = [<AccordionSummary key="header">Header</AccordionSummary>];

  describeConformance(<Accordion>{minimalChildren}</Accordion>, () => ({
    classes,
    inheritComponent: Paper,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordion',
    testVariantProps: { variant: 'rounded' },
    slots: {
      transition: {
        testWithElement: null,
      },
      heading: {
        testWithElement: 'h4',
        expectedClassName: classes.heading,
      },
    },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render and not be controlled', () => {
    const { container } = render(<Accordion>{minimalChildren}</Accordion>);
    expect(container.firstChild).not.to.have.class(classes.expanded);
  });

  it('should handle defaultExpanded prop', () => {
    const { container } = render(<Accordion defaultExpanded>{minimalChildren}</Accordion>);
    expect(container.firstChild).to.have.class(classes.expanded);
  });

  it('should render the summary and collapse elements', () => {
    const { getByRole, getByText } = render(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <div id="panel-content">Hello</div>
      </Accordion>,
    );
    expect(getByText('Summary')).toBeVisible();
    expect(getByRole('button')).to.have.attribute('aria-expanded', 'false');
  });

  it('should be controlled', () => {
    const { container, setProps } = render(
      <Accordion expanded TransitionComponent={NoTransition}>
        {minimalChildren}
      </Accordion>,
    );
    const panel = container.firstChild;
    expect(panel).to.have.class(classes.expanded);
    setProps({ expanded: false });
    expect(panel).not.to.have.class(classes.expanded);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const { getByText } = render(
      <Accordion onChange={handleChange} TransitionComponent={NoTransition}>
        {minimalChildren}
      </Accordion>,
    );
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const { getByText } = render(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(false);
  });

  it('when undefined onChange and controlled should not call the onChange', () => {
    const handleChange = spy();
    const { setProps, getByText } = render(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    setProps({ onChange: undefined });
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(0);
  });

  it('when disabled should have the disabled class', () => {
    const { container } = render(<Accordion disabled>{minimalChildren}</Accordion>);
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should handle the TransitionComponent prop', () => {
    function NoTransitionCollapse(props) {
      return props.in ? <div>{props.children}</div> : null;
    }
    NoTransitionCollapse.propTypes = {
      children: PropTypes.node,
      in: PropTypes.bool,
    };

    function CustomContent() {
      return <div>Hello</div>;
    }
    const { queryByText, getByText, setProps } = render(
      <Accordion expanded TransitionComponent={NoTransitionCollapse}>
        <AccordionSummary />
        <CustomContent />
      </Accordion>,
    );

    // Collapse is initially shown
    expect(getByText('Hello')).toBeVisible();

    // Hide the collapse
    setProps({ expanded: false });
    expect(queryByText('Hello')).to.equal(null);
  });

  it('should handle the `square` prop', () => {
    const { container } = render(<Accordion square>{minimalChildren}</Accordion>);
    expect(container.firstChild).not.toHaveComputedStyle({
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    });
  });

  it('when `square` prop is passed, it should not have the rounded class', () => {
    const { container } = render(<Accordion square>{minimalChildren}</Accordion>);
    expect(container.firstChild).not.to.have.class(classes.rounded);
  });

  describe('prop: children', () => {
    describe('first child', () => {
      beforeEach(function beforeEachCallback() {
        if (reactMajor >= 19) {
          // React 19 removed prop types support
          this.skip();
        }

        PropTypes.resetWarningCache();
      });

      it('requires at least one child', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            Accordion.propTypes,
            { classes: {}, children: [] },
            'prop',
            'MockedName',
          );
        }).toErrorDev(['MUI: Expected the first child']);
      });

      it('needs a valid element as the first child', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            Accordion.propTypes,
            {
              classes: {},
              // eslint-disable-next-line react/jsx-no-useless-fragment
              children: <React.Fragment />,
            },
            'prop',
            'MockedName',
          );
        }).toErrorDev(["MUI: The Accordion doesn't accept a Fragment"]);
      });
    });

    it('should accept empty content', () => {
      render(
        <Accordion>
          <AccordionSummary />
          {null}
        </Accordion>,
      );
    });
  });

  it('should warn when switching from controlled to uncontrolled', () => {
    const wrapper = render(
      <Accordion expanded TransitionComponent={NoTransition}>
        {minimalChildren}
      </Accordion>,
    );

    expect(() => wrapper.setProps({ expanded: undefined })).to.toErrorDev(
      'MUI: A component is changing the controlled expanded state of Accordion to be uncontrolled.',
    );
  });

  it('should warn when switching between uncontrolled to controlled', () => {
    const { setProps } = render(
      <Accordion TransitionComponent={NoTransition}>{minimalChildren}</Accordion>,
    );

    expect(() => setProps({ expanded: true })).toErrorDev(
      'MUI: A component is changing the uncontrolled expanded state of Accordion to be controlled.',
    );
  });

  describe('prop: TransitionProps', () => {
    it('should apply properties to the Transition component', () => {
      const { getByTestId } = render(
        <Accordion TransitionProps={{ 'data-testid': 'transition-testid' }}>
          {minimalChildren}
        </Accordion>,
      );

      expect(getByTestId('transition-testid')).not.to.equal(null);
    });
  });

  describe('details unmounting behavior', () => {
    it('does not unmount by default', () => {
      const { queryByTestId } = render(
        <Accordion expanded={false}>
          <AccordionSummary>Summary</AccordionSummary>
          <div data-testid="details">Details</div>
        </Accordion>,
      );

      expect(queryByTestId('details')).not.to.equal(null);
    });

    it('unmounts if opted in via slotProps.transition', () => {
      const { queryByTestId } = render(
        <Accordion expanded={false} slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <div data-testid="details">Details</div>
        </Accordion>,
      );

      expect(queryByTestId('details')).to.equal(null);
    });
  });
});
