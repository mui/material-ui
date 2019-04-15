import React from 'react';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import DialogActions from './DialogActions';

describe('<DialogActions />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<DialogActions />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
