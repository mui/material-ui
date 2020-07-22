import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import CardActions from './CardActions';

describe('<CardActions />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<CardActions />);
  });

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
