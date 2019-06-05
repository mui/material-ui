import React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import Input from './Input';
import InputBase from '../InputBase';

describe('<Input />', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<Input />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Input />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
