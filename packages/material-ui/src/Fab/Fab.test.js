import * as React from 'react';
import { expect } from 'chai';
import {
  getClasses,
  describeConformance,
  createClientRender,
  createMount,
  createServerRender,
  act,
  fireEvent,
} from 'test/utils';
import Fab from './Fab';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import TouchRipple from '../ButtonBase/TouchRipple';

describe('<Fab />', () => {
  const mount = createMount();
  const render = createClientRender({ strict: false });
  let classes;

  before(() => {
    classes = getClasses(<Fab>Fab</Fab>);
  });

  describeConformance(<Fab>Conformance?</Fab>, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
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

  it('should have a ripple by default', () => {
    const touchRippleClasses = getClasses(<TouchRipple />);
    const { container } = render(<Fab>Fab</Fab>);

    expect(container.querySelector(`.${touchRippleClasses.root}`)).not.to.equal(null);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const touchRippleClasses = getClasses(<TouchRipple />);
    const { container } = render(<Fab disableRipple>Fab</Fab>);

    expect(container.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
  });

  it('should have a focusRipple by default', async () => {
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

    act(() => {
      fireEvent.keyDown(document.body, { key: 'TAB' });
      button.focus();
    });

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

    act(() => {
      fireEvent.keyDown(document.body, { key: 'TAB' });
      button.focus();
    });

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
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
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }
    const serverRender = createServerRender({ expectUseLayoutEffectWarning: true });

    it('should server-side render', () => {
      const markup = serverRender(<Fab>Fab</Fab>);
      expect(markup.text()).to.equal('Fab');
    });
  });
});
