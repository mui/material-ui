import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import {
  getClasses,
  createClientRender,
  createMount,
  describeConformance,
  screen,
} from 'test/utils';
import { ThemeProvider, createMuiTheme } from '../styles';
import Typography from './Typography';

describe('<Typography />', () => {
  /**
   * @type {ReturnType<typeof createMount>}
   */
  const mount = createMount();
  /**
   * // we test at runtime that this is equal to
   * Record<import('./Typography').TypographyClassKey, string>
   * @type {Record<string, string>}
   */
  let classes;

  const render = createClientRender();

  before(() => {
    classes = getClasses(<Typography />);
  });

  describeConformance(<Typography />, () => ({
    classes,
    inheritComponent: 'p',
    mount,
    refInstanceof: window.HTMLParagraphElement,
  }));

  it('should render the text', () => {
    const { container } = render(<Typography>Hello</Typography>);
    expect(container.firstChild).to.have.text('Hello');
  });

  it('should render body1 root by default', () => {
    const { container } = render(<Typography>Hello</Typography>);

    expect(container.firstChild).to.have.class(classes.body1);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should center text', () => {
    const { container } = render(
      <Typography align="center" className="woofTypography">
        Hello
      </Typography>,
    );

    expect(container.firstChild).to.have.class(classes.alignCenter);
  });
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'body2', 'body1', 'caption', 'button'].forEach(
    (variant) => {
      it(`should render ${variant} text`, () => {
        // @ts-ignore literal/tuple type widening
        const { container } = render(<Typography variant={variant}>Hello</Typography>);

        expect(classes[variant] != null).to.equal(true);
        expect(container.firstChild).to.have.class(classes[variant]);
      });
    },
  );

  [
    ['primary', 'colorPrimary'],
    ['textSecondary', 'colorTextSecondary'],
    ['secondary', 'colorSecondary'],
    ['inherit', 'colorInherit'],
    ['error', 'colorError'],
  ].forEach(([color, className]) => {
    it(`should render ${color} color`, () => {
      // @ts-ignore literal/tuple type widening
      const { container } = render(<Typography color={color}>Hello</Typography>);

      expect(classes[className] != null).to.equal(true);
      expect(container.firstChild).to.have.class(classes[className]);
    });
  });

  describe('prop: color', () => {
    it('should inherit the color', () => {
      const { container } = render(<Typography color="inherit">Hello</Typography>);

      expect(container.firstChild).to.have.class(classes.colorInherit);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const { getByText } = render(<Typography variant="button">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('SPAN');
    });

    it('should render a p with a paragraph', () => {
      const { getByText } = render(<Typography paragraph>Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('P');
    });

    it('should render the mapped headline', () => {
      const { getByText } = render(<Typography variant="h6">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('H6');
    });

    it('should render a h1', () => {
      const { getByText } = render(<Typography component="h1">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('H1');
    });
  });

  describe('prop: variantMapping', () => {
    it('should work with a single value', () => {
      const { getByText } = render(
        <Typography variant="h6" variantMapping={{ h6: 'aside' }}>
          Hello
        </Typography>,
      );

      expect(getByText(/hello/i).tagName).to.equal('ASIDE');
    });

    it('should work event without the full mapping', () => {
      const { getByText } = render(
        <Typography variant="h6" variantMapping={{}}>
          Hello
        </Typography>,
      );

      expect(getByText(/hello/i).tagName).to.equal('H6');
    });
  });

  describe('prop: display', () => {
    it('should render with displayInline class in display="inline"', () => {
      const { container } = render(<Typography display="inline">Hello</Typography>);

      expect(container.firstChild).to.have.class(classes.root);
      expect(container.firstChild).to.have.class(classes.displayInline);
      expect(container.firstChild).not.to.have.class(classes.displayBlock);
    });

    it('should render with displayInline class in display="block"', () => {
      const { container } = render(<Typography display="block">Hello</Typography>);

      expect(container.firstChild).to.have.class(classes.root);
      expect(container.firstChild).to.have.class(classes.displayBlock);
      expect(container.firstChild).not.to.have.class(classes.displayInline);
    });

    it('should render with no display classes if display="initial"', () => {
      const { container } = render(<Typography display="initial">Hello</Typography>);

      expect(container.firstChild).to.have.class(classes.root);
      expect(container.firstChild).not.to.have.class(classes.displayBlock);
      expect(container.firstChild).not.to.have.class(classes.displayInline);
    });
  });

  describe('custom theme variants', () => {
    const WrappedComponent = (props) => {
      const { theme, ...other } = props;
      return (
        <ThemeProvider theme={theme}>
          <Typography data-testid="component" {...other}>
            Content
          </Typography>
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
              props: { variant: 'test', align: 'center', color: 'primary' },
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
              props: { variant: 'test', align: 'center' },
              styles: { backgroundColor: 'rgb(0, 255, 0)' },
            },
          ],
        },
      });

      render(<WrappedComponent theme={theme} align="center" />);

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
          MuiTypography: [
            {
              props: { variant: 'test' },
              styles: { backgroundColor: 'rgb(0, 0, 0)' },
            },
            {
              props: { variant: 'test', color: 'initial', align: 'center' },
              styles: { backgroundColor: 'rgb(255, 0, 0)' },
            },
          ],
        },
      });

      render(<WrappedComponent theme={theme} variant="test" size="center" />);

      const style = window.getComputedStyle(screen.getByTestId('component'));
      expect(style.getPropertyValue('background-color')).to.equal('rgb(255, 0, 0)');
    });

    it('should warn if the used variant is not defined in the theme', function test() {
      const theme = createMuiTheme({
        variants: {
          MuiTypography: [
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
