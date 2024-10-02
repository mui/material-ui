import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import LinearProgress, { linearProgressClasses as classes } from '@mui/joy/LinearProgress';
import describeConformance from '../../test/describeConformance';

describe('<LinearProgress />', () => {
  const { render } = createRenderer();
  describeConformance(<LinearProgress />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyLinearProgress',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { determinate: true },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('prop: determinate', () => {
    it('should render a determinate circular progress', () => {
      const { getByRole } = render(<LinearProgress determinate />);

      expect(getByRole('progressbar')).to.have.class(classes.determinate);
    });
  });

  describe('prop: variant', () => {
    it('soft by default', () => {
      const { getByRole } = render(<LinearProgress />);
      expect(getByRole('progressbar')).to.have.class(classes.variantSoft);
    });
    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByRole } = render(<LinearProgress variant={variant} />);
        expect(getByRole('progressbar')).to.have.class(
          classes[`variant${capitalize(variant)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      const { getByRole } = render(<LinearProgress />);
      expect(getByRole('progressbar')).to.have.class(classes.colorPrimary);
    });
    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByRole } = render(<LinearProgress color={color} />);
        expect(getByRole('progressbar')).to.have.class(
          classes[`color${capitalize(color)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByRole } = render(<LinearProgress />);
      expect(getByRole('progressbar')).to.have.class(classes.sizeMd);
    });
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(<LinearProgress size={size} />);
        expect(getByRole('progressbar')).to.have.class(
          classes[`size${capitalize(size)}` as keyof typeof classes],
        );
      });
    });
  });
});
