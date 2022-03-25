import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Chip, { chipClasses as classes } from '@mui/joy/Chip';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<Chip />', () => {
  const { render } = createRenderer();

  describeConformance(<Chip />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiChip',
    refInstanceof: window.HTMLDivElement,
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'light' },
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
  }));

  describe('prop: variant', () => {
    it('light by default', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.variantLight);
    });

    ['outlined', 'light', 'contained'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(<Chip data-testid="root" variant={variant} />);

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(<Chip data-testid="root" color={color} />);

        expect(getByTestId('root')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.sizeMd);
    });
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByTestId } = render(<Chip data-testid="root" size={size} />);

        expect(getByTestId('root')).to.have.class(classes[`size${capitalize(size)}`]);
      });
    });
  });

  describe('prop: clickable', () => {
    it('renders as a clickable chip when `clickable` is `true`', () => {
      const { getByTestId } = render(<Chip data-testid="root" clickable />);

      expect(getByTestId('root')).to.have.class(classes.clickable);
    });

    it('renders as a non-clickable chip when `clickable` is `false`', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).not.to.have.class(classes.clickable);
    });

    it('renders as a clickable chip when `onClick` is passed', () => {
      const { getByTestId } = render(<Chip data-testid="root" onClick={() => {}} />);

      expect(getByTestId('root')).to.have.class(classes.clickable);
    });
  });

  describe('prop: disabled', () => {
    it('renders as a disabled chip when `disabled` is `true`', () => {
      const { getByTestId } = render(<Chip data-testid="root" disabled />);

      expect(getByTestId('root')).to.have.class(classes.disabled);
    });

    it('renders as a non-disabled chip when `disabled` is `false`', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).not.to.have.class(classes.disabled);
    });
  });
});
