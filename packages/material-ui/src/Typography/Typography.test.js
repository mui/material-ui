// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
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
});
