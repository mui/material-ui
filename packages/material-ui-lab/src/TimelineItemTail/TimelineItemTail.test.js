import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TimelineItemTail from './TimelineItemTail';

describe('<TimelineItemTail />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineItemTail />);
  });

  describeConformance(<TimelineItemTail />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
  }));
});
