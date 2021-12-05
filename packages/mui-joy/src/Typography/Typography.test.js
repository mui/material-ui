import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import Typography, { typographyClasses as classes } from '@mui/joy/Typography';
import { ThemeProvider } from '@mui/joy/styles';

describe('<Typography />', () => {
  const { render } = createRenderer();

  describeConformance(<Typography />, () => ({
    classes,
    inheritComponent: 'p',
    ThemeProvider,
    render,
    refInstanceof: window.HTMLParagraphElement,
    muiName: 'MuiTypography',
    testVariantProps: { level: 'dot' },
    testStateOverrides: { prop: 'level', value: 'h2', styleKey: 'h2' },
    skip: ['componentsProp', 'classesRoot'],
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
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'].forEach((level) => {
    it(`should render ${level} text`, () => {
      // @ts-ignore literal/tuple type widening
      const { container } = render(
        <React.Fragment>
          <Typography level={level}>Hello</Typography>
          <Typography variant={level}>Hello</Typography>
        </React.Fragment>,
      );

      expect(classes).to.have.property(level);

      expect(container.firstChild).to.have.class(classes[level]);

      // variant prop still work
      expect(container.lastChild).to.have.class(classes[level]);
    });
  });

  describe('headline', () => {
    it('should render a p with a paragraph', () => {
      const { getByText } = render(<Typography paragraph>Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('P');
    });

    it('should render the mapped headline', () => {
      const { getByText } = render(<Typography level="h6">Hello</Typography>);

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

  describe('prop: levelMapping', () => {
    it('should work with a single value', () => {
      const { getByText } = render(
        <Typography level="h6" levelMapping={{ h6: 'aside' }}>
          Hello
        </Typography>,
      );

      expect(getByText(/hello/i).tagName).to.equal('ASIDE');
    });

    it('should work event without the full mapping', () => {
      const { getByText } = render(
        <Typography level="h6" levelMapping={{}}>
          Hello
        </Typography>,
      );

      expect(getByText(/hello/i).tagName).to.equal('H6');
    });
  });

  it('combines system properties with the sx prop', () => {
    const { container } = render(<Typography mt={2} mr={1} sx={{ marginRight: 5, mb: 2 }} />);

    expect(container.firstChild).toHaveComputedStyle({
      marginTop: '16px',
      marginRight: '40px',
      marginBottom: '16px',
    });
  });
});
