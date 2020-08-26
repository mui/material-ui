import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import GridListTileBar from './GridListTileBar';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<GridListTileBar />', () => {
  let classes;
  const mount = createMount();

  before(() => {
    classes = getClasses(<GridListTileBar title="classes" />);
    consoleErrorMock.spy();
  });

  after(() => {
    consoleErrorMock.reset();
  });

  describeConformance(<GridListTileBar title="conform?" />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
