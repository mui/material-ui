import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender, within } from 'test/utils/createClientRender';
import ButtonBase from '../ButtonBase';
import BottomNavigationAction from './BottomNavigationAction';

describe('<BottomNavigationAction />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<BottomNavigationAction />);
  });

  describeConformance(<BottomNavigationAction />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  it('adds a `selected` class when selected', () => {
    const { getByRole } = render(<BottomNavigationAction selected />);

    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should render label with the selected class when selected', () => {
    const { container } = render(<BottomNavigationAction selected />);

    expect(container.querySelector(`.${classes.label}`)).to.have.class(classes.selected);
  });

  it('adds a `iconOnly` class by default', () => {
    const { getByRole } = render(<BottomNavigationAction />);

    expect(getByRole('button')).to.have.class(classes.iconOnly);
  });

  it('should render label with the `iconOnly` class', () => {
    const { container } = render(<BottomNavigationAction />);

    expect(container.querySelector(`.${classes.label}`)).to.have.class(classes.iconOnly);
  });

  it('removes the `iconOnly` class when `selected`', () => {
    const { getByRole } = render(<BottomNavigationAction selected />);

    expect(getByRole('button')).not.to.have.class(classes.iconOnly);
  });

  it('removes the `iconOnly` class when `showLabel`', () => {
    const { getByRole } = render(<BottomNavigationAction showLabel />);

    expect(getByRole('button')).not.to.have.class(classes.iconOnly);
  });

  it('should render the passed `icon`', () => {
    const { getByRole } = render(<BottomNavigationAction icon={<div data-testid="icon" />} />);

    expect(within(getByRole('button')).getByTestId('icon')).to.be.ok;
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const { getByRole } = render(<BottomNavigationAction onClick={handleClick} />);

      getByRole('button').click();

      expect(handleClick.callCount).to.equal(1);
    });
  });
});
