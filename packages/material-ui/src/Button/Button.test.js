import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import {
  getClasses,
  createMount,
  describeConformance,
  act,
  createClientRender,
  screen,
  fireEvent,
  createServerRender,
} from 'test/utils';
import { ThemeProvider, createMuiTheme } from '../styles';
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

  describe('custom theme variants', () => {
    const WrappedComponent = (props) => {
      const { theme, ...other } = props;
      return (
        <ThemeProvider theme={theme}>
          <Button data-testid="component" {...other}>
            Content
          </Button>
        </ThemeProvider>
      );
    };

    WrappedComponent.propTypes = {
      theme: PropTypes.object,
    };

    it('should map the variant classkey to the component', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }

      const theme = createMuiTheme({
        variants: {
          MuiButton: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
          ],
        },
      });

      render(<WrappedComponent theme={theme} variant="test" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 0, 0)');
    });

    it('should map the latest props combination classkey to the component', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }

      const theme = createMuiTheme({
        variants: {
          MuiButton: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
            {
              props: { variant: 'test', size: 'large', color: 'primary' },
              styles: { backgroundColor: 'rgb(0, 255, 0)' },
            },
          ],
        },
      });

      render(<WrappedComponent theme={theme} variant="test" size="large" color="primary" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).to.equal('rgb(0, 255, 0)');
    });

    it('should not add classKey if not all props match', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }

      const theme = createMuiTheme({
        variants: {
          MuiButton: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
            {
              props: { variant: 'test', size: 'large' },
              styles: { backgroundColor: 'rgb(0, 255, 0)' },
            },
          ],
        },
      });

      render(<WrappedComponent theme={theme} size="large" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).not.to.equal('rgb(0, 255, 0)');
    });

    it('should consider default props when matching the props', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // see https://github.com/jsdom/jsdom/issues/2953
        this.skip();
      }

      const theme = createMuiTheme({
        variants: {
          MuiButton: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(0, 0, 0)' },
            },
            {
              props: { variant: 'test', color: 'primary', size: 'large' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
          ],
        },
      });

      render(<WrappedComponent theme={theme} variant="test" size="large" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 0, 0)');
    });

    it('should warn if the used variant is not defined in the theme', function test() {
      const theme = createMuiTheme({
        variants: {
          MuiButton: [
            {
              props: { variant: 'test1' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
          ],
        },
      });

      expect(() => mount(<WrappedComponent theme={theme} variant="test" />)).toErrorDev([
        // strict mode renders twice
        [
          `Material-UI: You are using a variant value \`test\` for which you didn't define styles.`,
          `Please create a new variant matcher in your theme for this variant. To learn more about matchers visit https://material-ui.com/customization/components/#adding-new-component-variants.`,
        ].join('\n'),
        [
          `Material-UI: You are using a variant value \`test\` for which you didn't define styles.`,
          `Please create a new variant matcher in your theme for this variant. To learn more about matchers visit https://material-ui.com/customization/components/#adding-new-component-variants.`,
        ].join('\n'),
      ]);
    });
  });
});
