import React from 'react';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import CardActions from './CardActions';

describe('<CardActions />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<CardActions />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
