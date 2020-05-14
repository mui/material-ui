import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import TableContainer from './TableContainer';

describe('<TableContainer />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TableContainer />);
  });

  describeConformance(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));
});
