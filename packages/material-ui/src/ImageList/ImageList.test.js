import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses, createMount, describeConformance } from 'test/utils';
import ImageList from './ImageList';

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
});
