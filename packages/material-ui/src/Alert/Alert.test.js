import * as React from 'react';
import { createMount, describeConformance } from 'test/utils';
import classes from './alertClasses';
import Paper from '../Paper';
import Alert from './Alert';

describe('<Alert />', () => {
  const mount = createMount();

  describeConformance(<Alert />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
