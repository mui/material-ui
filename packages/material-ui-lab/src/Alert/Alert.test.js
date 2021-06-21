import * as React from 'react';
import { getClasses, describeConformance, Paper } from '@material-ui/core';
import createMount from 'test/utils/createMount';
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
