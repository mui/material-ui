import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import ExpansionPanel from '../ExpansionPanel';
import ExpansionPanelSummary from './ExpansionPanelSummary';
import ButtonBase from '../ButtonBase';

describe('<ExpansionPanelSummary />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    // requires mocking the TransitionComponent of `ExpansionPanel`
    mount = createMount({ strict: true });
    classes = getClasses(<ExpansionPanelSummary />);
  });

  describeConformance(<ExpansionPanelSummary />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  it('renders the children inside the .content element', () => {
    const { container } = render(<ExpansionPanelSummary>The Summary</ExpansionPanelSummary>);

    expect(container.querySelector(`.${classes.content}`)).to.have.text('The Summary');
  });

  it('when disabled should have disabled class', () => {
    const { getByRole } = render(
      <ExpansionPanel disabled TransitionComponent={({ children }) => children}>
        <ExpansionPanelSummary />
      </ExpansionPanel>,
    );

    expect(getByRole('button')).to.have.class(classes.disabled);
  });

  it('when expanded adds the expanded class to the button and expandIcon', () => {
    const { container, getByRole } = render(
      <ExpansionPanel expanded TransitionComponent={({ children }) => children}>
        <ExpansionPanelSummary expandIcon="expand" />
      </ExpansionPanel>,
    );

    const button = getByRole('button');
    expect(button).to.have.class(classes.expanded);
    expect(button).to.have.attribute('aria-expanded', 'true');
    expect(container.querySelector(`.${classes.expandIcon}`)).to.have.class(classes.expanded);
  });

  it('should render with an inaccessible expand icon and have the expandIcon class', () => {
    const { container } = render(<ExpansionPanelSummary expandIcon={<div>Icon</div>} />);

    const expandIcon = container.querySelector(`.${classes.expandIcon}`);
    expect(expandIcon).to.have.text('Icon');
    expect(expandIcon).toBeInaccessible();
  });

  it('focusing adds the `focused` class if focused visible', () => {
    // TODO: Rename `focused` -> `focus-visible`
    // `focused` is a global state which is applied on focus
    // only here do we constrain it to focus-visible. THe name is also not consistent
    // with :focus
    const { getByRole } = render(<ExpansionPanelSummary />);
    fireEvent.mouseDown(document.body); // pointer device
    const button = getByRole('button');

    fireEvent.keyDown(document.body, { key: 'Tab' }); // not actually focusing (yet)
    button.focus();

    expect(button).toHaveFocus();
    expect(button).to.have.class(classes.focused);
  });

  it('blur should unset focused state', () => {
    const { getByRole } = render(<ExpansionPanelSummary />);
    fireEvent.mouseDown(document.body); // pointer device
    fireEvent.keyDown(document.body, { key: 'Tab' }); // not actually focusing (yet)
    const button = getByRole('button');
    button.focus();

    button.blur();

    expect(button).not.toHaveFocus();
    expect(button).not.to.have.class(classes.focused);
  });

  it('should fire onClick callbacks', () => {
    const handleClick = spy();
    const { getByRole } = render(<ExpansionPanelSummary onClick={handleClick} />);

    getByRole('button').click();

    expect(handleClick.callCount).to.equal(1);
  });

  it('fires onChange of the ExpansionPanel if clicked', () => {
    const handleChange = spy();
    const { getByRole } = render(
      <ExpansionPanel onChange={handleChange} TransitionComponent={({ children }) => children}>
        <ExpansionPanelSummary />
      </ExpansionPanel>,
    );

    getByRole('button').click();

    expect(handleChange.callCount).to.equal(1);
  });

  it('calls onFocusVisible if focused visibly', () => {
    const handleFocusVisible = spy();
    const { getByRole } = render(<ExpansionPanelSummary onFocusVisible={handleFocusVisible} />);
    // simulate pointer device
    fireEvent.mouseDown(document.body);

    // this doesn't actually apply focus like in the browser. we need to move focus manually
    fireEvent.keyDown(document.body, { key: 'Tab' });
    getByRole('button').focus();

    expect(handleFocusVisible.callCount).to.equal(1);
  });
});
