import * as React from 'react';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
import Paper from '@material-ui/core/Paper';
import Alert from './Alert';

describe('<Alert />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<Alert />);
  });

  describeConformance(<Alert />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
