import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Masonry, { masonryClasses as classes } from '@material-ui/lab/Masonry';

const itemsData = [
  {
    img: '/fake1.png',
    title: 'fake1',
  },
  {
    img: '/fake2.png',
    title: 'fake2',
  },
];

describe('<Masonry />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <Masonry>
      <div />
    </Masonry>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
      muiName: 'MuiMasonry',
      skip: ['componentsProp'],
    }),
  );

  const children = itemsData.map((item, idx) => (
    <div key={idx} data-testid="test-children">
      <img src={item.img} alt={item.title} />
    </div>
  ));

  it('should render with the root class by default', () => {
    const { getByTestId } = render(<Masonry data-testid="test-root">{children}</Masonry>);
    expect(getByTestId('test-root')).to.have.class(classes.root);
  });

  it('should render children by default', () => {
    const { getAllByTestId } = render(<Masonry>{children}</Masonry>);
    expect(getAllByTestId('test-children').length).to.equal(2);
  });

  describe('style attribute:', () => {
    it('should overwrite style', () => {
      const style = { backgroundColor: 'black' };
      const { getByTestId } = render(
        <Masonry style={style} data-testid="test-root">
          {children}
        </Masonry>,
      );

      expect(getByTestId('test-root')).toHaveInlineStyle({ backgroundColor: 'black' });
    });

    it('should render with a grid-auto-rows of 0 by default', () => {
      const { getByTestId } = render(<Masonry data-testid="test-root">{children}</Masonry>);
      const style = getComputedStyle(getByTestId('test-root'));
      expect(style['grid-auto-rows']).to.equal('0');
    });
  });

  describe('props:', () => {
    describe('prop: component', () => {
      it('should render a div by default', () => {
        const { container } = render(<Masonry>{children}</Masonry>);
        expect(container.firstChild).to.have.property('nodeName', 'DIV');
      });

      it('should render a different component', () => {
        const { container } = render(<Masonry component="span">{children}</Masonry>);
        expect(container.firstChild).to.have.property('nodeName', 'SPAN');
      });
    });

    describe('prop: className', () => {
      it('should append the className to the root element', () => {
        const { container } = render(<Masonry className="foo">{children}</Masonry>);
        expect(container.firstChild).to.have.class(classes.root);
        expect(container.firstChild).to.have.class('foo');
      });
    });

    describe('prop: cols', () => {
      it('should render with modified grid-template-columns style', () => {
        const { getByTestId } = render(
          <Masonry cols={10} data-testid="test-root">
            {children}
          </Masonry>,
        );
        const style = getComputedStyle(getByTestId('test-root'));
        expect(style['grid-template-columns']).to.equal('repeat(10, 1fr)');
      });
    });

    describe('prop: spacing', () => {
      it('should render with modified column-gap style', () => {
        const { getByTestId } = render(
          <Masonry spacing={2} data-testid="test-root">
            {children}
          </Masonry>,
        );
        const style = getComputedStyle(getByTestId('test-root'));
        expect(style['column-gap']).to.equal('16px');
      });

      it('should always render with a row-gap of 1', () => {
        const { getByTestId } = render(
          <Masonry spacing={2} data-testid="test-root">
            {children}
          </Masonry>,
        );
        const style = getComputedStyle(getByTestId('test-root'));
        expect(style['row-gap']).to.equal('1px');
      });
    });
  });
});
