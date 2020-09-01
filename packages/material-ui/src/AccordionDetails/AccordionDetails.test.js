import * as React from 'react';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import AccordionDetails from './AccordionDetails';

describe('<AccordionDetails />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<AccordionDetails>foo</AccordionDetails>);
  });

  describeConformance(<AccordionDetails>Conformance</AccordionDetails>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a children element', () => {
    const children = <div data-testid="test-children" />;

    const { getByTestId } = render(<AccordionDetails>{children}</AccordionDetails>);

    getByTestId('test-children');
  });
});
