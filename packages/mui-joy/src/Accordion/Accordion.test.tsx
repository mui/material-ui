import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Accordion, { accordionClasses as classes } from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import describeConformance from '../../test/describeConformance';

describe('<Accordion />', () => {
  const { render } = createRenderer();

  describeConformance(<Accordion />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyAccordion',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should render and not be controlled', () => {
    const { container } = render(
      <Accordion>
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );
    expect(container.firstChild).not.to.have.class(classes.expanded);
  });

  it('should handle defaultExpanded prop', () => {
    const { container } = render(
      <Accordion defaultExpanded>
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );
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
      <Accordion expanded>
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );
    const panel = container.firstChild;
    expect(panel).to.have.class(classes.expanded);
    setProps({ expanded: false });
    expect(panel).not.to.have.class(classes.expanded);
  });

  it('should be disabled', () => {
    const { getByRole } = render(
      <Accordion disabled>
        <AccordionSummary>Summary</AccordionSummary>
      </Accordion>,
    );
    expect(getByRole('button')).to.have.class(classes.disabled);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const { getByText } = render(
      <Accordion onChange={handleChange}>
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const { getByText } = render(
      <Accordion onChange={handleChange} expanded>
        <AccordionSummary>Header</AccordionSummary>
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
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );
    setProps({ onChange: undefined });
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(0);
  });

  it('when disabled should have the disabled class', () => {
    const { container } = render(
      <Accordion disabled>
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should warn when switching from controlled to uncontrolled', () => {
    const wrapper = render(
      <Accordion expanded>
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );

    expect(() => wrapper.setProps({ expanded: undefined })).to.toErrorDev(
      'MUI: A component is changing the controlled expanded state of Accordion to be uncontrolled.',
    );
  });

  it('should warn when switching between uncontrolled to controlled', () => {
    const { setProps } = render(
      <Accordion>
        <AccordionSummary>Header</AccordionSummary>
      </Accordion>,
    );

    expect(() => setProps({ expanded: true })).toErrorDev(
      'MUI: A component is changing the uncontrolled expanded state of Accordion to be controlled.',
    );
  });
});
