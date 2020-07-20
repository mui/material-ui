import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
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
