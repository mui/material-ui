import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TimelineConnector from './TimelineConnector';

describe('<TimelineConnector />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineConnector />);
  });

  describeConformance(<TimelineConnector />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));
});
