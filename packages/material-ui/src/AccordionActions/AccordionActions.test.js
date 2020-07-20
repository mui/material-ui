import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';

import AccordionActions from './AccordionActions';

describe('<AccordionActions />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<AccordionActions>foo</AccordionActions>);
  });

  describeConformance(<AccordionActions>Conformance</AccordionActions>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
