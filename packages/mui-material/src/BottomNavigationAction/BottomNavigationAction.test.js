import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, within, screen } from '@mui/internal-test-utils';
import BottomNavigationAction, {
  bottomNavigationActionClasses as classes,
} from '@mui/material/BottomNavigationAction';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

const CustomButtonBase = React.forwardRef(({ focusRipple, ...props }, ref) => (
  <ButtonBase ref={ref} {...props} />
));

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
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomButtonBase,
      },
      label: {
        expectedClassName: classes.label,
      },
    },
  }));

  it('adds a `selected` class when selected', () => {
    render(<BottomNavigationAction selected />);

    expect(screen.getByRole('button')).to.have.class(classes.selected);
  });

  it('should render label with the selected class when selected', () => {
    const { container } = render(<BottomNavigationAction selected />);

    expect(container.querySelector(`.${classes.label}`)).to.have.class(classes.selected);
  });

  it('adds a `iconOnly` class by default', () => {
    render(<BottomNavigationAction />);

    expect(screen.getByRole('button')).to.have.class(classes.iconOnly);
  });

  it('should render label with the `iconOnly` class', () => {
    const { container } = render(<BottomNavigationAction />);

    expect(container.querySelector(`.${classes.label}`)).to.have.class(classes.iconOnly);
  });

  it('removes the `iconOnly` class when `selected`', () => {
    render(<BottomNavigationAction selected />);

    expect(screen.getByRole('button')).not.to.have.class(classes.iconOnly);
  });

  it('removes the `iconOnly` class when `showLabel`', () => {
    render(<BottomNavigationAction showLabel />);

    expect(screen.getByRole('button')).not.to.have.class(classes.iconOnly);
  });

  it('should render the passed `icon`', () => {
    render(<BottomNavigationAction icon={<div data-testid="icon" />} />);

    expect(within(screen.getByRole('button')).getByTestId('icon')).not.to.equal(null);
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      render(<BottomNavigationAction onClick={handleClick} />);

      screen.getByRole('button').click();

      expect(handleClick.callCount).to.equal(1);
    });
  });
});
