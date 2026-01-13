import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider } from '@mui/joy/styles';
import Table, { tableClasses as classes } from '@mui/joy/Table';
import describeConformance from '../../test/describeConformance';

describe('<Table />', () => {
  const { render } = createRenderer();

  describeConformance(<Table />, () => ({
    classes,
    inheritComponent: 'table',
    render,
    ThemeProvider,
    muiName: 'JoyTable',
    refInstanceof: window.HTMLTableElement,
    testComponentPropWith: 'header',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: [
      'classesRoot',
      'componentsProp',
      'componentProp',
      'mergeClassName',
      'propsSpread',
      'refForwarding',
    ],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('prop: variant', () => {
    it('plain by default', () => {
      render(<Table />);

      expect(screen.getByRole('table')).to.have.class(classes.variantPlain);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        render(<Table variant={variant} />);

        expect(screen.getByRole('table')).to.have.class(
          classes[`variant${capitalize(variant)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      render(<Table />);

      expect(screen.getByRole('table')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(<Table color={color} />);

        expect(screen.getByRole('table')).to.have.class(
          classes[`color${capitalize(color)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('adds a md class by default', () => {
      render(<Table />);

      expect(screen.getByRole('table')).to.have.class(classes.sizeMd);
    });

    (['sm', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        render(<Table size={size} />);

        expect(screen.getByRole('table')).to.have.class(
          classes[`size${capitalize(size)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: borderAxis', () => {
    it('adds `xBetween` by default', () => {
      render(<Table />);

      expect(screen.getByRole('table')).to.have.class(classes.borderAxisXBetween);
    });

    (['none', 'x', 'xBetween', 'y', 'yBetween', 'both', 'bothBetween'] as const).forEach((axis) => {
      it(`should render border-axis ${axis}`, () => {
        render(<Table borderAxis={axis} />);

        expect(screen.getByRole('table')).to.have.class(
          classes[`borderAxis${capitalize(axis)}` as keyof typeof classes],
        );
      });
    });
  });

  it('adds `hoverRow` class', () => {
    render(<Table hoverRow />);

    expect(screen.getByRole('table')).to.have.class(classes.hoverRow);
  });

  it('adds `noWrap` class', () => {
    render(<Table noWrap />);

    expect(screen.getByRole('table')).to.have.class(classes.noWrap);
  });

  it('adds `stickyHeader` class', () => {
    render(<Table stickyHeader />);

    expect(screen.getByRole('table')).to.have.class(classes.stickyHeader);
  });

  it('adds `stickyFooter` class', () => {
    render(<Table stickyFooter />);

    expect(screen.getByRole('table')).to.have.class(classes.stickyFooter);
  });
});
