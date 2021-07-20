import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Masonry, { masonryClasses as classes } from '@material-ui/lab/Masonry';
import { createTheme } from '@material-ui/core/styles';
import { style } from './Masonry';

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
      testVariantProps: { variant: 'foo' },
      muiName: 'MuiMasonry',
      skip: ['componentsProp'],
    }),
  );

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
  const theme = createTheme({ spacing: 8 });
  const children = itemsData.map((item, idx) => (
    <div key={idx} data-testid="test-children">
      <img src={item.img} alt={item.title} />
    </div>
  ));

  describe('style attribute:', () => {
    it('should render with correct default styles', () => {
      expect(
        style({
          styleProps: {
            cols: 4,
            spacing: 1,
          },
          theme,
        }),
      ).to.deep.equal({
        display: 'grid',
        gridAutoRows: 0,
        padding: 0,
        overflow: 'auto',
        width: '100%',
        rowGap: 1,
        columnGap: theme.spacing(1),
        gridTemplateColumns: 'repeat(4, 1fr)',
      });
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
        expect(
          style({
            styleProps: {
              cols: 8,
              spacing: 1,
            },
            theme,
          }),
        ).to.deep.equal({
          display: 'grid',
          gridAutoRows: 0,
          padding: 0,
          overflow: 'auto',
          width: '100%',
          rowGap: 1,
          columnGap: theme.spacing(1),
          gridTemplateColumns: 'repeat(8, 1fr)',
        });
      });
    });

    describe('prop: spacing', () => {
      it('should render with modified column-gap style', () => {
        expect(
          style({
            styleProps: {
              cols: 4,
              spacing: 5,
            },
            theme,
          }),
        ).to.deep.equal({
          display: 'grid',
          gridAutoRows: 0,
          padding: 0,
          overflow: 'auto',
          width: '100%',
          rowGap: 1,
          columnGap: theme.spacing(5),
          gridTemplateColumns: 'repeat(4, 1fr)',
        });
      });
    });
  });
});
