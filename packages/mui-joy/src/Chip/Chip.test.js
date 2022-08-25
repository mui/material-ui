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
    muiName: 'JoyChip',
    refInstanceof: window.HTMLDivElement,
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'soft' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  it('renders children', () => {
    const { getByText } = render(
      <Chip>
        <span>test</span>
      </Chip>,
    );

    expect(getByText('test')).toBeVisible();
  });

  describe('decorator', () => {
    it('should render startDecorator element', () => {
      const { getByText } = render(<Chip startDecorator="foo" />);

      expect(getByText('foo')).to.have.class(classes.startDecorator);
    });

    it('should render endDecorator element', () => {
      const { getByText } = render(<Chip endDecorator="bar" />);

      expect(getByText('bar')).to.have.class(classes.endDecorator);
    });
  });

  describe('prop: variant', () => {
    it('contained by default', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.variantSolid);
    });

    ['outlined', 'soft', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(<Chip data-testid="root" variant={variant} />);

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.colorPrimary);
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

  describe('clickable', () => {
    it('renders action element when `onClick` is provided', () => {
      const { getByRole } = render(<Chip onClick={() => {}} />);

      expect(getByRole('button')).toBeVisible();
    });

    it('renders action element when `componentsProps.action` is provided', () => {
      const { getByRole } = render(<Chip componentsProps={{ action: {} }} />);

      expect(getByRole('button')).toBeVisible();
    });

    it('renders custom action element', () => {
      const { getByRole } = render(
        <Chip componentsProps={{ action: { component: 'a', href: '#' } }} />,
      );

      expect(getByRole('link')).to.have.attr('href', '#');
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

    it('renders disabled action element', () => {
      const { getByRole } = render(<Chip disabled onClick={() => {}} />);

      expect(getByRole('button')).to.have.attr('disabled');
    });
  });
});
