import React from 'react';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import CardContent from './CardContent';

describe('<CardContent />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<CardContent />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));
});
