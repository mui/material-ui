import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import Input from './Input';
import InputBase from '../InputBase';

describe('<Input />', () => {
  let classes;
  const mount = createMount();

  before(() => {
    classes = getClasses(<Input />);
  });

  describeConformance(<Input />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
