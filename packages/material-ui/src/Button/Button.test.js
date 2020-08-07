import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import createServerRender from 'test/utils/createServerRender';
import Button from './Button';
import ButtonBase from '../ButtonBase';

describe('<Button />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<Button>Hello World</Button>);
  });

  describeConformance(<Button>Conformance?</Button>, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should render with the root & text classes but no others', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.outlinedPrimary);
    expect(button).not.to.have.class(classes.outlinedSecondary);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.containedPrimary);
    expect(button).not.to.have.class(classes.containedSecondary);
    expect(button).not.to.have.class(classes.textSizeSmall);
    expect(button).not.to.have.class(classes.textSizeLarge);
    expect(button).not.to.have.class(classes.outlinedSizeSmall);
    expect(button).not.to.have.class(classes.outlinedSizeLarge);
    expect(button).not.to.have.class(classes.containedSizeSmall);
    expect(button).not.to.have.class(classes.containedSizeLarge);
  });

  it('can render a text primary button', () => {
    const { getByRole } = render(<Button color="primary">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.contained);
    expect(button).to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
  });

  it('should render a text secondary button', () => {
    const { getByRole } = render(<Button color="secondary">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).to.have.class(classes.textSecondary);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<Button variant="outlined">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.text);
  });

  it('should render a primary outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="primary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).to.have.class(classes.outlinedPrimary);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.contained);
  });

  it('should render a secondary outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="secondary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).to.have.class(classes.outlinedSecondary);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.contained);
  });

  it('should render an inherit outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="inherit">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).to.have.class(classes.colorInherit);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.contained);
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<Button variant="contained">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).to.have.class(classes.contained);
  });

  it('should render a contained primary button', () => {
    const { getByRole } = render(
      <Button variant="contained" color="primary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).to.have.class(classes.containedPrimary);
    expect(button).not.to.have.class(classes.containedSecondary);
  });

  it('should render a contained secondary button', () => {
    const { getByRole } = render(
      <Button variant="contained" color="secondary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.containedPrimary);
    expect(button).to.have.class(classes.containedSecondary);
  });

  it('should render a small text button', () => {
    const { getByRole } = render(<Button size="small">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).to.have.class(classes.textSizeSmall);
    expect(button).not.to.have.class(classes.textSizeLarge);
    expect(button).not.to.have.class(classes.outlinedSizeSmall);
    expect(button).not.to.have.class(classes.outlinedSizeLarge);
    expect(button).not.to.have.class(classes.containedSizeSmall);
    expect(button).not.to.have.class(classes.containedSizeLarge);
  });

  it('should render a large text button', () => {
    const { getByRole } = render(<Button size="large">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textSizeSmall);
    expect(button).to.have.class(classes.textSizeLarge);
    expect(button).not.to.have.class(classes.outlinedSizeSmall);
    expect(button).not.to.have.class(classes.outlinedSizeLarge);
    expect(button).not.to.have.class(classes.containedSizeSmall);
    expect(button).not.to.have.class(classes.containedSizeLarge);
  });

  it('should render a small outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" size="small">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.textSizeSmall);
    expect(button).not.to.have.class(classes.textSizeLarge);
    expect(button).to.have.class(classes.outlinedSizeSmall);
    expect(button).not.to.have.class(classes.outlinedSizeLarge);
    expect(button).not.to.have.class(classes.containedSizeSmall);
    expect(button).not.to.have.class(classes.containedSizeLarge);
  });

  it('should render a large outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" size="large">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.textSizeSmall);
    expect(button).not.to.have.class(classes.textSizeLarge);
    expect(button).not.to.have.class(classes.outlinedSizeSmall);
    expect(button).to.have.class(classes.outlinedSizeLarge);
    expect(button).not.to.have.class(classes.containedSizeSmall);
    expect(button).not.to.have.class(classes.containedSizeLarge);
  });

  it('should render a small contained button', () => {
    const { getByRole } = render(
      <Button variant="contained" size="small">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.textSizeSmall);
    expect(button).not.to.have.class(classes.textSizeLarge);
    expect(button).not.to.have.class(classes.outlinedSizeSmall);
    expect(button).not.to.have.class(classes.outlinedSizeLarge);
    expect(button).to.have.class(classes.containedSizeSmall);
    expect(button).not.to.have.class(classes.containedSizeLarge);
  });

  it('should render a large contained button', () => {
    const { getByRole } = render(
      <Button variant="contained" size="large">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.textSizeSmall);
    expect(button).not.to.have.class(classes.textSizeLarge);
    expect(button).not.to.have.class(classes.outlinedSizeSmall);
    expect(button).not.to.have.class(classes.outlinedSizeLarge);
    expect(button).not.to.have.class(classes.containedSizeSmall);
    expect(button).to.have.class(classes.containedSizeLarge);
  });

  it('should render a button with startIcon', () => {
    const { getByRole } = render(<Button startIcon={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const label = button.querySelector(`.${classes.label}`);

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(label.firstChild).not.to.have.class(classes.endIcon);
    expect(label.firstChild).to.have.class(classes.startIcon);
  });

  it('should render a button with endIcon', () => {
    const { getByRole } = render(<Button endIcon={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const label = button.querySelector(`.${classes.label}`);

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(label.lastChild).not.to.have.class(classes.startIcon);
    expect(label.lastChild).to.have.class(classes.endIcon);
  });

  it('should have a ripple by default', () => {
    const { getByRole } = render(
      <Button TouchRippleProps={{ className: 'touch-ripple' }}>Hello World</Button>,
    );
    const button = getByRole('button');

    expect(button.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', () => {
    const { getByRole } = render(
      <Button disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button.querySelector('.touch-ripple')).to.equal(null);
  });

  it('can disable the elevation', () => {
    const { getByRole } = render(<Button disableElevation>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.disableElevation);
  });

  it('should have a focusRipple by default', () => {
    const { getByRole } = render(
      <Button TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    act(() => {
      fireEvent.keyDown(document.body, { key: 'TAB' });
      button.focus();
    });

    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  it('can disable the focusRipple', () => {
    const { getByRole } = render(
      <Button
        disableFocusRipple
        TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}
      >
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    act(() => {
      fireEvent.keyDown(document.body, { key: 'TAB' });
      button.focus();
    });

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    const serverRender = createServerRender({ expectUseLayoutEffectWarning: true });

    it('should server-side render', () => {
      const markup = serverRender(<Button>Hello World</Button>);
      expect(markup.text()).to.equal('Hello World');
    });
  });
});
