import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
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
