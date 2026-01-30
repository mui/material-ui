import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider } from '@mui/joy/styles';
import AspectRatio, {
  AspectRatioClassKey,
  aspectRatioClasses as classes,
} from '@mui/joy/AspectRatio';
import describeConformance from '../../test/describeConformance';

describe('<AspectRatio />', () => {
  const { render } = createRenderer();

  describeConformance(<AspectRatio>16/9</AspectRatio>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyAspectRatio',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      content: { expectedClassName: classes.content },
    },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: variant', () => {
    it('plain by default', () => {
      render(<AspectRatio data-testid="root">Hello World</AspectRatio>);

      expect(screen.getByTestId('root').firstChild).to.have.class(classes.variantSoft);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        render(
          <AspectRatio data-testid="root" variant={variant}>
            Hello World
          </AspectRatio>,
        );

        expect(screen.getByTestId('root').firstChild).to.have.class(
          classes[`variant${capitalize(variant)}` as AspectRatioClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      render(<AspectRatio data-testid="root">Hello World</AspectRatio>);

      expect(screen.getByTestId('root').firstChild).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(
          <AspectRatio data-testid="root" color={color}>
            Hello World
          </AspectRatio>,
        );

        expect(screen.getByTestId('root').firstChild).to.have.class(
          classes[`color${capitalize(color)}` as AspectRatioClassKey],
        );
      });
    });
  });

  it('add data-attribute to the first child', () => {
    const { container } = render(
      <AspectRatio>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </AspectRatio>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
  });

  it('able to pass the props to content slot', () => {
    render(<AspectRatio slotProps={{ content: { 'data-testid': 'content' } }} />);

    expect(screen.getByTestId('content')).toBeVisible();
  });
});
