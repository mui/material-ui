import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
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
