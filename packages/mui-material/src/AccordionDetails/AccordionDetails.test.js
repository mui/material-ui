import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import AccordionDetails, {
  accordionDetailsClasses as classes,
} from '@mui/material/AccordionDetails';
import describeConformance from '../../test/describeConformance';

describe('<AccordionDetails />', () => {
  const { render } = createRenderer();

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
