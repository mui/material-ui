import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformance } from 'test/utils';
import AccordionDetails, {
  accordionDetailsClasses as classes,
} from '@material-ui/core/AccordionDetails';

describe('<AccordionDetails />', () => {
  const render = createClientRender();

  describeConformance(<AccordionDetails>Conformance</AccordionDetails>, () => ({
    classes,
    inheritComponent: 'div',
    render,
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
