import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import CardContent from './CardContent';

describe('<CardContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<CardContent />);
  });

  describeConformance(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));
});
