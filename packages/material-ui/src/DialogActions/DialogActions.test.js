import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import DialogActions from './DialogActions';

describe('<DialogActions />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<DialogActions />);
  });

  describeConformance(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
