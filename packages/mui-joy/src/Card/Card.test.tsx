import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Card, { cardClasses as classes, CardClassKey } from '@mui/joy/Card';
import describeConformance from '../../test/describeConformance';

describe('<Card />', () => {
  const { render } = createRenderer();

  describeConformance(<Card />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyCard',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'li',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('prop: variant', () => {
    it('outlined by default', () => {
      const { getByTestId } = render(<Card data-testid="root">Hello World</Card>);

      expect(getByTestId('root')).to.have.class(classes.variantOutlined);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <Card data-testid="root" variant={variant}>
            Hello World
          </Card>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`variant${capitalize(variant)}` as CardClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Card data-testid="root">Hello World</Card>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(
          <Card data-testid="root" color={color}>
            Hello World
          </Card>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as CardClassKey],
        );
      });
    });
  });

  it('can change size', () => {
    const { container, rerender } = render(<Card />);

    expect(container.firstChild).to.have.class(classes.sizeMd);

    rerender(<Card size="lg" />);

    expect(container.firstChild).to.have.class(classes.sizeLg);
  });

  it('add data-attribute to the first and last child', () => {
    const { container } = render(
      <Card>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </Card>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
    expect(container.querySelector('[data-last-child]')).to.have.text('Third');
  });
});
