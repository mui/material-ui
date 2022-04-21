import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Card, { cardClasses as classes } from '@mui/joy/Card';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<Card />', () => {
  const { render } = createRenderer();

  describeConformance(<Card />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiCard',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'li',
    testVariantProps: { variant: 'contained' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: variant', () => {
    it('text by default', () => {
      const { getByTestId } = render(<Card data-testid="root">Hello World</Card>);

      expect(getByTestId('root')).to.have.class(classes.variantText);
    });

    ['text', 'outlined', 'light', 'contained'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <Card data-testid="root" variant={variant}>
            Hello World
          </Card>,
        );

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: palette', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Card data-testid="root">Hello World</Card>);

      expect(getByTestId('root')).to.have.class(classes.paletteNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((palette) => {
      it(`should render ${palette}`, () => {
        const { getByTestId } = render(
          <Card data-testid="root" palette={palette}>
            Hello World
          </Card>,
        );

        expect(getByTestId('root')).to.have.class(classes[`palette${capitalize(palette)}`]);
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
