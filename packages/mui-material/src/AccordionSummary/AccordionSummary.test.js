import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent } from '@mui/internal-test-utils';
import AccordionSummary, {
  accordionSummaryClasses as classes,
} from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

const CustomButtonBase = React.forwardRef(({ focusVisible, ...props }, ref) => (
  <ButtonBase ref={ref} {...props} />
));

describe('<AccordionSummary />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionSummary expandIcon="expand" />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiAccordionSummary',
    testVariantProps: { disabled: true },
    testDeepOverrides: { slotName: 'content', slotClassName: classes.content },
    skip: ['componentProp', 'componentsProp'],
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
    const { container } = render(<AccordionSummary>The Summary</AccordionSummary>);

    expect(container.querySelector(`.${classes.content}`)).to.have.text('The Summary');
  });

  it('when disabled should have disabled class', () => {
    const { getByRole } = render(
      <Accordion disabled>
        <AccordionSummary />
      </Accordion>,
    );

    expect(getByRole('button')).to.have.class(classes.disabled);
  });

  it('renders the content given in expandIcon prop inside the div.expandIconWrapper', () => {
    const { container } = render(<AccordionSummary expandIcon="iconElementContentExample" />);

    const expandIconWrapper = container.querySelector(`.${classes.expandIconWrapper}`);
    expect(expandIconWrapper).to.have.text('iconElementContentExample');
  });

  it('when expanded adds the expanded class to the button and .expandIconWrapper', () => {
    const { container, getByRole } = render(
      <Accordion expanded>
        <AccordionSummary expandIcon="expand" />
      </Accordion>,
    );

    const button = getByRole('button');
    expect(button).to.have.class(classes.expanded);
    expect(button).to.have.attribute('aria-expanded', 'true');
    expect(container.querySelector(`.${classes.expandIconWrapper}`)).to.have.class(
      classes.expanded,
    );
  });

  it('should fire onBlur when the button blurs', () => {
    const handleBlur = spy();
    const { getByRole } = render(<AccordionSummary onBlur={handleBlur} />);

    act(() => {
      const button = getByRole('button');
      button.focus();
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should fire onClick callbacks', () => {
    const handleClick = spy();
    const { getByRole } = render(<AccordionSummary onClick={handleClick} />);

    getByRole('button').click();

    expect(handleClick.callCount).to.equal(1);
  });

  it('fires onChange of the Accordion if clicked', () => {
    const handleChange = spy();
    const { getByRole } = render(
      <Accordion onChange={handleChange} expanded={false}>
        <AccordionSummary />
      </Accordion>,
    );

    act(() => {
      getByRole('button').click();
    });

    expect(handleChange.callCount).to.equal(1);
  });

  it('calls onFocusVisible if focused visibly', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const handleFocusVisible = spy();
    const { getByRole } = render(<AccordionSummary onFocusVisible={handleFocusVisible} />);
    // simulate pointer device
    fireEvent.mouseDown(document.body);

    // this doesn't actually apply focus like in the browser. we need to move focus manually
    fireEvent.keyDown(document.body, { key: 'Tab' });
    act(() => {
      getByRole('button').focus();
    });

    expect(handleFocusVisible.callCount).to.equal(1);
  });
});
