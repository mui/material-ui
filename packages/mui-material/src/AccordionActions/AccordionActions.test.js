import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import AccordionActions, {
  accordionActionsClasses as classes,
} from '@mui/material/AccordionActions';
import { expect } from 'chai';
import describeConformance from '../../test/describeConformance';

describe('<AccordionActions />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionActions>Conformance</AccordionActions>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render a children element', function test() {
    const { queryByTestId } = render(
      <AccordionActions>
        <div data-testid="test-children" />
      </AccordionActions>,
    );

    expect(queryByTestId('test-children')).not.to.equal(null);
  });
});
