import * as React from 'react';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
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
