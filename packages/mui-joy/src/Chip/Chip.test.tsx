import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Chip, { ChipClassKey, chipClasses as classes } from '@mui/joy/Chip';
import describeConformance from '../../test/describeConformance';

describe('<Chip />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Chip startDecorator="1" endDecorator="2">
      Chip
    </Chip>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      ThemeProvider,
      muiName: 'JoyChip',
      refInstanceof: window.HTMLDivElement,
      testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
      testComponentPropWith: 'span',
      testVariantProps: { variant: 'solid' },
      testCustomVariant: true,
      slots: {
        root: { expectedClassName: classes.root },
        label: { expectedClassName: classes.label },
        startDecorator: { expectedClassName: classes.startDecorator },
        endDecorator: { expectedClassName: classes.endDecorator },
      },
      skip: ['classesRoot', 'componentsProp'],
    }),
  );

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

      expect(getByTestId('root')).to.have.class(classes.variantSoft);
    });

    (['outlined', 'plain', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(<Chip data-testid="root" variant={variant} />);

        expect(getByTestId('root')).to.have.class(
          classes[`variant${capitalize(variant)}` as ChipClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(<Chip data-testid="root" color={color} />);

        expect(getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as ChipClassKey],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByTestId } = render(<Chip data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.sizeMd);
    });
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByTestId } = render(<Chip data-testid="root" size={size} />);

        expect(getByTestId('root')).to.have.class(
          classes[`size${capitalize(size)}` as ChipClassKey],
        );
      });
    });
  });

  describe('clickable', () => {
    it('renders action element when `onClick` is provided', () => {
      const { getByRole } = render(<Chip onClick={() => {}} />);

      expect(getByRole('button')).toBeVisible();
    });

    it('should call onClick', () => {
      const handleClick = spy();
      const { getByRole } = render(<Chip onClick={handleClick} />);

      fireEvent.click(getByRole('button'));

      expect(handleClick.callCount).to.equal(1);
    });

    it('renders action element when `slotProps.action` is provided', () => {
      const { getByRole } = render(<Chip slotProps={{ action: {} }} />);

      expect(getByRole('button')).toBeVisible();
    });

    it('renders custom action element', () => {
      const { getByRole } = render(<Chip slotProps={{ action: { component: 'a', href: '#' } }} />);

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
