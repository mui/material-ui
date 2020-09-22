import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ImageList from './ImageList';
import consoleErrorMock from 'test/utils/consoleErrorMock';

const itemsData = [
  {
    img: 'images/image-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/image-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'director90',
  },
];

describe('<ImageList />', () => {
  let classes;
  const mount = createMount();
  let shallow;

  before(() => {
    classes = getClasses(<ImageList />);
    shallow = createShallow({ dive: true });
  });

  describeConformance(
    <ImageList>
      <div />
    </ImageList>,
    () => ({
      classes,
      inheritComponent: 'ul',
      mount,
      refInstanceof: window.HTMLUListElement,
      testComponentPropWith: 'li',
    }),
  );

  it('should render children and change rowHeight', () => {
    const rowHeight = 250;
    const wrapper = shallow(
      <ImageList rowHeight={rowHeight}>
        {itemsData.map((item) => (
          <span
            key={item.img}
            className="image-item"
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
          >
            <img src={item.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-item').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.height).to.equal(rowHeight + 4);
  });

  it('renders children by default', () => {
    const wrapper = shallow(
      <ImageList>
        {itemsData.map((item) => (
          <span
            key={item.img}
            className="image-item"
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
          >
            <img src={item.img} alt="foo" />
          </span>
        ))}
        {false && <span>this is a null child</span>}
      </ImageList>,
    );

    expect(wrapper.find('.image-item').length).to.equal(2);
  });

  it('renders children and change cols', () => {
    const wrapper = shallow(
      <ImageList cols={4}>
        {itemsData.map((item) => (
          <span
            key={item.img}
            className="image-item"
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
          >
            <img src={item.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-item').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.width).to.equal('25%');
  });

  it('renders children and change gap', () => {
    const gap = 10;
    const wrapper = shallow(
      <ImageList gap={gap}>
        {itemsData.map((item) => (
          <span
            key={item.img}
            className="image-item"
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
          >
            <img src={item.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-item').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.padding).to.equal(gap / 2);
  });

  it('should render children and overwrite style', () => {
    const style = { backgroundColor: 'red' };
    const wrapper = shallow(
      <ImageList style={style}>
        {itemsData.map((item) => (
          <span
            key={item.img}
            className="image-item"
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
          >
            <img src={item.img} alt="foo" />
          </span>
        ))}
      </ImageList>,
    );

    expect(wrapper.find('.image-item').length).to.equal(2);
    expect(wrapper.props().style.backgroundColor).to.equal(style.backgroundColor);
  });

  describe('prop: rowHeight', () => {
    it('should accept auto as a property', () => {
      const wrapper = shallow(
        <ImageList rowHeight="auto">
          <br />
        </ImageList>,
      );

      expect(wrapper.children().at(0).props().style.height).to.equal('auto');
    });
  });

  describe('warnings', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('warns a Fragment is passed as a child', () => {
      mount(
        <ImageList>
          <React.Fragment />
        </ImageList>,
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        "Material-UI: The ImageList component doesn't accept a Fragment as a child.",
      );
    });
  });
});
