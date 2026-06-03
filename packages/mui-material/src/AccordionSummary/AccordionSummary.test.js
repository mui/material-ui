import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer,
  screen,
  isJsdom,
  strictModeDoubleLoggingSuppressed,
} from '@mui/internal-test-utils';
import AccordionSummary, {
  accordionSummaryClasses as classes,
} from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

const CustomButtonBase = React.forwardRef(({ focusVisible, ...props }, ref) => (
  <ButtonBase ref={ref} {...props} />
));

const missingAccordionContextWarning = [
  'MUI: AccordionSummary should be rendered inside <Accordion>. Rendering AccordionSummary outside <Accordion> is deprecated and will no longer be supported in the next major version.',
  !strictModeDoubleLoggingSuppressed &&
    'MUI: AccordionSummary should be rendered inside <Accordion>. Rendering AccordionSummary outside <Accordion> is deprecated and will no longer be supported in the next major version.',
];

describe('<AccordionSummary />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionSummary expandIcon="expand" />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render: (node) => {
      const { container, ...other } = render(
        <Accordion>
          {node}
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      return {
        container: container.firstChild.firstChild,
        ...other,
      };
    },
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiAccordionSummary',
    testVariantProps: { disabled: true },
    testDeepOverrides: { slotName: 'content', slotClassName: classes.content },
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomButtonBase,
      },
      content: {
        expectedClassName: classes.content,
      },
      expandIconWrapper: {
        expectedClassName: classes.expandIconWrapper,
      },
    },
  }));

  it('renders the children inside the .content element', () => {
    render(
      <Accordion>
        <AccordionSummary>The Summary</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(screen.getByText('The Summary')).to.have.class(classes.content);
  });

  it('when disabled should have disabled class', () => {
    render(
      <Accordion disabled>
        <AccordionSummary />
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(screen.getByRole('button')).to.have.class(classes.disabled);
  });

  it('renders the content given in expandIcon prop inside the div.expandIconWrapper', () => {
    render(
      <Accordion>
        <AccordionSummary expandIcon="iconElementContentExample" />
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(screen.getByText('iconElementContentExample')).to.have.class(classes.expandIconWrapper);
  });

  it('when expanded adds the expanded class to the button and .expandIconWrapper', () => {
    render(
      <Accordion expanded>
        <AccordionSummary expandIcon="expand" />
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(classes.expanded);
    expect(button).to.have.attribute('aria-expanded', 'true');
    expect(screen.getByText('expand')).to.have.class(classes.expanded);
  });

  it('should fire onBlur when the button blurs', async () => {
    const handleBlur = spy();
    const { user } = render(
      <Accordion>
        <AccordionSummary onBlur={handleBlur} />
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.tab();
    await user.tab();

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should fire onClick callbacks', async () => {
    const handleClick = spy();
    const { user } = render(
      <Accordion>
        <AccordionSummary onClick={handleClick} />
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick.callCount).to.equal(1);
  });

  it('preserves id and aria-controls props when rendered outside Accordion', () => {
    expect(() => {
      render(<AccordionSummary id="summary-id" aria-controls="region-id" />);
    }).toWarnDev(missingAccordionContextWarning);

    expect(screen.getByRole('button')).to.have.attribute('id', 'summary-id');
    expect(screen.getByRole('button')).to.have.attribute('aria-controls', 'region-id');
  });

  it('preserves slotProps.root id and aria-controls when rendered outside Accordion', () => {
    expect(() => {
      render(
        <AccordionSummary
          slotProps={{ root: { id: 'summary-id', 'aria-controls': 'region-id' } }}
        />,
      );
    }).toWarnDev(missingAccordionContextWarning);

    expect(screen.getByRole('button')).to.have.attribute('id', 'summary-id');
    expect(screen.getByRole('button')).to.have.attribute('aria-controls', 'region-id');
  });

  it('fires onChange of the Accordion if clicked', async () => {
    const handleChange = spy();

    const { user } = render(
      <Accordion onChange={handleChange} expanded={false}>
        <AccordionSummary />
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.click(screen.getByRole('button'));

    expect(handleChange.callCount).to.equal(1);
  });

  // JSDOM doesn't support :focus-visible
  it.skipIf(isJsdom())('calls onFocusVisible if focused visibly', async function test() {
    const handleFocusVisible = spy();
    const { user } = render(
      <Accordion>
        <AccordionSummary onFocusVisible={handleFocusVisible} />
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.tab();

    expect(handleFocusVisible.callCount).to.equal(1);
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} through useSlot to ButtonBase', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Accordion>
          <AccordionSummary component={CustomSpan} nativeButton={false} />
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      expect(summary).to.have.tagName('SPAN');
      expect(summary).to.have.attribute('aria-expanded', 'false');
      expect(summary).not.to.have.attribute('type');

      // Proves nativeButton={false} was forwarded — without it, ButtonBase
      // would warn about a non-button host with nativeButton omitted.
      expect(errorSpy.mock.calls.length).to.equal(0);
      errorSpy.mockRestore();
    });
  });
});
