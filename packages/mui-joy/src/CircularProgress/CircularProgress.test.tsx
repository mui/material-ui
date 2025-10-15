import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider } from '@mui/joy/styles';
import CircularProgress, { circularProgressClasses as classes } from '@mui/joy/CircularProgress';
import describeConformance from '../../test/describeConformance';

describe('<CircularProgress />', () => {
  const { render } = createRenderer();

  describeConformance(<CircularProgress />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'JoyCircularProgress',
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { determinate: true },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      svg: {
        expectedClassName: classes.svg,
        testWithComponent: ({ className }: any) => (
          <svg className={className} data-testid="custom" />
        ),
        testWithElement: null,
      },
      track: {
        expectedClassName: classes.track,
      },
      progress: { expectedClassName: classes.progress },
    },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: determinate', () => {
    it('should render a determinate circular progress', () => {
      render(<CircularProgress determinate />);

      expect(screen.getByRole('progressbar')).to.have.class(classes.determinate);
    });
  });

  describe('prop: variant', () => {
    it('soft by default', () => {
      render(<CircularProgress />);

      expect(screen.getByRole('progressbar')).to.have.class(classes.variantSoft);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        render(<CircularProgress variant={variant} />);

        expect(screen.getByRole('progressbar')).to.have.class(
          classes[`variant${capitalize(variant)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      render(<CircularProgress />);

      expect(screen.getByRole('progressbar')).to.have.class(classes.colorPrimary);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(<CircularProgress color={color} />);

        expect(screen.getByRole('progressbar')).to.have.class(
          classes[`color${capitalize(color)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      render(<CircularProgress />);

      expect(screen.getByRole('progressbar')).to.have.class(classes.sizeMd);
    });
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        render(<CircularProgress size={size} />);

        expect(screen.getByRole('progressbar')).to.have.class(
          classes[`size${capitalize(size)}` as keyof typeof classes],
        );
      });
    });
  });
});
