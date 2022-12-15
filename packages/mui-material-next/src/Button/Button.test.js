import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, fireEvent } from 'test/utils';
import Button, { buttonClasses as classes } from '@mui/material-next/Button';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';

describe('<Button />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<Button startIcon="icon">Conformance?</Button>, () => ({
    classes,
    render,
    inheritComponent: 'button',
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiButton',
    testDeepOverrides: { slotName: 'startIcon', slotClassName: classes.startIcon },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    skip: ['componentsProp'],
  }));

  it('should render with the root, text and colorPrimary classes but no others', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).to.have.class(classes.colorPrimary);
    expect(button).not.to.have.class(classes.filled);
    expect(button).not.to.have.class(classes.filledTonal);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.elevated);
    expect(button).not.to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorTertiary);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeLarge);
  });

  it('should render a text secondary button', () => {
    const { getByRole } = render(<Button color="secondary">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).to.have.class(classes.colorSecondary);
    expect(button).not.to.have.class(classes.colorPrimary);
  });

  ['filled', 'filledTonal', 'outlined', 'elevated'].forEach((variant) => {
    it(`should render an ${variant} button`, () => {
      const { getByRole } = render(<Button variant={variant}>Hello World</Button>);
      const button = getByRole('button');

      expect(button).to.have.class(classes.root);
      expect(button).to.have.class(classes[variant]);
      expect(button).to.have.class(classes.colorPrimary);
      expect(button).not.to.have.class(classes.text);
    });

    // these two variants do not support different colors
    if (variant !== 'elevated' && variant !== 'filledTonal') {
      it(`should render an ${variant} secondary button`, () => {
        const { getByRole } = render(
          <Button variant={variant} color="secondary">
            Hello World
          </Button>,
        );
        const button = getByRole('button');

        expect(button).to.have.class(classes.root);
        expect(button).to.have.class(classes[variant]);
        expect(button).to.have.class(classes.colorSecondary);
        expect(button).not.to.have.class(classes.text);
        expect(button).not.to.have.class(classes.colorPrimary);
      });

      it(`should render an ${variant} tertiary button`, () => {
        const { getByRole } = render(
          <Button variant={variant} color="tertiary">
            Hello World
          </Button>,
        );
        const button = getByRole('button');

        expect(button).to.have.class(classes.root);
        expect(button).to.have.class(classes[variant]);
        expect(button).to.have.class(classes.colorTertiary);
        expect(button).not.to.have.class(classes.text);
        expect(button).not.to.have.class(classes.colorPrimary);
      });
    }
  });

  it('should render a small button', () => {
    const { getByRole } = render(<Button size="small">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeMedium);
    expect(button).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    const { getByRole } = render(<Button size="large">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.sizeLarge);
    expect(button).not.to.have.class(classes.sizeMedium);
    expect(button).not.to.have.class(classes.sizeSmall);
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

  it('can disable the elevation', () => {
    const { getByRole } = render(<Button disableElevation>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.disableElevation);
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

  it('should render disabled class', () => {
    const disabledClassName = 'testDisabledClassName';
    const { container } = render(<Button disabled classes={{ disabled: disabledClassName }} />);

    expect(container.querySelector('button')).to.have.class(disabledClassName);
  });

  it('should render active class', () => {
    const { container } = render(<Button />);

    const button = container.querySelector('button');
    fireEvent.mouseDown(button);

    expect(button).to.have.class(classes.active);
  });
});
