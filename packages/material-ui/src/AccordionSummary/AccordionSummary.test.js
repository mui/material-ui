import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  getClasses,
  createMount,
  describeConformance,
  act,
  createClientRender,
  fireEvent,
} from 'test/utils';
import Accordion from '../Accordion';
import AccordionSummary from './AccordionSummary';
import ButtonBase from '../ButtonBase';

describe('<AccordionSummary />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<AccordionSummary />);
  });

  describeConformance(<AccordionSummary />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
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

  it('when expanded adds the expanded class to the button and expandIcon', () => {
    const { container, getByRole } = render(
      <Accordion expanded>
        <AccordionSummary expandIcon="expand" />
      </Accordion>,
    );

    const button = getByRole('button');
    expect(button).to.have.class(classes.expanded);
    expect(button).to.have.attribute('aria-expanded', 'true');
    expect(container.querySelector(`.${classes.expandIcon}`)).to.have.class(classes.expanded);
  });

  it('when expanded adds both the expanded class and the className provided with `IconButtonProps` to the expandIcon', () => {
    const iconButtonProps = { className: 'icon' };
    const { container } = render(
      <Accordion expanded>
        <AccordionSummary expandIcon="expand" IconButtonProps={iconButtonProps} />
      </Accordion>,
    );

    const expandIcon = container.querySelector(`.${classes.expandIcon}`);
    expect(expandIcon).to.have.class(classes.expanded);
    expect(expandIcon).to.have.class(iconButtonProps.className);
  });

  it('should render with an inaccessible expand icon and have the expandIcon class', () => {
    const { container } = render(<AccordionSummary expandIcon={<div>Icon</div>} />);

    const expandIcon = container.querySelector(`.${classes.expandIcon}`);
    expect(expandIcon).to.have.text('Icon');
    expect(expandIcon).toBeInaccessible();
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
      <Accordion onChange={handleChange}>
        <AccordionSummary />
      </Accordion>,
    );

    act(() => {
      getByRole('button').click();
    });

    expect(handleChange.callCount).to.equal(1);
  });

  it('calls onFocusVisible if focused visibly', () => {
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
