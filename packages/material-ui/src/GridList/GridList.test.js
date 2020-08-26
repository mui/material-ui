import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import GridList from './GridList';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<GridList />', () => {
  let classes;
  const mount = createMount();

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
