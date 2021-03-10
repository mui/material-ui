import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import PickersCalendarSkeleton from '@material-ui/lab/PickersCalendarSkeleton';

describe('<PickersCalendarSkeleton />', () => {
  let classes: Record<string, string>;
  const mount = createMount();

  before(() => {
    classes = getClasses(<PickersCalendarSkeleton />);
  });

  describeConformance(<PickersCalendarSkeleton />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'refForwarding'],
  }));
});
