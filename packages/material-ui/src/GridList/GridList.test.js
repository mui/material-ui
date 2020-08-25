import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
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
    consoleErrorMock.spy();
  });

  after(() => {
    consoleErrorMock.reset();
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
});
