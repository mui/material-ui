import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
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
    render(
      <Chip>
        <span>test</span>
      </Chip>,
    );

    expect(screen.getByText('test')).toBeVisible();
  });

  describe('decorator', () => {
    it('should render startDecorator element', () => {
      render(<Chip startDecorator="foo" />);

      expect(screen.getByText('foo')).to.have.class(classes.startDecorator);
    });

    it('should render endDecorator element', () => {
      render(<Chip endDecorator="bar" />);

      expect(screen.getByText('bar')).to.have.class(classes.endDecorator);
    });
  });

  describe('prop: variant', () => {
    it('contained by default', () => {
      render(<Chip data-testid="root" />);

      expect(screen.getByTestId('root')).to.have.class(classes.variantSoft);
    });

    (['outlined', 'plain', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        render(<Chip data-testid="root" variant={variant} />);

        expect(screen.getByTestId('root')).to.have.class(
          classes[`variant${capitalize(variant)}` as ChipClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      render(<Chip data-testid="root" />);

      expect(screen.getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(<Chip data-testid="root" color={color} />);

        expect(screen.getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as ChipClassKey],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      render(<Chip data-testid="root" />);

      expect(screen.getByTestId('root')).to.have.class(classes.sizeMd);
    });
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        render(<Chip data-testid="root" size={size} />);

        expect(screen.getByTestId('root')).to.have.class(
          classes[`size${capitalize(size)}` as ChipClassKey],
        );
      });
    });
  });

  describe('clickable', () => {
    it('renders action element when `onClick` is provided', () => {
      render(<Chip onClick={() => {}} />);

      expect(screen.getByRole('button')).toBeVisible();
    });

    it('should call onClick', () => {
      const handleClick = spy();
      render(<Chip onClick={handleClick} />);

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick.callCount).to.equal(1);
    });

    it('renders action element when `slotProps.action` is provided', () => {
      render(<Chip slotProps={{ action: {} }} />);

      expect(screen.getByRole('button')).toBeVisible();
    });

    it('renders custom action element', () => {
      render(<Chip slotProps={{ action: { component: 'a', href: '#' } }} />);

      expect(screen.getByRole('link')).to.have.attr('href', '#');
    });
  });

  describe('prop: disabled', () => {
    it('renders as a disabled chip when `disabled` is `true`', () => {
      render(<Chip data-testid="root" disabled />);

      expect(screen.getByTestId('root')).to.have.class(classes.disabled);
    });

    it('renders as a non-disabled chip when `disabled` is `false`', () => {
      render(<Chip data-testid="root" />);

      expect(screen.getByTestId('root')).not.to.have.class(classes.disabled);
    });

    it('renders disabled action element', () => {
      render(<Chip disabled onClick={() => {}} />);

      expect(screen.getByRole('button')).to.have.attr('disabled');
    });
  });
});
