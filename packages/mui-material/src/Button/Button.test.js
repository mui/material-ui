import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen, simulateKeyboardDevice } from '@mui/internal-test-utils';
import { ClassNames } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button, { buttonClasses as classes } from '@mui/material/Button';
import ButtonBase, { touchRippleClasses } from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Button />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<Button startIcon="icon">Conformance?</Button>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiButton',
    testDeepOverrides: { slotName: 'startIcon', slotClassName: classes.startIcon },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentsProp'],
  }));

  it('should render with the root, text, and textPrimary classes but no others', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).to.have.class(classes.textPrimary);
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

  it('startIcon and endIcon should have icon class', () => {
    const { getByRole } = render(
      <Button startIcon={<span>start icon</span>} endIcon={<span>end icon</span>}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');
    const startIcon = button.querySelector(`.${classes.startIcon}`);
    const endIcon = button.querySelector(`.${classes.endIcon}`);
    expect(startIcon).to.have.class(classes.icon);
    expect(endIcon).to.have.class(classes.icon);
  });

  it('should add the appropriate color class to root element based on color prop', () => {
    const { getByTestId } = render(
      <React.Fragment>
        <Button color="inherit" data-testid="color-inherit">
          Hello World
        </Button>
        <Button color="primary" data-testid="color-primary">
          Hello World
        </Button>
        <Button color="secondary" data-testid="color-secondary">
          Hello World
        </Button>
        <Button color="success" data-testid="color-success">
          Hello World
        </Button>
        <Button color="error" data-testid="color-error">
          Hello World
        </Button>
        <Button color="info" data-testid="color-info">
          Hello World
        </Button>
        <Button color="warning" data-testid="color-warning">
          Hello World
        </Button>
      </React.Fragment>,
    );

    expect(getByTestId('color-inherit')).to.have.class(classes.colorInherit);
    expect(getByTestId('color-primary')).to.have.class(classes.colorPrimary);
    expect(getByTestId('color-secondary')).to.have.class(classes.colorSecondary);
    expect(getByTestId('color-success')).to.have.class(classes.colorSuccess);
    expect(getByTestId('color-error')).to.have.class(classes.colorError);
    expect(getByTestId('color-info')).to.have.class(classes.colorInfo);
    expect(getByTestId('color-warning')).to.have.class(classes.colorWarning);
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

  it('should render a text success button', () => {
    render(<Button color="success">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.textError);
    expect(button).not.to.have.class(classes.textInfo);
    expect(button).not.to.have.class(classes.textWarning);
    expect(button).to.have.class(classes.textSuccess);
  });

  it('should render a text error button', () => {
    render(<Button color="error">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.textSuccess);
    expect(button).not.to.have.class(classes.textInfo);
    expect(button).not.to.have.class(classes.textWarning);
    expect(button).to.have.class(classes.textError);
  });

  it('should render a text info button', () => {
    render(<Button color="info">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.textSuccess);
    expect(button).not.to.have.class(classes.textError);
    expect(button).not.to.have.class(classes.textWarning);
    expect(button).to.have.class(classes.textInfo);
  });

  it('should render a text warning button', () => {
    render(<Button color="warning">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.textSuccess);
    expect(button).not.to.have.class(classes.textError);
    expect(button).not.to.have.class(classes.textInfo);
    expect(button).to.have.class(classes.textWarning);
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

  it('should render a success outlined button', () => {
    render(
      <Button variant="outlined" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlinedInfo);
    expect(button).not.to.have.class(classes.outlinedWarning);
    expect(button).not.to.have.class(classes.outlinedError);
    expect(button).to.have.class(classes.outlinedSuccess);
  });

  it('should render a error outlined button', () => {
    render(
      <Button variant="outlined" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.outlinedSecondary);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlinedSuccess);
    expect(button).not.to.have.class(classes.outlinedInfo);
    expect(button).not.to.have.class(classes.outlinedWarning);
    expect(button).to.have.class(classes.outlinedError);
  });

  it('should render a info outlined button', () => {
    render(
      <Button variant="outlined" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.outlinedSecondary);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlinedSuccess);
    expect(button).not.to.have.class(classes.outlinedWarning);
    expect(button).not.to.have.class(classes.outlinedError);
    expect(button).to.have.class(classes.outlinedInfo);
  });

  it('should render a warning outlined button', () => {
    render(
      <Button variant="outlined" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.outlinedSecondary);
    expect(button).not.to.have.class(classes.text);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.outlinedSuccess);
    expect(button).not.to.have.class(classes.outlinedInfo);
    expect(button).not.to.have.class(classes.outlinedError);
    expect(button).to.have.class(classes.outlinedWarning);
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
    expect(button).not.to.have.class(classes.containedSuccess);
    expect(button).not.to.have.class(classes.containedError);
    expect(button).not.to.have.class(classes.containedInfo);
    expect(button).not.to.have.class(classes.containedWarning);
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
    expect(button).not.to.have.class(classes.containedSuccess);
    expect(button).not.to.have.class(classes.containedError);
    expect(button).not.to.have.class(classes.containedInfo);
    expect(button).not.to.have.class(classes.containedWarning);
  });

  it('should render a contained success button', () => {
    render(
      <Button variant="contained" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.containedPrimary);
    expect(button).not.to.have.class(classes.containedSecondary);
    expect(button).not.to.have.class(classes.containedError);
    expect(button).not.to.have.class(classes.containedInfo);
    expect(button).not.to.have.class(classes.containedWarning);
    expect(button).to.have.class(classes.containedSuccess);
  });

  it('should render a contained error button', () => {
    render(
      <Button variant="contained" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.containedPrimary);
    expect(button).not.to.have.class(classes.containedSecondary);
    expect(button).not.to.have.class(classes.containedInfo);
    expect(button).not.to.have.class(classes.containedSuccess);
    expect(button).not.to.have.class(classes.containedWarning);
    expect(button).to.have.class(classes.containedError);
  });

  it('should render a contained info button', () => {
    render(
      <Button variant="contained" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.containedPrimary);
    expect(button).not.to.have.class(classes.containedSecondary);
    expect(button).not.to.have.class(classes.containedSuccess);
    expect(button).not.to.have.class(classes.containedError);
    expect(button).not.to.have.class(classes.containedWarning);
    expect(button).to.have.class(classes.containedInfo);
  });

  it('should render a contained warning button', () => {
    render(
      <Button variant="contained" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.text);
    expect(button).to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.containedPrimary);
    expect(button).not.to.have.class(classes.containedSecondary);
    expect(button).not.to.have.class(classes.containedSuccess);
    expect(button).not.to.have.class(classes.containedError);
    expect(button).not.to.have.class(classes.containedInfo);
    expect(button).to.have.class(classes.containedWarning);
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
    const startIcon = button.querySelector(`.${classes.startIcon}`);

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(startIcon).not.to.have.class(classes.endIcon);
  });

  it('should render a button with endIcon', () => {
    const { getByRole } = render(<Button endIcon={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const endIcon = button.querySelector(`.${classes.endIcon}`);

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(endIcon).not.to.have.class(classes.startIcon);
  });

  it('should have a ripple', async () => {
    const { getByRole } = render(
      <Button TouchRippleProps={{ className: 'touch-ripple' }}>Hello World</Button>,
    );
    const button = getByRole('button');
    await ripple.startTouch(button);
    expect(button.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', async () => {
    const { getByRole } = render(
      <Button disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');
    await ripple.startTouch(button);
    expect(button.querySelector('.touch-ripple')).to.equal(null);
  });

  it('can disable the elevation', () => {
    const { getByRole } = render(<Button disableElevation>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.disableElevation);
  });

  it('should have a focusRipple', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const { getByRole } = render(
      <Button TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    simulateKeyboardDevice();
    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  it('can disable the focusRipple', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const { getByRole } = render(
      <Button
        disableFocusRipple
        TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}
      >
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    simulateKeyboardDevice();
    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  describe('server-side', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    it('should server-side render', () => {
      const { container } = renderToString(<Button>Hello World</Button>);
      expect(container.firstChild).to.have.text('Hello World');
    });
  });

  it('should automatically change the button to an anchor element when href is provided', () => {
    const { container } = render(<Button href="https://google.com">Hello</Button>);
    const button = container.firstChild;

    expect(button).to.have.property('nodeName', 'A');
    expect(button).not.to.have.attribute('role');
    expect(button).not.to.have.attribute('type');
    expect(button).to.have.attribute('href', 'https://google.com');
  });

  it('should forward classes to ButtonBase', () => {
    const disabledClassName = 'testDisabledClassName';
    const { container } = render(<Button disabled classes={{ disabled: disabledClassName }} />);

    expect(container.querySelector('button')).to.have.class(disabledClassName);
  });

  it("should disable ripple when MuiButtonBase has disableRipple in theme's defaultProps", () => {
    const theme = createTheme({
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button>Disabled ripple</Button>
      </ThemeProvider>,
    );
    expect(container.firstChild.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
  });

  it("should disable ripple when MuiButtonBase has disableRipple in theme's defaultProps but override on the individual Buttons if provided", async () => {
    const theme = createTheme({
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button disableRipple={false}>Enabled ripple</Button>
        <Button>Disabled ripple 1</Button>
        <Button>Disabled ripple 2</Button>
      </ThemeProvider>,
    );
    await ripple.startTouch(container.querySelector('button'));
    expect(container.querySelectorAll(`.${touchRippleClasses.root}`)).to.have.length(1);
  });

  describe('Emotion compatibility', () => {
    it('classes.root should overwrite builtin styles.', () => {
      // This is pink
      const color = 'rgb(255, 192, 204)';

      const { getByRole } = render(
        <ClassNames>
          {({ css }) => (
            <Button color="primary" classes={{ root: css({ color }) }}>
              This text should be pink
            </Button>
          )}
        </ClassNames>,
      );
      const button = getByRole('button');

      expect(getComputedStyle(button).color).to.equal(color);
    });

    it('className should overwrite classes.root and builtin styles.', () => {
      const colorPink = 'rgb(255, 192, 204)';
      const colorRed = 'rgb(255, 0, 0)';

      const { getByRole } = render(
        <ClassNames>
          {({ css }) => (
            <Button
              color="primary"
              className={css({ color: colorRed })}
              classes={{ root: css({ color: colorPink }) }}
            >
              This text should be red
            </Button>
          )}
        </ClassNames>,
      );
      const button = getByRole('button');

      expect(getComputedStyle(button).color).to.equal(colorRed);
    });

    it('classes.* should overwrite builtin styles.', () => {
      // This is pink
      const color = 'rgb(255, 192, 204)';

      const { getByRole } = render(
        <ClassNames>
          {({ css }) => (
            <Button color="primary" classes={{ text: css({ color }) }}>
              This text should be pink
            </Button>
          )}
        </ClassNames>,
      );
      const button = getByRole('button');

      expect(getComputedStyle(button).color).to.equal(color);
    });
  });
});
