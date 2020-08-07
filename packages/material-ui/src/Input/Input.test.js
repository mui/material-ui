import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
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
