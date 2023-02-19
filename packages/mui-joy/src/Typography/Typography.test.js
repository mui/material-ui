import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, describeJoyColorInversion } from 'test/utils';
import Typography, { typographyClasses as classes } from '@mui/joy/Typography';
import { ThemeProvider } from '@mui/joy/styles';

describe('<Typography />', () => {
  const { render } = createRenderer();

  describeConformance(<Typography startDecorator="1" endDecorator="2" />, () => ({
    classes,
    inheritComponent: 'p',
    ThemeProvider,
    render,
    refInstanceof: window.HTMLParagraphElement,
    muiName: 'JoyTypography',
    testVariantProps: { level: 'body3' },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      startDecorator: { expectedClassName: classes.startDecorator },
      endDecorator: { expectedClassName: classes.endDecorator },
    },
    skip: ['componentsProp', 'classesRoot'],
  }));

  describeJoyColorInversion(<Typography variant="soft" />, { muiName: 'JoyTypography', classes });

  it('should render the text', () => {
    const { container } = render(<Typography>Hello</Typography>);
    expect(container.firstChild).to.have.text('Hello');
  });

  it('should render body1 root by default', () => {
    const { container } = render(<Typography>Hello</Typography>);

    expect(container.firstChild).to.have.class(classes.body1);
    expect(container.firstChild).to.have.class(classes.root);
  });

  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'].forEach((level) => {
    it(`should render ${level} text`, () => {
      const { container } = render(<Typography level={level}>Hello</Typography>);

      expect(classes).to.have.property(level);

      expect(container.firstChild).to.have.class(classes[level]);
    });
  });

  describe('headline', () => {
    it('should render the mapped headline', () => {
      const { getByText } = render(<Typography level="h6">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('H6');
    });

    it('should render a h1', () => {
      const { getByText } = render(<Typography component="h1">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('H1');
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

    it('should work even with an empty mapping', () => {
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

  describe('nested typography', () => {
    it('nested Typography should be span unless `component` is specified', () => {
      const { container } = render(
        <Typography>
          <Typography>Foo</Typography> - <Typography component="b">Bar</Typography>
        </Typography>,
      );
      expect(container.firstChild.firstChild.tagName).to.equal('SPAN');
      expect(container.firstChild.lastChild.tagName).to.equal('B');
    });

    it('Typography inside start/end icon should be span', () => {
      const { getByText } = render(
        <Typography
          startDecorator={<Typography>Foo</Typography>}
          endDecorator={<Typography>Bar</Typography>}
        />,
      );
      expect(getByText('Foo').tagName).to.equal('SPAN');
      expect(getByText('Bar').tagName).to.equal('SPAN');
    });
  });
});
