import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import GridListTile from './GridListTile';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<GridListTile />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<GridListTile />);
    consoleErrorMock.spy();
  });

  after(() => {
    consoleErrorMock.reset();
  });

  describeConformance(<GridListTile />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'div',
  }));
});
