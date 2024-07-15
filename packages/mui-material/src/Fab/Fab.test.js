import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Fab, { fabClasses as classes } from '@mui/material/Fab';
import ButtonBase, { touchRippleClasses } from '@mui/material/ButtonBase';
import Icon from '@mui/material/Icon';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Fab />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<Fab>Conformance?</Fab>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiFab',
    testVariantProps: { variant: 'extended' },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentsProp'],
  }));

  it('should render with the root class but no others', () => {
    const { getByRole } = render(<Fab>Fab</Fab>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.primary);
    expect(button).not.to.have.class(classes.secondary);
    expect(button).not.to.have.class(classes.extended);
    expect(button).not.to.have.class(classes.focusVisible);
    expect(button).not.to.have.class(classes.disabled);
    expect(button).not.to.have.class(classes.colorInherit);
    expect(button).not.to.have.class(classes.fullWidth);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeMedium);
  });

  it('should render an extended floating action button', () => {
    const { getByRole } = render(<Fab variant="extended">Fab</Fab>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.extended);
  });

  it('should render a primary floating action button', () => {
    const { getByRole } = render(<Fab color="primary">Fab</Fab>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.primary);
    expect(button).not.to.have.class(classes.secondary);
  });

  it('should render a secondary floating action button', () => {
    const { getByRole } = render(<Fab color="secondary">Fab</Fab>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.primary);
    expect(button).to.have.class(classes.secondary);
  });
  ['info', 'error', 'warning', 'success'].forEach((color) => {
    it(`should render a ${color} floating action button`, () => {
      const { getByRole } = render(<Fab color={color}>Fab</Fab>);
      const button = getByRole('button');

      expect(button).to.have.class(classes.root);
      expect(button).not.to.have.class(classes.primary);
      expect(button).to.have.class(classes[color]);
    });
  });

  it('should render a small floating action button', () => {
    const { getByRole } = render(<Fab size="small">Fab</Fab>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeMedium);
  });

  it('should render a medium floating action button', () => {
    const { getByRole } = render(<Fab size="medium">Fab</Fab>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).to.have.class(classes.sizeMedium);
  });

  it('should have a ripple', async () => {
    const { container, getByRole } = render(<Fab>Fab</Fab>);
    await ripple.startTouch(getByRole('button'));
    expect(container.querySelector(`.${touchRippleClasses.root}`)).not.to.equal(null);
  });

  it('should pass disableRipple to ButtonBase', async () => {
    const { container, getByRole } = render(<Fab disableRipple>Fab</Fab>);
    await ripple.startTouch(getByRole('button'));
    expect(container.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
  });

  it('should have a focusRipple', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const { getByRole } = render(
      <Fab
        TouchRippleProps={{
          classes: { ripplePulsate: 'pulsate-focus-visible' },
        }}
      >
        Fab
      </Fab>,
    );
    const button = getByRole('button');

    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  it('should pass disableFocusRipple to ButtonBase', async () => {
    const { getByRole } = render(
      <Fab
        TouchRippleProps={{
          classes: { ripplePulsate: 'pulsate-focus-visible' },
        }}
        disableFocusRipple
      >
        Fab
      </Fab>,
    );
    const button = getByRole('button');

    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  it('should pass disabled class to ButtonBase', () => {
    const disabledClassName = 'testDisabledClassName';
    const { container } = render(<Fab disabled classes={{ disabled: disabledClassName }} />);

    expect(container.querySelector('button')).to.have.class(disabledClassName);
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon data-testid="icon" className={childClassName} />;
    const { getByTestId } = render(<Fab>{iconChild}</Fab>);
    const renderedIconChild = getByTestId('icon');

    expect(renderedIconChild).not.to.equal(null);
    expect(renderedIconChild).to.have.class(childClassName);
  });

  describe('server-side', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    it('should server-side render', () => {
      const { container } = renderToString(<Fab>Fab</Fab>);
      expect(container.firstChild).to.have.text('Fab');
    });
  });
});
