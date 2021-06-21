import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import GridList from './GridList';
import consoleErrorMock from 'test/utils/consoleErrorMock';

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'director90',
  },
];

describe('<GridList />', () => {
  let classes;
  const mount = createMount();
  let shallow;

  before(() => {
    classes = getClasses(<GridList />);
    shallow = createShallow({ dive: true });
  });

  describeConformance(
    <GridList>
      <div />
    </GridList>,
    () => ({
      classes,
      inheritComponent: 'ul',
      mount,
      refInstanceof: window.HTMLUListElement,
      testComponentPropWith: 'li',
    }),
  );

  it('should render children and change cellHeight', () => {
    const cellHeight = 250;
    const wrapper = shallow(
      <GridList cellHeight={cellHeight}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </GridList>,
    );

    expect(wrapper.find('.grid-tile').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.height).to.equal(cellHeight + 4);
  });

  it('renders children by default', () => {
    const wrapper = shallow(
      <GridList>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
        {false && <span>this is a null child</span>}
      </GridList>,
    );

    expect(wrapper.find('.grid-tile').length).to.equal(2);
  });

  it('renders children and change cols', () => {
    const wrapper = shallow(
      <GridList cols={4}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </GridList>,
    );

    expect(wrapper.find('.grid-tile').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.width).to.equal('25%');
  });

  it('renders children and change spacing', () => {
    const spacing = 10;
    const wrapper = shallow(
      <GridList spacing={spacing}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </GridList>,
    );

    expect(wrapper.find('.grid-tile').length).to.equal(2);
    expect(wrapper.children().at(0).props().style.padding).to.equal(spacing / 2);
  });

  it('should render children and overwrite style', () => {
    const style = { backgroundColor: 'red' };
    const wrapper = shallow(
      <GridList style={style}>
        {tilesData.map((tile) => (
          <span
            key={tile.img}
            className="grid-tile"
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          >
            <img src={tile.img} alt="foo" />
          </span>
        ))}
      </GridList>,
    );

    expect(wrapper.find('.grid-tile').length).to.equal(2);
    expect(wrapper.props().style.backgroundColor).to.equal(style.backgroundColor);
  });

  describe('prop: cellHeight', () => {
    it('should accept auto as a property', () => {
      const wrapper = shallow(
        <GridList cellHeight="auto">
          <br />
        </GridList>,
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
        <GridList>
          <React.Fragment />
        </GridList>,
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        "Material-UI: The GridList component doesn't accept a Fragment as a child.",
      );
    });
  });
});
