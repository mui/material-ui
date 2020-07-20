import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import TimelineItem from './TimelineItem';

describe('<TimelineItem />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineItem />);
  });

  describeConformance(<TimelineItem />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
    skip: ['componentProp'],
  }));
});
