import React from 'react';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
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
