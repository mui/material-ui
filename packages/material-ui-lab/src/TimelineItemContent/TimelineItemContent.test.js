import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TimelineItemContent from './TimelineItemContent';

describe('<TimelineItemContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineItemContent />);
  });

  describeConformance(<TimelineItemContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));
});
