import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TimelineContent from './TimelineContent';

describe('<TimelineContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineContent />);
  });

  describeConformance(<TimelineContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
