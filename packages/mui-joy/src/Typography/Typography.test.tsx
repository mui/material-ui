import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Typography, { typographyClasses as classes, TypographyProps } from '@mui/joy/Typography';
import { ThemeProvider } from '@mui/joy/styles';
import describeConformance from '../../test/describeConformance';

describe('<Typography />', () => {
  const { render } = createRenderer();

  describeConformance(<Typography startDecorator="1" endDecorator="2" />, () => ({
    classes,
    inheritComponent: 'p',
    ThemeProvider,
    render,
    refInstanceof: window.HTMLParagraphElement,
    muiName: 'JoyTypography',
    testVariantProps: { level: 'h2' },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      startDecorator: { expectedClassName: classes.startDecorator },
      endDecorator: { expectedClassName: classes.endDecorator },
    },
    skip: ['componentsProp', 'classesRoot'],
  }));

  it('should render the text', () => {
    const { container } = render(<Typography>Hello</Typography>);
    expect(container.firstChild).to.have.text('Hello');
  });

  it('should render body-md root by default', () => {
    const { container } = render(<Typography>Hello</Typography>);

    expect(container.firstChild).to.have.class(classes['body-md']);
    expect(container.firstChild).to.have.class(classes.root);
  });

  (
    [
      'h1',
      'h2',
      'h3',
      'h4',
      'title-lg',
      'title-md',
      'title-sm',
      'body-lg',
      'body-md',
      'body-sm',
      'body-xs',
    ] as const
  ).forEach((level) => {
    it(`should render ${level} text`, () => {
      const { container } = render(
        <Typography level={level as TypographyProps['level']}>Hello</Typography>,
      );

      expect(classes).to.have.property(level);
      expect(container.firstChild).to.have.class(classes[level]);
    });
  });

  describe('headline', () => {
    it('should render the mapped headline', () => {
      render(<Typography level="h2">Hello</Typography>);

      expect(screen.getByText(/hello/i).tagName).to.equal('H2');
    });

    it('should render a h1', () => {
      render(<Typography component="h1">Hello</Typography>);

      expect(screen.getByText(/hello/i).tagName).to.equal('H1');
    });
  });

  describe('prop: levelMapping', () => {
    it('should work with a single value', () => {
      render(
        <Typography level="h2" levelMapping={{ h2: 'aside' }}>
          Hello
        </Typography>,
      );

      expect(screen.getByText(/hello/i).tagName).to.equal('ASIDE');
    });

    it('should work even with an empty mapping', () => {
      render(
        <Typography level="h2" levelMapping={{}}>
          Hello
        </Typography>,
      );

      expect(screen.getByText(/hello/i).tagName).to.equal('H2');
    });
  });

  it('combines system properties with the sx prop', function test() {
    if (window.navigator.userAgent.includes('jsdom')) {
      this.skip();
    }
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
      const initialChild = container.firstChild;
      if (initialChild === null) {
        return;
      }
      expect((initialChild.firstChild as HTMLElement)?.tagName).to.equal('SPAN');
      expect((initialChild.lastChild as HTMLElement)?.tagName).to.equal('B');
    });

    it('Typography inside start/end icon should be span', () => {
      render(
        <Typography
          startDecorator={<Typography>Foo</Typography>}
          endDecorator={<Typography>Bar</Typography>}
        />,
      );

      expect(screen.getByText('Foo').tagName).to.equal('SPAN');
      expect(screen.getByText('Bar').tagName).to.equal('SPAN');
    });
  });
});
