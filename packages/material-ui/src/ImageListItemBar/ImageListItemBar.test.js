import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import ImageListItemBar from './ImageListItemBar';

describe('<ImageListItemBar />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<ImageListItemBar title="classes" />);
  });

  describeConformance(<ImageListItemBar title="conform?" />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  const itemData = {
    img: 'images/image-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('props:', () => {
    describe('prop: title', () => {
      it('should render a title', () => {
        const { container } = render(<ImageListItemBar title={itemData.title} />);

        expect(container.querySelector('div')).to.have.text(itemData.title);
      });
    });

    describe('prop: subtitle', () => {
      it('should render a subtitle', () => {
        const { container } = render(<ImageListItemBar subtitle={itemData.author} />);

        expect(container.querySelector('div')).to.have.text(itemData.author);
      });
    });

    describe('prop: position', () => {
      describe('position="top"', () => {
        it('should render the positionTop class', () => {
          const { container } = render(<ImageListItemBar title="text" position="top" />);

          expect(container.querySelector('div')).to.have.class(classes.root);
          expect(container.querySelector('div')).to.have.class(classes.positionTop);
        });
      });

      describe('position="below"', () => {
        it('should render the positionBelow class', () => {
          const { container } = render(<ImageListItemBar title="text" position="below" />);

          expect(container.querySelector('div')).to.have.class(classes.root);
          expect(container.querySelector('div')).to.have.class(classes.positionBelow);
        });

        it('should render a child div with the titleWrapBelow class', () => {
          const { container } = render(<ImageListItemBar title="text" position="below" />);

          expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrap);
          expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrapBelow);
        });
      });
    });

    describe('prop: actionPosition', () => {
      it('should render a child div with the titleWrapActionPosLeft class', () => {
        const { container } = render(
          <ImageListItemBar title="text" actionIcon={<div />} actionPosition="left" />,
        );

        expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrap);
        expect(container.firstChild.querySelector('div')).to.have.class(
          classes.titleWrapActionPosLeft,
        );
      });
    });
  });

  describe('classes:', () => {
    it('should render with the root and positionBottom classes by default', () => {
      const { container } = render(<ImageListItemBar title="text" />);

      expect(container.querySelector('div')).to.have.class(classes.root);
      expect(container.querySelector('div')).to.have.class(classes.positionBottom);
    });
  });
});
