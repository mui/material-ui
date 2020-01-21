import React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import AvatarGroup from './AvatarGroup';

describe('<AvatarGroup />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<AvatarGroup />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<AvatarGroup />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
