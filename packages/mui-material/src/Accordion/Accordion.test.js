import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, isJsdom, reactMajor, screen, waitFor } from '@mui/internal-test-utils';
import Accordion, { accordionClasses as classes } from '@mui/material/Accordion';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import describeConformance from '../../test/describeConformance';

function NoTransition(props) {
  const { children, in: inProp } = props;

  if (!inProp) {
    return null;
  }
  return children;
}

const CustomPaper = React.forwardRef(({ square, ...props }, ref) => <Paper ref={ref} {...props} />);

function WrappedAccordionSummary(props) {
  return <AccordionSummary {...props} />;
}

const CustomAccordionRegion = React.forwardRef(function CustomAccordionRegion(
  { ownerState, ...props },
  ref,
) {
  return <section ref={ref} {...props} />;
});

describe('<Accordion />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(
    <Accordion>
      <AccordionSummary>Header</AccordionSummary>
      <AccordionDetails>Details</AccordionDetails>
    </Accordion>,
    () => ({
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
        root: {
          expectedClassName: classes.root,
          testWithElement: CustomPaper,
        },
        region: {
          expectedClassName: classes.region,
          testWithElement: 'div',
        },
      },
    }),
  );

  it('should render and not be controlled', () => {
    const { container } = render(
      <Accordion>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).not.to.have.class(classes.expanded);
  });

  it('should handle defaultExpanded prop', () => {
    const { container } = render(
      <Accordion defaultExpanded>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).to.have.class(classes.expanded);
  });

  it('should render the summary and collapse elements', () => {
    render(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails>Hello</AccordionDetails>
      </Accordion>,
    );

    expect(screen.getByText('Summary')).toBeVisible();
    expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');
  });

  it('should be controlled', async () => {
    function ControlledAccordion() {
      const [expanded, setExpanded] = React.useState(true);

      return (
        <Accordion
          data-testid="accordion"
          expanded={expanded}
          onChange={(event, newExpanded) => setExpanded(newExpanded)}
          slots={{ transition: NoTransition }}
        >
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
    }

    const { user } = render(<ControlledAccordion />);

    expect(screen.getByTestId('accordion')).to.have.class(classes.expanded);

    await user.click(screen.getByRole('button', { name: 'Header' }));

    expect(screen.getByTestId('accordion')).not.to.have.class(classes.expanded);
    expect(screen.getByRole('button', { name: 'Header' })).to.have.attribute(
      'aria-expanded',
      'false',
    );
  });

  it('should call onChange when clicking the summary element', async () => {
    const handleChange = spy();

    const { user } = render(
      <Accordion onChange={handleChange} slots={{ transition: NoTransition }}>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'Header' }));

    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', async () => {
    const handleChange = spy();

    const { user } = render(
      <Accordion onChange={handleChange} expanded>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'Header' }));

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(false);
  });

  it('when onChange is undefined and controlled should not change expansion', async () => {
    const { user } = render(
      <Accordion data-testid="accordion" expanded>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'Header' }));

    expect(screen.getByTestId('accordion')).to.have.class(classes.expanded);
    expect(screen.getByRole('button', { name: 'Header' })).to.have.attribute(
      'aria-expanded',
      'true',
    );
  });

  it('when disabled should have the disabled class', () => {
    const { container } = render(
      <Accordion disabled>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should handle the slots.transition prop', async () => {
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
    const { user } = render(
      <Accordion defaultExpanded slots={{ transition: NoTransitionCollapse }}>
        <AccordionSummary />
        <AccordionDetails>
          <CustomContent />
        </AccordionDetails>
      </Accordion>,
    );

    // Collapse is initially shown
    expect(screen.getByText('Hello')).toBeVisible();

    // Hide the collapse
    await user.click(screen.getByRole('button'));
    expect(screen.queryByText('Hello')).to.equal(null);
  });

  it('should handle the `square` prop', () => {
    const { container } = render(
      <Accordion square>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).not.toHaveComputedStyle({
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    });
  });

  it('when `square` prop is passed, it should not have the rounded class', () => {
    const { container } = render(
      <Accordion square>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).not.to.have.class(classes.rounded);
  });

  describe('prop: children', () => {
    describe.skipIf(reactMajor >= 19)('first child', () => {
      beforeEach(() => {
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
          <AccordionDetails />
        </Accordion>,
      );
    });
  });

  it('should warn when switching from controlled to uncontrolled', () => {
    const { rerender } = render(
      <Accordion expanded slots={{ transition: NoTransition }}>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(() =>
      rerender(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      ),
    ).to.toErrorDev(
      'MUI: A component is changing the controlled expanded state of Accordion to be uncontrolled.',
    );
  });

  it('should warn when switching between uncontrolled to controlled', () => {
    const { rerender } = render(
      <Accordion slots={{ transition: NoTransition }}>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(() =>
      rerender(
        <Accordion expanded slots={{ transition: NoTransition }}>
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      ),
    ).toErrorDev(
      'MUI: A component is changing the uncontrolled expanded state of Accordion to be controlled.',
    );
  });

  describe('slotProps.transition', () => {
    it('should apply properties to the Transition component', () => {
      render(
        <Accordion slotProps={{ transition: { 'data-testid': 'transition-testid' } }}>
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByTestId('transition-testid')).not.to.equal(null);
    });
  });

  describe('details unmounting behavior', () => {
    it('does not unmount by default', () => {
      render(
        <Accordion expanded={false}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails data-testid="details">Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.queryByTestId('details')).not.to.equal(null);
    });

    it('unmounts if opted in via slotProps.transition', () => {
      render(
        <Accordion expanded={false} slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails data-testid="details">Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.queryByTestId('details')).to.equal(null);
    });
  });

  describe('should not forward ownerState prop to the underlying DOM element when using transition slot', () => {
    const transitions = [
      {
        component: Collapse,
        name: 'Collapse',
      },
      {
        component: Fade,
        name: 'Fade',
      },
      {
        component: Grow,
        name: 'Grow',
      },
      {
        component: Slide,
        name: 'Slide',
      },
      {
        component: Zoom,
        name: 'Zoom',
      },
    ];

    transitions.forEach((transition) => {
      it(`${transition.name}`, () => {
        render(
          <Accordion
            defaultExpanded
            slots={{
              transition: transition.component,
            }}
            slotProps={{ transition: { timeout: 400 } }}
          >
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );

        expect(screen.getByRole('region')).not.to.have.attribute('ownerstate');
      });
    });
  });

  it('should allow custom role for region slot via slotProps', () => {
    render(
      <Accordion expanded slotProps={{ region: { role: 'list', 'data-testid': 'region-slot' } }}>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(screen.getByTestId('region-slot')).to.have.attribute('role', 'list');
  });

  describe('ARIA attributes', () => {
    it('preserves documented id and aria-controls props', () => {
      render(
        <Accordion>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('id', 'panel-header');
      expect(summary).to.have.attribute('aria-controls', 'panel-content');
      expect(region).to.have.attribute('id', 'panel-content');
      expect(region).to.have.attribute('aria-labelledby', 'panel-header');
    });

    it('generates linked ids when id and aria-controls are not provided', async () => {
      render(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      await waitFor(() => {
        expect(summary).to.have.attribute('id');
        expect(summary).to.have.attribute('aria-controls');
        expect(region).to.have.attribute('id');
        expect(region).to.have.attribute('aria-labelledby');
      });

      expect(summary.getAttribute('id')).to.equal(region.getAttribute('aria-labelledby'));
      expect(summary.getAttribute('aria-controls')).to.equal(region.getAttribute('id'));
    });

    it('generates linked ids for a wrapped AccordionSummary', async () => {
      render(
        <Accordion>
          <WrappedAccordionSummary>Summary</WrappedAccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      await waitFor(() => {
        expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
        expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
      });
    });

    it('ignores relationship props declared inside a wrapped AccordionSummary', async () => {
      function WrappedSummaryWithRelationshipProps() {
        return (
          <AccordionSummary id="inner-summary" aria-controls="inner-region">
            Summary
          </AccordionSummary>
        );
      }

      render(
        <Accordion>
          <WrappedSummaryWithRelationshipProps />
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      await waitFor(() => {
        expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
        expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
      });

      expect(summary).not.to.have.attribute('id', 'inner-summary');
      expect(summary).not.to.have.attribute('aria-controls', 'inner-region');
      expect(region).not.to.have.attribute('id', 'inner-region');
    });

    it('generates unique ids for multiple accordions', async () => {
      render(
        <div>
          <Accordion>
            <AccordionSummary>Summary 1</AccordionSummary>
            <AccordionDetails>Details 1</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Summary 2</AccordionSummary>
            <AccordionDetails>Details 2</AccordionDetails>
          </Accordion>
        </div>,
      );

      const [summary1, summary2] = screen.getAllByRole('button');

      await waitFor(() => {
        expect(summary1).to.have.attribute('id');
        expect(summary1).to.have.attribute('aria-controls');
        expect(summary2).to.have.attribute('id');
        expect(summary2).to.have.attribute('aria-controls');
      });

      expect(summary1.getAttribute('id')).not.to.equal(summary2.getAttribute('id'));
      expect(summary1.getAttribute('aria-controls')).not.to.equal(
        summary2.getAttribute('aria-controls'),
      );
    });

    describe.skipIf(!isJsdom())('server-side', () => {
      it.skipIf(reactMajor < 18)(
        'emits complete generated relationships for the documented no-id shape',
        () => {
          const { container } = renderToString(
            <Accordion>
              <AccordionSummary>Summary</AccordionSummary>
              <AccordionDetails>Details</AccordionDetails>
            </Accordion>,
          );

          const summary = container.querySelector('button');
          const region = container.querySelector('[role="region"]');

          expect(summary).to.have.attribute('id');
          expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
          expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
        },
      );

      it('does not emit a dangling aria-controls for wrapped summaries with incomplete custom region ids', () => {
        const { container } = renderToString(
          <Accordion slotProps={{ region: { id: 'custom-region' } }}>
            <WrappedAccordionSummary>Summary</WrappedAccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );

        const summary = container.querySelector('button');
        const region = container.querySelector('[role="region"]');

        expect(region).not.to.have.attribute('id', 'custom-region');
        expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
      });

      it('does not emit dangling relationship ids from conflicting slot props', () => {
        const { container } = renderToString(
          <Accordion
            slotProps={{
              region: {
                id: 'slot-region',
                'aria-labelledby': 'slot-summary',
              },
            }}
          >
            <AccordionSummary
              slotProps={{
                root: {
                  id: 'slot-summary',
                  'aria-controls': 'slot-region',
                },
              }}
            >
              Summary
            </AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );

        const summary = container.querySelector('button');
        const region = container.querySelector('[role="region"]');

        expect(summary).not.to.have.attribute('id', 'slot-summary');
        expect(summary).not.to.have.attribute('aria-controls', 'slot-region');
        expect(region).not.to.have.attribute('id', 'slot-region');
        expect(region).not.to.have.attribute('aria-labelledby', 'slot-summary');
        expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
      });

      it('emits generated aria-controls when unmountOnExit starts expanded', () => {
        const { container } = renderToString(
          <Accordion defaultExpanded slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );

        const summary = container.querySelector('button');
        const region = container.querySelector('[role="region"]');

        expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
      });
    });

    it('does not allow slotProps ids to break the relationship', async () => {
      render(
        <Accordion
          slotProps={{
            region: {
              id: 'slot-region',
              'aria-labelledby': 'slot-summary',
              'data-testid': 'region',
            },
          }}
        >
          <AccordionSummary
            slotProps={{
              root: {
                id: 'slot-summary',
                'aria-controls': 'slot-region',
                'data-testid': 'summary',
              },
            }}
          >
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByTestId('summary');
      const region = screen.getByTestId('region');

      await waitFor(() => {
        expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
      });

      expect(summary).not.to.have.attribute('id', 'slot-summary');
      expect(summary).not.to.have.attribute('aria-controls', 'slot-region');
      expect(region).not.to.have.attribute('id', 'slot-region');
      expect(region).not.to.have.attribute('aria-labelledby', 'slot-summary');
      expect(summary.getAttribute('aria-controls')).to.equal(region.getAttribute('id'));
    });

    it('preserves non-relationship slot props', async () => {
      const handleSummaryClick = spy();
      const handleRegionClick = spy();
      const regionRef = React.createRef();

      const { user } = render(
        <Accordion
          expanded
          slotProps={{
            region: {
              className: 'custom-region',
              style: { marginTop: 1 },
              role: 'list',
              'data-testid': 'region',
              onClick: handleRegionClick,
              ref: regionRef,
            },
          }}
        >
          <AccordionSummary
            slotProps={{
              root: {
                className: 'custom-summary',
                style: { marginTop: 2 },
                'data-testid': 'summary',
                onClick: handleSummaryClick,
              },
            }}
          >
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByTestId('summary');
      const region = screen.getByTestId('region');

      await waitFor(() => {
        expect(regionRef.current).to.equal(region);
      });

      expect(summary).to.have.class('custom-summary');
      expect(summary).to.have.attribute('style').that.includes('margin-top: 2px');
      expect(region).to.have.class('custom-region');
      expect(region).to.have.attribute('style').that.includes('margin-top: 1px');
      expect(region).to.have.attribute('role', 'list');

      await user.click(summary);
      await user.click(region);

      expect(handleSummaryClick.callCount).to.equal(1);
      expect(handleRegionClick.callCount).to.equal(1);
    });

    it('does not emit generated aria-controls when unmountOnExit keeps the region unmounted', () => {
      render(
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).not.to.have.attribute('aria-controls');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('preserves explicit aria-controls when unmountOnExit keeps the region unmounted', () => {
      render(
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).to.have.attribute('aria-controls', 'panel-content');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('emits generated aria-controls after mountOnEnter mounts the region once', async () => {
      const { user } = render(
        <Accordion slotProps={{ transition: { mountOnEnter: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');

      expect(summary).not.to.have.attribute('aria-controls');

      await user.click(summary);

      await waitFor(() => {
        expect(summary).to.have.attribute('aria-controls');
      });

      const ariaControls = summary.getAttribute('aria-controls');

      await user.click(summary);

      await waitFor(() => {
        expect(summary).to.have.attribute('aria-controls', ariaControls);
      });
    });

    it('emits generated aria-controls immediately when mountOnEnter starts expanded', () => {
      render(
        <Accordion defaultExpanded slotProps={{ transition: { mountOnEnter: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
    });

    it('does not emit generated aria-controls for a closed custom transition that returns null', () => {
      render(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).not.to.have.attribute('aria-controls');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('emits generated aria-controls after a custom transition mounts the region', async () => {
      const { user } = render(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');

      await user.click(summary);

      await waitFor(() => {
        expect(summary).to.have.attribute('aria-controls');
      });

      expect(summary.getAttribute('aria-controls')).to.equal(
        screen.getByRole('region').getAttribute('id'),
      );
    });

    it('removes generated aria-controls after a custom transition unmounts the region', async () => {
      const { user } = render(
        <Accordion defaultExpanded slots={{ transition: NoTransition }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');

      await waitFor(() => {
        expect(summary).to.have.attribute('aria-controls');
      });

      await user.click(summary);

      await waitFor(() => {
        expect(summary).not.to.have.attribute('aria-controls');
      });

      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('passes a single element child to custom transition slots', () => {
      const handleTransition = spy();

      function CustomTransition(props) {
        handleTransition(
          React.Children.count(props.children),
          React.isValidElement(props.children),
        );

        return props.in ? props.children : null;
      }

      render(
        <Accordion expanded slots={{ transition: CustomTransition }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(handleTransition.callCount).to.be.greaterThan(0);
      handleTransition.getCalls().forEach((call) => {
        expect(call.args).to.deep.equal([1, true]);
      });
    });

    it('preserves explicit aria-controls with a closed custom transition that returns null', () => {
      render(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).to.have.attribute('aria-controls', 'panel-content');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('supports generated relationships with a ref-forwarding custom region slot', async () => {
      const regionRef = React.createRef();
      const handleRegionClick = spy();

      const { user } = render(
        <Accordion
          defaultExpanded
          slots={{ region: CustomAccordionRegion }}
          slotProps={{
            region: {
              ref: regionRef,
              className: 'custom-region',
              style: { marginTop: 1 },
              role: 'list',
              'data-testid': 'region',
              onClick: handleRegionClick,
            },
          }}
        >
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByTestId('region');

      await waitFor(() => {
        expect(regionRef.current).to.equal(region);
        expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
        expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
      });

      expect(region).to.have.tagName('SECTION');
      expect(region).to.have.class('custom-region');
      expect(region).to.have.attribute('style').that.includes('margin-top: 1px');
      expect(region).to.have.attribute('role', 'list');

      await user.click(region);

      expect(handleRegionClick.callCount).to.equal(1);
    });
  });
});
