import React from 'react';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import ListItemSecondaryAction from './ListItemSecondaryAction';

describe('<ListItemSecondaryAction />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(<ListItemSecondaryAction />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ListItemSecondaryAction />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
