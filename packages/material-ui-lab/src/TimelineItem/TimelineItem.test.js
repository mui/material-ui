import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
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
