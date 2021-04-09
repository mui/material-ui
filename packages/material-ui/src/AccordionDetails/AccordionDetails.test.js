import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import AccordionDetails from './AccordionDetails';
import classes from './accordionDetailsClasses';

describe('<AccordionDetails />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<AccordionDetails>Conformance</AccordionDetails>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionDetails',
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));

  it('should render a children element', () => {
    const { queryByTestId } = render(
      <AccordionDetails>
        <div data-testid="test-children" />
      </AccordionDetails>,
    );

    expect(queryByTestId('test-children')).not.to.equal(null);
  });
});
