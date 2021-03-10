import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import AccordionActions from './AccordionActions';
import classes from './accordionActionsClasses';

describe('<AccordionActions />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<AccordionActions>Conformance</AccordionActions>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
