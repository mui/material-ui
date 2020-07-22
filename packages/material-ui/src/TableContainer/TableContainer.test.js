import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
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
