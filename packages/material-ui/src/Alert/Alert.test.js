import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import Paper from '../Paper';
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
