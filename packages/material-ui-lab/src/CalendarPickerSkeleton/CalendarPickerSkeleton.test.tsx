import * as React from 'react';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import CalendarPickerSkeleton from '@material-ui/lab/CalendarPickerSkeleton';

describe('<CalendarPickerSkeleton />', () => {
  let classes: Record<string, string>;
  const render = createClientRender();
  const mount = createMount();

  before(() => {
    classes = getClasses(<CalendarPickerSkeleton />);
  });

  describeConformance(<CalendarPickerSkeleton />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'refForwarding'],
  }));
});
