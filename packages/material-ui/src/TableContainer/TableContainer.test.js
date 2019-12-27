import React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import TableContainer from './TableContainer';

describe('<TableContainer />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TableContainer />);
  });

  describeConformance(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    after: () => mount.cleanUp(),
  }));
});
