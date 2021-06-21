import * as React from 'react';
import { getClasses, describeConformance } from '@material-ui/core';
import createMount from 'test/utils/createMount';
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
