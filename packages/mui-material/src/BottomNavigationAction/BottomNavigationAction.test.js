import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, within } from '@mui/internal-test-utils';
import BottomNavigationAction, {
  bottomNavigationActionClasses as classes,
} from '@mui/material/BottomNavigationAction';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

describe('<BottomNavigationAction />', () => {
  const { render } = createRenderer();

  describeConformance(<BottomNavigationAction />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiBottomNavigationAction',
    refInstanceof: window.HTMLButtonElement,
    testVariantProps: { showLabel: true },
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    skip: ['componentProp', 'componentsProp'],
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
