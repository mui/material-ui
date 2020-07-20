import * as React from 'react';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
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
