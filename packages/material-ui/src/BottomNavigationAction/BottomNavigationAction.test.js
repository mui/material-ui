import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender, within } from 'test/utils/createClientRender';
import ButtonBase from '../ButtonBase';
import BottomNavigationAction from './BottomNavigationAction';

describe('<BottomNavigationAction />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<BottomNavigationAction />);
  });

  describeConformance(<BottomNavigationAction />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
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

    expect(within(getByRole('button')).getByTestId('icon')).not.to.equal(null);
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
